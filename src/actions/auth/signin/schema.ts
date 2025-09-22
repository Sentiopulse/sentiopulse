import {z} from 'zod';

export const signinSchema = z.object({
    email: z.string().email("Invalid Email Format"),
    password: z.string().min(1,'Password is required')
});

export type signinInput = z.infer<typeof signinSchema>