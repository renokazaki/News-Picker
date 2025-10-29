import React from 'react';
import { getInterest } from '../../../actions/handleInterest';
import InterestContainer from './InterestContainer';

export default async function InterestList({ user_clerk_id }: { user_clerk_id: string }) {
  const res = await getInterest(user_clerk_id);

  if (!res.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-bold">
          興味のあるキーワードの取得に失敗しました。再読み込みを行ってください。
        </h1>
        <p className="text-sm text-red-500">{res.errorMessage}</p>
      </div>
    );
  }

  const interests = res.data;

  return <InterestContainer interests={interests} />;
}
