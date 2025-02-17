import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/schemas/sign-in-schema';

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user?.hashedPassword) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          return null;
        }

        const { hashedPassword: _removed, ...safeUser } = user;

        return safeUser;
      },
    }),
    Google,
    GitHub,
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
