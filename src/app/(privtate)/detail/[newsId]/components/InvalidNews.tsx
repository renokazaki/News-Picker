import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export default function InvalidNews() {
  return (
    <main className="flex-1 space-y-6 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6 pb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            ニュースが見つかりません
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">無効なリンクです。</p>
        </CardContent>
      </Card>
    </main>
  );
}
