'use client';

import { useCallback, useState } from 'react';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import OAuthButtons from './oauth-buttons';
import Logo from './logo';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'SIGNIN' | 'SIGNUP';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('SIGNUP');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'SIGNIN' ? 'SIGNUP' : 'SIGNIN'
    );
  }, []);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
  };

  const socialAction = (action: string) => {
    // TODO: NEXTAUTH SIGN IN
  };

  return (
    <>
      <div className="mt-20">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Sign in to your account
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
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <AiFillEyeInvisible className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <AiFillEye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
          />
          <Button type="submit" color="primary" radius="full" fullWidth>
            {variant === 'SIGNIN' ? 'Sign in' : 'Create an account'}
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
            />
            <OAuthButtons
              onClick={() => socialAction('github')}
              icon={BsGithub}
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
                onClick={toggleVariant}
              >
                Sign up
              </span>
            ) : (
              <span
                className="cursor-pointer font-semibold hover:underline"
                onClick={toggleVariant}
              >
                Create an account
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
