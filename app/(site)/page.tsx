import Image from 'next/image';
import AuthForm from './components/AuthForm';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { motion } from 'framer-motion';
import Logo from './components/Logo';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center p-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <TextGenerateEffect words="Sign in to your account" duration={0.8} />
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
