import { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: ReactNode;
};

export function Input({ label, className = '', leftIcon, ...props }: InputProps) {
  return (
    <label className="block w-full text-sm text-slate-300">
      {label ? <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{label}</span> : null}
      <div className="relative">
        {leftIcon ? <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">{leftIcon}</span> : null}
        <input className={`pokedex-input ${leftIcon ? 'pl-11' : ''} ${className}`.trim()} {...props} />
      </div>
    </label>
  );
}
