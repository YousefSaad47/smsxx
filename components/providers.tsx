import { HeroUIProvider } from '@heroui/system';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
