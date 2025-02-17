'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import OAuthButtons from './oauth-buttons';
import Logo from './logo';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { TbLoader2 } from 'react-icons/tb';
import { cn } from '@/lib/utils';

type Variant = 'SIGNIN' | 'SIGNUP';

type Status = {
  type: 'error' | 'success';
  message: string;
} | null;

type AuthLoadingState = 'credentials' | 'google' | 'github' | null;

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('SIGNIN');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<AuthLoadingState>(null);
  const [status, setStatus] = useState<Status>(null);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'SIGNIN' ? 'SIGNUP' : 'SIGNIN'
    );
  }, []);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading('credentials');
    setStatus(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (variant === 'SIGNUP') {
        await axios.post('/api/sign-up', data);
        setStatus({ type: 'success', message: 'Account created successfully' });
      } else {
        const callback = await signIn('credentials', {
          ...data,
          redirect: false,
        });
        if (callback?.error) {
          setStatus({ type: 'error', message: 'Invalid email or password' });
        } else {
          setStatus({ type: 'success', message: 'Signed in successfully' });
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setStatus({
          type: 'error',
          message: err.response?.data?.error || 'An unexpected error occurred',
        });
      }
    } finally {
      setIsLoading(null);
    }
  };

  const socialAction = async (action: 'google' | 'github') => {
    setIsLoading(action);
    try {
      await signIn(action, { redirect: false });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <div className="mt-20">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          {variant === 'SIGNIN'
            ? 'Sign in to your account'
            : 'Create an account'}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 space-y-6">
        <Form
          className="w-full max-w-[400px] md:max-w-[430px]"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          {variant === 'SIGNUP' && (
            <>
              <label htmlFor="name">Name</label>
              <Input
                name="name"
                type="text"
                label="Enter your name"
                radius="full"
                size="sm"
                required
                minLength={3}
                className="mb-2"
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            type="email"
            label="Enter your email"
            radius="full"
            size="sm"
            isRequired
            className="mb-2"
          />
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            type={isVisible ? 'text' : 'password'}
            label="Enter your password"
            radius="full"
            size="sm"
            isRequired
            minLength={8}
            errorMessage="Password must be at least 8 characters"
            className="mb-4"
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
              >
                {isVisible ? (
                  <AiFillEyeInvisible className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <AiFillEye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
          />
          <Button
            type="submit"
            color="primary"
            disabled={isLoading === 'credentials'}
            radius="full"
            fullWidth
          >
            {isLoading === 'credentials' ? (
              <TbLoader2 className="animate-spin" />
            ) : (
              'Continue'
            )}
          </Button>
        </Form>
        <div className="flex flex-col items-center w-[400px] md:w-[430px] space-y-6">
          <div className="w-full flex items-center gap-4">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>
          <div className="flex w-full gap-2">
            <OAuthButtons
              onClick={() => socialAction('google')}
              icon={BsGoogle}
              isLoading={isLoading === 'google'}
              disabled={isLoading === 'google'}
            />
            <OAuthButtons
              onClick={() => socialAction('github')}
              icon={BsGithub}
              isLoading={isLoading === 'github'}
              disabled={isLoading === 'github'}
            />
          </div>
          <div className="flex gap-2">
            {variant === 'SIGNIN' ? (
              <span>Don&apos;t have an account? </span>
            ) : (
              <span>Already have an account? </span>
            )}
            {variant === 'SIGNIN' ? (
              <span
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  toggleVariant();
                  setStatus(null);
                }}
              >
                Create an account
              </span>
            ) : (
              <span
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  toggleVariant();
                  setStatus(null);
                }}
              >
                Sign in
              </span>
            )}
          </div>
          <div>
            {status && (
              <p
                className={cn(
                  'text-center text-sm',
                  status.type === 'error' ? 'text-red-500' : 'text-green-500'
                )}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
