'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formSchema, FormSchemaType } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { postInterest } from './handleInterest';

export function InterestModal({ user_clerk_id }: { user_clerk_id: string }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: '',
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    const result = await postInterest(data, user_clerk_id);
    form.reset();
    console.log(result);
  };

  return (
    <Dialog>
      <form className="space-y-8">
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
            キーワードを追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>キーワードを登録</DialogTitle>
            <DialogDescription>
              登録後にキーワードに基づいて記事を自動で収集します。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="interest">キーワード</Label>
              <Input
                id="interest"
                {...form.register('interest')}
                placeholder="キーワードを入力してください"
                disabled={form.formState.isSubmitting}
              />
              {form.formState.errors.interest && (
                <p className="text-red-500">{form.formState.errors.interest.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={form.formState.isSubmitting}>
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting ? '登録中...' : '登録'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
