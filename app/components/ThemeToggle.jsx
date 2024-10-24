'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
    setTimeout(() => setIsAnimating(false), 800);
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center justify-center">
      <motion.button
        onClick={toggleTheme}
        disabled={isAnimating}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 
                   dark:from-gray-800 dark:to-gray-900 border border-gray-200 
                   dark:border-gray-700 shadow-lg focus:outline-none focus:ring-2 
                   focus:ring-blue-500 dark:focus:ring-blue-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <AnimatePresence mode="wait">
          {isAnimating && (
            <motion.div
              key="ripple"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1, 2, 3],
                opacity: [0.8, 0.5, 0],
              }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-blue-400/30 dark:bg-blue-500/30"
            />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br"
          animate={{
            background:
              theme === 'light'
                ? 'linear-gradient(to bottom right, #ffffff, #f3f4f6)'
                : 'linear-gradient(to bottom right, #1f2937, #111827)',
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="moon"
                initial={{ y: 40, opacity: 0, rotate: 90 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: [1, 1.2, 1],
                }}
                exit={{
                  y: -40,
                  opacity: 0,
                  rotate: -90,
                  transition: { duration: 0.4 },
                }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className="text-gray-800 dark:text-gray-200"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: -40, opacity: 0, rotate: -90 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: [1, 1.2, 1],
                }}
                exit={{
                  y: 40,
                  opacity: 0,
                  rotate: 90,
                  transition: { duration: 0.4 },
                }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className="text-yellow-500 dark:text-yellow-400"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
