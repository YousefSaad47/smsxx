import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8),
});
