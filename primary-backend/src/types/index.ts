import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().email(),
    name: z.string().min(5),
    password: z.string().min(7)
})


export const SignInSchema = z.object({
    username: z.string(),
    password: z.string()
})