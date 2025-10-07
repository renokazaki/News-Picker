"use client";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "@/lib/schema";

export function InterestModal({ user_clerk_id }: { user_clerk_id: string }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
    },
  });
  const onSubmit = async (data: FormSchemaType) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/n8n/interest`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, user_clerk_id }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      form.reset();
    }
  };

  return (
    <Dialog>
      <form className="space-y-8">
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-500 text-white mx-auto">
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
                {...form.register("interest")}
                placeholder="キーワードを入力してください"
                disabled={form.formState.isSubmitting}
              />
              {form.formState.errors.interest && (
                <p className="text-red-500">
                  {form.formState.errors.interest.message}
                </p>
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
              onClick={form.handleSubmit(onSubmit)}
            >
              {form.formState.isSubmitting ? "登録中..." : "登録"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
