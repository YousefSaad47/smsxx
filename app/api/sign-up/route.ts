import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signUpSchema } from '@/schemas/sign-up-schema';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = signUpSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: `${parsedBody.error.issues[0].message}`,
        },
        { status: 400 }
      );
    }

    const { email, name, password } = parsedBody.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    const { hashedPassword: _removed, ...safeUser } = user;

    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error('SIGN_UP_ERROR:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
