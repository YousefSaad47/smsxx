import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .transform((email) => email.trim().toLowerCase()),
  name: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim() : val),
    z.string().min(3, { message: 'Name must be at least 3 characters long' })
  ),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
