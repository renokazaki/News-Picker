"use client";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { updateInterest } from "./handleInterest";

interface EditInterestProps {
  interestId: number;
  interest: string;
}

export function EditInterest({ interestId, interest }: EditInterestProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    const result = await updateInterest(interestId, data);
    form.reset();
    console.log(result);
  };

  return (
    <Dialog>
      <form className="space-y-8">
        <DialogTrigger asChild>
          <Button className="w-full bg-green-500 text-white mx-auto">
            編集
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{interest}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="interest">キーワード</Label>
              <Input
                id="interest"
                {...form.register("interest")}
                placeholder="更新したいキーワードを入力してください"
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
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting ? "更新中..." : "更新"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
