'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { currentNewsAtom } from '@/store';
import { formatDate } from '@/utils/formatdate';
import { useAtomValue } from 'jotai';
import { ArrowLeft, Clock, ExternalLink, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DetailPage() {
  const currentNews = useAtomValue(currentNewsAtom);
  const router = useRouter();

  if (!currentNews) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white p-4 dark:from-slate-900 dark:to-slate-800">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 pb-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              ニュースが見つかりません
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">無効なリンクです。</p>
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              ダッシュボードに戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const publishedDate =
    typeof currentNews.publishedAt === 'string'
      ? currentNews.publishedAt
      : currentNews.publishedAt.toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 pb-6">
            {/* 公開日 */}
            <div className="flex justify-between gap-2">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Tag className="h-3 w-3" />
                {currentNews.tag}
              </Badge>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl leading-tight font-bold text-gray-900 dark:text-gray-100">
              {currentNews.title}
            </h1>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 本文 */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {currentNews.text}
              </p>
            </div>

            {/* 元記事へのリンク */}
            <div className="flex justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
              <div>
                <p className="text-gray-700 dark:text-gray-300">{currentNews.url}</p>
              </div>

              <Button
                onClick={() => window.open(currentNews.url, '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto"
              >
                元記事を読む
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
