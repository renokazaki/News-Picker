'use client';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';

import React, { useTransition } from 'react';
import { deleteInterest } from './handleInterest';

const DeleteInterest = ({ interestId }: { interestId: number }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (interestId: number) => {
    startTransition(async () => {
      const response = await deleteInterest(interestId);
      console.log(response);
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
};

export default DeleteInterest;
