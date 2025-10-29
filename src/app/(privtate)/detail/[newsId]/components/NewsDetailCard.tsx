'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NewsItem } from '@/types/News.type';
import { getPublishedDate } from '@/utils/formatdate';
import { Clock, ExternalLink, Tag } from 'lucide-react';
import React from 'react';

export default function NewsDetailCard({ currentNews }: { currentNews: NewsItem }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="space-y-4 pb-6">
          {/* 公開日 */}
          <div className="flex justify-between gap-2">
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {(() => {
                const { iso, ymd } = getPublishedDate(currentNews.publishedAt);
                return <time dateTime={iso}>{ymd}</time>;
              })()}
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
  );
}
