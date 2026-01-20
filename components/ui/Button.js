'use client';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ children, className, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-black font-bold shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40',
    secondary: 'bg-brand-navy-light border border-brand-gold/30 text-brand-gold hover:bg-brand-navy hover:border-brand-gold',
    outline: 'bg-transparent border border-brand-silver text-brand-silver hover:border-brand-gold hover:text-brand-gold',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        'px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
