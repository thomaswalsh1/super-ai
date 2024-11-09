import { z } from "zod";

export const chatFormSchema = z.object({
    chatInput: z.string().min(1).max(1000),
});

export type ChatFormSchema = typeof chatFormSchema;
