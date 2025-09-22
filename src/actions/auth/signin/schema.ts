import {z} from 'zod';

export const SigninSchema = z.object({
    email: z.string().email("Invalid Email Format"),
    password: z.string().min(1,'Password is required')
});

export type SigninInput = z.infer<typeof SigninSchema>