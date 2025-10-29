'use client';

import { currentNewsAtom } from '@/store';
import { useAtomValue } from 'jotai';
import React from 'react';
import InvalidNews from './InvalidNews';
import NewsDetailCard from './NewsDetailCard';

export default function DetailPane() {
  const currentNews = useAtomValue(currentNewsAtom);

  if (!currentNews) {
    return <InvalidNews />;
  }

  return <NewsDetailCard currentNews={currentNews} />;
}
