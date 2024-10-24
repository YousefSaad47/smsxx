import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center p-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="mx-auto w-auto"
        />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
