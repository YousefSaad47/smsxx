import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={55}
      height={55}
      className="mx-auto"
    />
  );
};

export default Logo;
