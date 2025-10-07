import { z } from "zod";

export const formSchema = z.object({
  interest: z
    .string()
    .min(1, { message: "キーワードは必須です" })
    .max(20, { message: "キーワードは20文字以内で入力してください" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
