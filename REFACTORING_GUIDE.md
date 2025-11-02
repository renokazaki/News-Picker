# Next.js 15 プロジェクト リファクタリング手順書

## 目次
1. [はじめに](#はじめに)
2. [現状の問題点](#現状の問題点)
3. [修正の全体像](#修正の全体像)
4. [実装手順](#実装手順)
5. [テストチェックリスト](#テストチェックリスト)
6. [よくある質問](#よくある質問)

---

## はじめに

本手順書では、Next.js 15 / React 19 のベストプラクティスに沿って、既存プロジェクトをリファクタリングします。

### 対象者
- Next.js 15を使用している開発者
- コードの保守性・テスタビリティを向上させたい方
- App Routerの設計パターンを学びたい方

### 所要時間
- 基本実装：2-3時間
- テスト・検証：1-2時間

---

## 現状の問題点

### 1. APIクライアント層の欠如

**問題：** Server ActionsやServer Componentsで直接Prismaを呼んでいる

```typescript
// ❌ 現状
export async function getUserNews(user_clerk_id: string) {
  const news = await prisma.news.findMany({ /* ... */ });
  return { success: true, data: news };
}
```

**なぜ問題なのか？**
- **再利用性が低い**: 同じクエリを複数箇所で書く必要がある
- **テストが困難**: Prismaのモックが必要
- **責務の分離ができていない**: ビジネスロジックとデータアクセスが混在
- **キャッシュ戦略の一元管理ができない**: 各所でキャッシュ設定を書く必要がある

### 2. 型定義の不統一

```typescript
// ❌ ファイルごとに異なる形式
return { success: true, data: news };
return { success: false, errorMessage: 'Error...', data: [] }; // dataの有無が不統一
```

**なぜ問題なのか？**
- **型安全性が低い**: エラー時に`data`が存在するか不明
- **呼び出し側での分岐が複雑になる**: エラーハンドリングが統一されない

### 3. ディレクトリ構造が不完全

```
src/
├─ app/
│  └─ (privtate)/dashboard/top/
│     └─ actions/  # Server Actionsのみ
├─ apis/  # ← 存在しない！
```

**なぜ問題なのか？**
- **データアクセス層がない**: どこでDB操作しているか不明瞭
- **関心の分離ができていない**: ビジネスロジックとデータアクセスが分離されていない

---

## 修正の全体像

### アーキテクチャ図

```
[修正前]
Server Component / Client Component
    ↓ (直接呼び出し)
Server Actions
    ↓ (直接呼び出し)
Prisma (DB)

[修正後]
Server Component
    ↓ (import)
APIs (*.server.ts)  ← 📍 新規追加
    ↓
Prisma (DB)

Client Component
    ↓ (関数呼び出し)
Server Actions
    ↓ (import)
APIs (*.server.ts)  ← 📍 新規追加
    ↓
Prisma (DB)
```

### 修正のメリット

| 項目 | 修正前 | 修正後 |
|------|--------|--------|
| **再利用性** | ❌ 低い（重複コード多数） | ✅ 高い（APIクライアントを共有） |
| **テスト容易性** | ❌ 困難（Prismaモック必須） | ✅ 容易（APIクライアントをモック） |
| **責務分離** | ❌ 不明瞭 | ✅ 明確（データアクセス層が分離） |
| **型安全性** | ❌ 不統一 | ✅ Result型で統一 |
| **キャッシュ管理** | ❌ 各所で設定 | ✅ 一元管理 |

---

## 実装手順

### 【準備】バックアップとブランチ作成

```bash
# バックアップブランチを作成
git checkout -b backup/before-refactoring

# 作業用ブランチを作成
git checkout -b feature/refactoring-api-layer
```

---

## ステップ1: 型定義の追加

### 実装理由
Result型を統一することで、成功・失敗時のレスポンス形式を型レベルで保証します。

### 実装内容

```typescript
// 📁 src/types/result.ts
/**
 * API呼び出しの結果を表す型
 * 
 * @template T - 成功時のデータ型
 * 
 * @example
 * ```typescript
 * const result: Result<User> = await fetchUser(userId);
 * if (result.success) {
 *   console.log(result.data.name); // データは必ず存在
 * } else {
 *   console.error(result.errorMessage); // エラーメッセージ
 * }
 * ```
 */
export type Result<T> = 
  | { success: true; data: T }
  | { success: false; errorMessage: string };
```

### 実装のポイント
- **ディスクリミネート共用体型**: `success`フィールドで型を判別
- **型安全**: `success: true`の場合のみ`data`にアクセス可能
- **エラーハンドリング**: `success: false`の場合は`errorMessage`が必須

---

## ステップ2: APIクライアント層の作成

### 実装理由
データアクセスロジックを一箇所に集約し、再利用性とテスタビリティを向上させます。

### 2-1. ニュース関連APIクライアント

```typescript
// 📁 src/apis/news.server.ts
import prisma from '@/lib/prisma';
import type { Result } from '@/types/result';
import type { NewsItem } from '@/types/News.type';

/**
 * ユーザーのニュース一覧を取得
 * 
 * @param userId - ユーザーのClerk ID
 * @returns ニュース一覧またはエラー
 * 
 * @remarks
 * - 公開日の降順でソート
 * - キャッシュ戦略: Data CacheをOFFにし、常に最新データを取得
 * 
 * @example
 * ```typescript
 * const result = await fetchUserNews(userId);
 * if (result.success) {
 *   console.log(result.data); // NewsItem[]
 * }
 * ```
 */
export async function fetchUserNews(userId: string): Promise<Result<NewsItem[]>> {
  try {
    // 入力検証
    if (!userId) {
      return { 
        success: false, 
        errorMessage: 'ユーザーIDが指定されていません' 
      };
    }

    const news = await prisma.news.findMany({
      where: { user_clerk_id: userId },
      orderBy: { publishedAt: 'desc' },
      // キャッシュ設定を追加する場合
      // cache: 'no-store', // 常に最新データを取得
    });

    return { success: true, data: news };
  } catch (error) {
    console.error('Error fetching user news:', error);
    return { 
      success: false, 
      errorMessage: 'ニュースの取得中にエラーが発生しました' 
    };
  }
}
```

### 2-2. Interest関連APIクライアント

```typescript
// 📁 src/apis/interests.server.ts
import prisma from '@/lib/prisma';
import type { Result } from '@/types/result';
import type { Interest } from '@/types/Interest.type';

/**
 * ユーザーのInterest一覧を取得
 * 
 * @param userId - ユーザーのClerk ID
 * @returns Interest一覧またはエラー
 */
export async function fetchInterests(userId: string): Promise<Result<Interest[]>> {
  try {
    if (!userId) {
      return { 
        success: false, 
        errorMessage: 'ユーザーIDが指定されていません' 
      };
    }

    const interests = await prisma.interest.findMany({
      where: { user_clerk_id: userId },
    });

    return { success: true, data: interests };
  } catch (error) {
    console.error('Error fetching interests:', error);
    return { 
      success: false, 
      errorMessage: 'キーワードの取得中にエラーが発生しました' 
    };
  }
}

/**
 * Interestを新規作成
 * 
 * @param userId - ユーザーのClerk ID
 * @param interest - 登録するキーワード
 * @returns 作成されたInterestまたはエラー
 */
export async function createInterest(
  userId: string,
  interest: string
): Promise<Result<Interest>> {
  try {
    if (!userId) {
      return { 
        success: false, 
        errorMessage: 'ユーザーIDが指定されていません' 
      };
    }

    if (!interest || interest.trim().length === 0) {
      return { 
        success: false, 
        errorMessage: 'キーワードを入力してください' 
      };
    }

    const newInterest = await prisma.interest.create({
      data: {
        user_clerk_id: userId,
        interest: interest.trim(),
      },
    });

    return { success: true, data: newInterest };
  } catch (error) {
    console.error('Error creating interest:', error);
    return { 
      success: false, 
      errorMessage: 'キーワードの登録中にエラーが発生しました' 
    };
  }
}

/**
 * Interestを更新
 * 
 * @param userId - ユーザーのClerk ID
 * @param interestId - 更新するInterestのID
 * @param interest - 新しいキーワード
 * @returns 更新されたInterestまたはエラー
 */
export async function updateInterest(
  userId: string,
  interestId: number,
  interest: string
): Promise<Result<Interest>> {
  try {
    if (!userId) {
      return { 
        success: false, 
        errorMessage: 'ユーザーIDが指定されていません' 
      };
    }

    if (!interest || interest.trim().length === 0) {
      return { 
        success: false, 
        errorMessage: 'キーワードを入力してください' 
      };
    }

    const updated = await prisma.interest.update({
      where: { 
        user_clerk_id: userId, 
        id: interestId 
      },
      data: { interest: interest.trim() },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error('Error updating interest:', error);
    return { 
      success: false, 
      errorMessage: 'キーワードの更新中にエラーが発生しました' 
    };
  }
}

/**
 * Interestを削除
 * 
 * @param userId - ユーザーのClerk ID
 * @param interestId - 削除するInterestのID
 * @returns 成功またはエラー
 */
export async function deleteInterest(
  userId: string,
  interestId: number
): Promise<Result<void>> {
  try {
    if (!userId) {
      return { 
        success: false, 
        errorMessage: 'ユーザーIDが指定されていません' 
      };
    }

    await prisma.interest.delete({
      where: { 
        user_clerk_id: userId, 
        id: interestId 
      },
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error('Error deleting interest:', error);
    return { 
      success: false, 
      errorMessage: 'キーワードの削除中にエラーが発生しました' 
    };
  }
}
```

### 実装のポイント
- **関数ごとにJSDocコメント**: 使い方を明確に
- **入力検証**: APIクライアント層で検証を実施
- **エラーハンドリング**: 詳細なエラーログとユーザー向けメッセージを分離
- **命名規則**: `fetch`, `create`, `update`, `delete`で統一

---

## ステップ3: Server Actionsのリファクタリング

### 実装理由
Server Actionsはビジネスロジックとキャッシュ制御に専念し、データアクセスはAPIクライアントに委譲します。

### 3-1. 既存のServer Actionsファイルを削除

```bash
# 古いServer Actionsファイルを削除
rm src/app/\(privtate\)/dashboard/top/actions/getUserNews.ts
rm src/app/\(privtate\)/dashboard/top/actions/handleInterest.ts
```

### 3-2. 新しいServer Actionsを作成

```typescript
// 📁 src/app/(privtate)/dashboard/top/actions/interests.ts
'use server';

import { 
  createInterest, 
  updateInterest, 
  deleteInterest 
} from '@/apis/interests.server';
import { revalidatePath } from 'next/cache';
import type { Result } from '@/types/result';
import type { Interest } from '@/types/Interest.type';

/**
 * Interestを登録するServer Action
 * 
 * @remarks
 * - APIクライアント経由でDB操作
 * - 成功時にキャッシュを再検証
 * - フォームバリデーションはクライアント側で実施済み
 * 
 * @param userId - ユーザーのClerk ID
 * @param interest - 登録するキーワード
 * @returns 作成されたInterestまたはエラー
 */
export async function postInterestAction(
  userId: string,
  interest: string
): Promise<Result<Interest>> {
  // ユーザー認証チェック
  if (!userId) {
    return { 
      success: false, 
      errorMessage: 'ログインしてください' 
    };
  }

  // APIクライアント経由でDB操作
  const result = await createInterest(userId, interest);

  // 成功時のみキャッシュを再検証
  if (result.success) {
    revalidatePath('/dashboard/top');
  }

  return result;
}

/**
 * Interestを更新するServer Action
 * 
 * @param userId - ユーザーのClerk ID
 * @param interestId - 更新するInterestのID
 * @param interest - 新しいキーワード
 * @returns 更新されたInterestまたはエラー
 */
export async function updateInterestAction(
  userId: string,
  interestId: number,
  interest: string
): Promise<Result<Interest>> {
  if (!userId) {
    return { 
      success: false, 
      errorMessage: 'ログインしてください' 
    };
  }

  const result = await updateInterest(userId, interestId, interest);

  if (result.success) {
    revalidatePath('/dashboard/top');
  }

  return result;
}

/**
 * Interestを削除するServer Action
 * 
 * @param userId - ユーザーのClerk ID
 * @param interestId - 削除するInterestのID
 * @returns 成功またはエラー
 */
export async function deleteInterestAction(
  userId: string,
  interestId: number
): Promise<Result<void>> {
  if (!userId) {
    return { 
      success: false, 
      errorMessage: 'ログインしてください' 
    };
  }

  const result = await deleteInterest(userId, interestId);

  if (result.success) {
    revalidatePath('/dashboard/top');
  }

  return result;
}
```

### 実装のポイント
- **責務の分離**: データアクセスはAPIクライアント、ビジネスロジックとキャッシュ制御はServer Actions
- **キャッシュ戦略**: 成功時のみ`revalidatePath`を実行
- **エラー伝播**: APIクライアントのエラーをそのまま返す

---

## ステップ4: Server Componentsの修正

### 実装理由
Server ComponentsでAPIクライアントを直接呼び出すことで、シンプルで読みやすいコードになります。

### 4-1. NewsPane の修正

```typescript
// 📁 src/app/(privtate)/dashboard/top/components/contents/NewsPane.tsx
import { fetchUserNews } from '@/apis/news.server'; // 👈 APIクライアントをimport
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NewsList from './NewsList';

/**
 * ニュース一覧を表示するServer Component
 * 
 * @remarks
 * - 認証チェック後、APIクライアント経由でデータ取得
 * - エラー時はエラー画面を表示
 * - 空の場合はプレースホルダーを表示
 */
export default async function NewsPane() {
  // 認証チェック
  const userId = (await auth()).userId;
  if (!userId) {
    redirect('/sign-in');
  }

  // APIクライアント経由でデータ取得
  const result = await fetchUserNews(userId);

  // エラーハンドリング
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">
          コンテンツ取得中にエラーが発生しました
        </h1>
        <p className="text-sm text-red-500">{result.errorMessage}</p>
        <p className="text-sm text-gray-500 mt-2">
          再読み込みを行ってください
        </p>
      </div>
    );
  }

  const news = result.data;

  return (
    <main className="flex-1 space-y-6 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 dark:from-slate-900 dark:to-slate-800">
      {news.length === 0 ? (
        <div className="col-span-full flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            ニュースがありません。キーワードを登録しニュースを収集しましょう。
          </p>
        </div>
      ) : (
        <NewsList news={news} />
      )}
    </main>
  );
}
```

### 4-2. InterestList の修正

```typescript
// 📁 src/app/(privtate)/dashboard/top/components/sidebar/interest/InterestList.tsx
import React from 'react';
import { fetchInterests } from '@/apis/interests.server'; // 👈 APIクライアントをimport
import InterestContainer from './InterestContainer';

/**
 * Interest一覧を表示するServer Component
 * 
 * @param user_clerk_id - ユーザーのClerk ID
 */
export default async function InterestList({ 
  user_clerk_id 
}: { 
  user_clerk_id: string 
}) {
  // APIクライアント経由でデータ取得
  const result = await fetchInterests(user_clerk_id);

  // エラーハンドリング
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-xl font-bold">
          キーワードの取得に失敗しました
        </h1>
        <p className="text-sm text-red-500 mt-2">{result.errorMessage}</p>
        <p className="text-sm text-gray-500 mt-1">
          再読み込みを行ってください
        </p>
      </div>
    );
  }

  return (
    <InterestContainer 
      user_clerk_id={user_clerk_id} 
      interests={result.data} 
    />
  );
}
```

### 実装のポイント
- **直接import**: Server ComponentからAPIクライアントを直接import
- **シンプルな構造**: 認証チェック → データ取得 → エラーハンドリング → 表示
- **型安全**: Result型により`result.data`は型安全にアクセス可能

---

## ステップ5: Client Componentsの修正

### 実装理由
Client ComponentsからはServer Actionsを呼び出すことで、サーバー側のロジックを活用します。

### 5-1. CreateInterest の修正

```typescript
// 📁 src/app/(privtate)/dashboard/top/components/sidebar/interest/feature/create/CreateInterest.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { postInterestAction } from '../../../../actions/interests'; // 👈 Server Actionsをimport
import { formSchema, FormSchemaType } from '../../../../schemas/schema';

export default function CreateInterest({ user_clerk_id }: { user_clerk_id: string }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: '',
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    // Server Actionsを呼び出し
    const result = await postInterestAction(user_clerk_id, data.interest);
    
    if (!result.success) {
      toast.error(result.errorMessage);
      return;
    }
    
    toast.success('キーワードを登録しました');
    form.reset();
  };

  return (
    <Dialog>
      <form className="space-y-8">
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
            キーワードを追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>キーワードを登録</DialogTitle>
            <DialogDescription>
              登録後にキーワードに基づいて記事を自動で収集します。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="interest">キーワード</Label>
              <Input
                id="interest"
                {...form.register('interest')}
                placeholder="キーワードを入力してください"
                disabled={form.formState.isSubmitting}
              />
              {form.formState.errors.interest && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.interest.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={form.formState.isSubmitting}>
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting ? '登録中...' : '登録'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
```

### 5-2. EditInterest の修正

```typescript
// 📁 src/app/(privtate)/dashboard/top/components/sidebar/interest/feature/update/EditInterest.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateInterestAction } from '../../../../actions/interests'; // 👈 Server Actionsをimport
import { formSchema, FormSchemaType } from '../../../../schemas/schema';

type EditInterestProps = {
  user_clerk_id: string;
  interestId: number;
  interest: string;
};

export default function EditInterest({ 
  user_clerk_id, 
  interestId, 
  interest 
}: EditInterestProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: interest,
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    // Server Actionsを呼び出し
    const result = await updateInterestAction(user_clerk_id, interestId, data.interest);
    
    if (!result.success) {
      toast.error(result.errorMessage);
      return;
    }
    
    toast.success('キーワードを更新しました');
  };

  return (
    <Dialog>
      <form className="space-y-8">
        <DialogTrigger asChild>
          <Button className="mx-auto w-full bg-green-400 text-white hover:bg-green-600">
            編集
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{interest}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="interest">キーワード</Label>
              <Input
                id="interest"
                {...form.register('interest')}
                placeholder="更新したいキーワードを入力してください"
                disabled={form.formState.isSubmitting}
              />
              {form.formState.errors.interest && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.interest.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={form.formState.isSubmitting}>
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting ? '更新中...' : '更新'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
```

### 5-3. DeleteInterest の修正

```typescript
// 📁 src/app/(privtate)/dashboard/top/components/sidebar/interest/feature/delete/DeleteInterest.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteInterestAction } from '../../../../actions/interests'; // 👈 Server Actionsをimport

type DeleteInterestProps = {
  user_clerk_id: string;
  interestId: number;
};

export default function DeleteInterest({ 
  user_clerk_id, 
  interestId 
}: DeleteInterestProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (interestId: number) => {
    startTransition(async () => {
      // Server Actionsを呼び出し
      const result = await deleteInterestAction(user_clerk_id, interestId);
      
      if (!result.success) {
        toast.error(result.errorMessage);
        return;
      }
      
      toast.success('キーワードを削除しました');
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-400 text-white hover:bg-red-500">
          削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>キーワードを削除しますか</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              キャンセル
            </Button>
          </DialogClose>
          <Button 
            type="submit" 
            onClick={() => handleDelete(interestId)} 
            disabled={isPending}
          >
            {isPending ? '削除中...' : '削除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### 実装のポイント
- **Server Actionsの呼び出し**: `await postInterestAction(...)`で直接呼び出し
- **エラーハンドリング**: Result型により統一されたエラー処理
- **ローディング状態**: `form.formState.isSubmitting`または`useTransition`で管理

---

## ステップ6: Route Handlerの修正（オプション）

### 実装理由
n8n等の外部ツール用エンドポイントでも、APIクライアントを経由することで一貫性を保ちます。

### 6-1. n8n用エンドポイントの修正

```typescript
// 📁 src/app/api/n8n/interest/route.ts
import { createInterest, fetchInterests } from '@/apis/interests.server'; // 👈 APIクライアントをimport
import { NextRequest, NextResponse } from 'next/server';

/**
 * n8n用: Interestを作成するエンドポイント
 * 
 * @remarks
 * - APIクライアント経由でDB操作
 * - エラーハンドリングを統一
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interest, user_clerk_id } = body as {
      interest: string;
      user_clerk_id: string;
    };

    // 入力検証
    if (!interest || !user_clerk_id) {
      return NextResponse.json(
        { error: 'Missing required fields: interest, user_clerk_id' },
        { status: 400 }
      );
    }

    // APIクライアント経由でDB操作
    const result = await createInterest(user_clerk_id, interest);

    // エラーハンドリング
    if (!result.success) {
      return NextResponse.json(
        { error: result.errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error('n8n webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * n8n用: Interest一覧を取得するエンドポイント
 */
export async function GET(request: NextRequest) {
  try {
    const user_clerk_id = request.nextUrl.searchParams.get('user_clerk_id');
    
    if (!user_clerk_id) {
      return NextResponse.json(
        { error: 'Missing required parameter: user_clerk_id' },
        { status: 400 }
      );
    }

    // APIクライアント経由でDB操作
    const result = await fetchInterests(user_clerk_id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('n8n webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 実装のポイント
- **APIクライアントの再利用**: Server Componentsと同じロジックを使用
- **エラーレスポンスの統一**: 常にJSON形式で返す
- **コメントでエンドポイントの用途を明記**: n8n専用であることを明示

---

## ステップ7: 未使用コードの削除

### 実装理由
使われていないコードを削除することで、コードベースをクリーンに保ちます。

```bash
# 未使用のSWR関連ファイルを削除
rm src/hooks/useTestGet.ts
rm src/lib/fetcher.ts
```

---

## テストチェックリスト

リファクタリング後、以下の項目をテストしてください。

### ✅ 機能テスト

#### ニュース機能
- [ ] ダッシュボードにアクセスし、ニュース一覧が表示されること
- [ ] ニュースが0件の場合、適切なメッセージが表示されること
- [ ] ニュースをクリックすると詳細ページに遷移すること

#### Interest機能
- [ ] キーワードを追加できること
- [ ] キーワードを編集できること
- [ ] キーワードを削除できること
- [ ] 各操作後、適切なトーストメッセージが表示されること
- [ ] 各操作後、リストが自動更新されること

#### エラーハンドリング
- [ ] DBエラー時、適切なエラーメッセージが表示されること
- [ ] 未ログイン時、ログインページにリダイレクトされること

### ✅ 型チェック

```bash
# TypeScriptの型チェック
npm run build
# または
npm run type-check
```

- [ ] 型エラーが発生しないこと
- [ ] Result型が正しく推論されること

### ✅ パフォーマンステスト

- [ ] ページ読み込み速度が以前と同等かそれ以上であること
- [ ] Server Actionsのレスポンス時間が適切であること

### ✅ n8n連携テスト（該当する場合）

- [ ] n8n用エンドポイント（POST /api/n8n/interest）が正常に動作すること
- [ ] n8n用エンドポイント（GET /api/n8n/interest）が正常に動作すること

---

## よくある質問

### Q1: 既存のコードが動かなくなった場合は？

**A:** 以下をチェックしてください：

1. **importパスが正しいか確認**
   ```typescript
   // ❌ 誤り
   import { getUserNews } from '../actions/getUserNews';
   
   // ✅ 正しい
   import { fetchUserNews } from '@/apis/news.server';
   ```

2. **Result型の扱いが正しいか確認**
   ```typescript
   // ❌ 誤り
   const news = await fetchUserNews(userId);
   console.log(news.data); // エラー: newsはResult型
   
   // ✅ 正しい
   const result = await fetchUserNews(userId);
   if (result.success) {
     console.log(result.data);
   }
   ```

### Q2: なぜServer ActionsとAPIクライアントを分ける必要があるのか？

**A:** 責務の分離のためです：

- **APIクライアント**: データアクセスロジック（Prismaとのやり取り）
- **Server Actions**: ビジネスロジック + キャッシュ制御 + 認証チェック

これにより、テストが容易になり、コードの再利用性が向上します。

### Q3: Data Cacheは使わないのか？

**A:** 現時点では使用していませんが、将来的に追加可能です：

```typescript
// APIクライアントでData Cacheを有効化する例
export async function fetchUserNews(userId: string): Promise<Result<NewsItem[]>> {
  const news = await prisma.news.findMany({
    where: { user_clerk_id: userId },
    orderBy: { publishedAt: 'desc' },
  });
  
  // Next.js 15のfetch APIでラップしてData Cacheを使う場合：
  // const response = await fetch(`/api/internal/news?userId=${userId}`, {
  //   next: { tags: [`user-news-${userId}`], revalidate: 3600 }
  // });
  
  return { success: true, data: news };
}
```

### Q4: Client Componentからも直接APIクライアントを呼べないのか？

**A:** 技術的には可能ですが、推奨しません：

- **セキュリティ**: APIクライアントはサーバー専用（Prismaを直接呼ぶ）
- **ベストプラクティス**: Client ComponentsはServer Actionsを経由するのがNext.js 15の推奨パターン

### Q5: 既存のテストコードは修正が必要か？

**A:** はい、以下の点を修正してください：

```typescript
// ❌ 修正前
import { getUserNews } from '@/app/(privtate)/dashboard/top/actions/getUserNews';

test('should fetch user news', async () => {
  const result = await getUserNews('user-123');
  expect(result.success).toBe(true);
});

// ✅ 修正後
import { fetchUserNews } from '@/apis/news.server';

test('should fetch user news', async () => {
  const result = await fetchUserNews('user-123');
  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data).toBeDefined();
  }
});
```

---

## 完了確認

以下の項目を確認し、すべてチェックできればリファクタリング完了です。

### 📂 ファイル構造
- [ ] `src/types/result.ts` が作成されている
- [ ] `src/apis/news.server.ts` が作成されている
- [ ] `src/apis/interests.server.ts` が作成されている
- [ ] `src/app/(privtate)/dashboard/top/actions/interests.ts` が作成されている
- [ ] 古いServer Actionsファイルが削除されている
- [ ] 未使用のSWRファイルが削除されている

### 🔧 コード品質
- [ ] すべてのファイルにJSDocコメントが記載されている
- [ ] Result型が一貫して使用されている
- [ ] エラーハンドリングが適切に実装されている
- [ ] 型エラーが発生していない（`npm run build`が成功）

### ✅ 機能
- [ ] すべてのテストチェックリストをクリアしている
- [ ] 既存の機能が正常に動作している
- [ ] エラー時の挙動が適切である

### 📝 ドキュメント
- [ ] チームメンバーに変更内容を共有した
- [ ] 必要に応じてREADMEを更新した

---

## 次のステップ

リファクタリングが完了したら、以下の拡張を検討してください：

### 1. Data Cacheの導入
ニュース一覧など変更頻度の低いデータにData Cacheを適用

### 2. TanStack Queryの導入
将来的にクライアント側でのデータフェッチが必要になった場合

### 3. エラーロギングの強化
Sentryなどのエラートラッキングツールの導入

### 4. ユニットテストの追加
APIクライアント層のテストを充実させる

---

## まとめ

このリファクタリングにより、以下のメリットが得られました：

✅ **保守性の向上**: データアクセスロジックが一箇所に集約  
✅ **テスタビリティの向上**: APIクライアントを独立してテスト可能  
✅ **再利用性の向上**: 複数箇所から同じロジックを利用可能  
✅ **型安全性の向上**: Result型により一貫したエラーハンドリング  
✅ **可読性の向上**: 責務が明確に分離されたコード構造

---

**作成日**: 2025-01-02  
**最終更新**: 2025-01-02  
**バージョン**: 1.0.0
