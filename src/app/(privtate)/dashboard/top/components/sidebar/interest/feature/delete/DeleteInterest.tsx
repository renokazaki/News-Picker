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
import { deleteInterestAction } from '../../../../../actions/interests';

type DeleteInterestProps = {
  user_clerk_id: string;
  interestId: number;
};

export default function DeleteInterest({ user_clerk_id, interestId }: DeleteInterestProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (interestId: number) => {
    startTransition(async () => {
      const res = await deleteInterestAction(user_clerk_id, interestId);
      if (!res.isSuccess) {
        toast.error(res.errorMessage);
        return;
      }
      toast.success('キーワードを削除しました');
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-400 text-white hover:bg-red-500">削除</Button>
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
          <Button type="submit" onClick={() => handleDelete(interestId)} disabled={isPending}>
            {isPending ? '削除中...' : '削除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
