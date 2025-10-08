"use client";

import { useAtomValue } from "jotai";
import React from "react";
import { currentNewsAtom } from "@/app/store";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, ExternalLink, Clock, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatdate";

export default function DetailPage() {
  const currentNews = useAtomValue(currentNewsAtom);
  const router = useRouter();

  if (!currentNews) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ニュースが見つかりません
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              無効なリンクです。
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
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
    typeof currentNews.publishedAt === "string"
      ? currentNews.publishedAt
      : currentNews.publishedAt.toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 pb-6">
            {/* 公開日 */}
            <div className="flex justify-between gap-2">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                <time dateTime={publishedDate}>
                  {formatDate(publishedDate)}
                </time>
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Tag className="h-3 w-3" />
                {currentNews.tag}
              </Badge>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100">
              {currentNews.title}
            </h1>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 本文 */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {currentNews.text}
              </p>
            </div>

            {/* 元記事へのリンク */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentNews.url}
                </p>
              </div>

              <Button
                onClick={() => window.open(currentNews.url, "_blank")}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
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
