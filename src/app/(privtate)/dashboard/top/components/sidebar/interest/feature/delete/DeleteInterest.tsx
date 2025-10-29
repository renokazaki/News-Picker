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
import { deleteInterest } from '../../../../../actions/handleInterest';

export default function DeleteInterest({ interestId }: { interestId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (interestId: number) => {
    startTransition(async () => {
      const res = await deleteInterest(interestId);
      if (!res.success) {
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
