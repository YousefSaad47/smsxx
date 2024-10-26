'use client';
import { bounceVariant, floatVariant } from '@/app/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Logo = () => {
  return (
    <motion.div variants={bounceVariant} initial="initial" animate="animate">
      <motion.div variants={floatVariant} animate="animate">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="mx-auto w-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default Logo;
