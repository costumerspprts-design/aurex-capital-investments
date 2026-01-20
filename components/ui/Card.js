import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={twMerge(
        'bg-brand-navy-light/50 backdrop-blur-md border border-brand-silver/10 rounded-xl p-6 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
