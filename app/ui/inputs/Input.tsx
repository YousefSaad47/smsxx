'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { motion } from 'framer-motion';
import { slideIn } from '@/app/utils/motion';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => (
  <div>
    <motion.label
      variants={slideIn(-30, 1)}
      initial="hidden"
      animate="visible"
      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
      htmlFor={id}
    >
      {label}
    </motion.label>
    <div className="mt-2 ">
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `
              form-input
              block w-full
              rounded-md border-0
              py-1.5
              text-gray-900
              shadow-sm ring-1
              ring-inset
              ring-gray-300
              placeholder:text-gray-400
              focus:ring-2 focus:ring-inset
              focus:ring-sky-600
              sm:text-sm sm:leading-6
              `,
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50 cursor-default'
        )}
      />
    </div>
  </div>
);

export default Input;
