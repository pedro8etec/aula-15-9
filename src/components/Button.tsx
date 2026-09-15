import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'pokedex-button';
  const variantClass = variant === 'secondary' ? 'secondary' : variant === 'danger' ? 'danger' : '';
  return (
    <button type="button" className={`${base} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
