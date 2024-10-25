'use client';

import React, { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { slideIn, slideInFromTop } from '@/app/utils/motion';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      // Axios register
    }
    if (variant === 'LOGIN') {
      // Next auth login
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Next auth social login
  };

  return (
    <motion.div
      variants={slideInFromTop}
      initial="hidden"
      animate="visible"
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence>
            {variant === 'REGISTER' && (
              <motion.div
                variants={slideInFromTop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5 }}
              >
                <Input
                  id="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <motion.div
              variants={slideIn(-40, 1)}
              initial="hidden"
              animate="visible"
              className="w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            >
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction('github')}
              />
            </motion.div>
            <motion.div
              variants={slideIn(40, 1)}
              initial="hidden"
              animate="visible"
              className="w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            >
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 dark:text-gray-400">
          <div>
            {variant === 'LOGIN' ? 'New to Smsxx?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="hover:scale-105 active:scale-100 transition cursor-pointer underline font-bold text-black dark:text-white"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
