import AuthAvatar from '@/app/(privtate)/dashboard/top/components/header/AuthAvatar';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { ArrowRight, BarChart3, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    return redirect('/dashboard/top');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <AuthAvatar />
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* テキスト部分 - モバイルで中央寄せ */}
          <div className="text-center lg:text-left">
            <p className="mb-8 text-xl text-gray-600">
              興味のあるキーワードに基づいて、情報を自動収集し、AIによるフィルタリングと要約を行い、Webアプリケーション上で表示するツールです。
            </p>
            {/* ボタン部分 - 常に中央寄せ、レスポンシブで縦並び */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/sign-up">
                <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-700 sm:w-auto">
                  新規登録
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto">
                  ログイン
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 画像部分 - 常に中央寄せ */}
          <div className="flex justify-center lg:justify-end">
            <div className="max-w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/NewsPicker.PNG"
                alt="NewsPicker アプリ画面"
                width={600}
                height={450}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">主な機能</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">効率的情報収集</h4>
              <p className="text-gray-600">興味のあるキーワードに基づいて、情報を自動収集します</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">
                AIによるフィルタリングと要約
              </h4>
              <p className="text-gray-600">
                AIによるフィルタリングと要約を行い、Webアプリケーション上で表示します
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h3 className="mb-12 text-3xl font-bold text-gray-900">使い方はとても簡単</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">登録</h4>
              <p className="text-gray-600">キーワードを登録します</p>
            </div>

            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">収集</h4>
              <p className="text-gray-600">
                キーワードに基づいて、AIが情報を自動収集し、要約します
              </p>
            </div>

            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">確認</h4>
              <p className="text-gray-600">興味のある分野の情報だけを確認できます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h3 className="mb-4 text-3xl font-bold text-white">今すぐ始めましょう</h3>
          <p className="mb-8 text-xl text-blue-100">無料で利用できます</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button className="flex items-center gap-2 rounded-lg bg-gray-600 px-8 py-8 text-lg font-semibold text-white transition-colors hover:bg-gray-700">
                新規登録
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="flex items-center gap-2 rounded-lg bg-white px-8 py-8 text-lg font-semibold text-black transition-colors">
                ログイン
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
