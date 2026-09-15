import { ReactNode } from 'react';

type PokedexCardProps = {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  value?: string | number;
  children?: ReactNode;
  className?: string;
};

export function PokedexCard({ title, subtitle, icon, value, children, className = '' }: PokedexCardProps) {
  return (
    <div className={`pokedex-panel p-4 ${className}`.trim()}>
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon ? <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 text-blue-200">{icon}</div> : null}
          <div>
            {title ? <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
          </div>
        </div>
        {value !== undefined ? <div className="text-2xl font-bold text-white">{value}</div> : null}
      </div>
      {children ? <div className="relative z-10 mt-4">{children}</div> : null}
    </div>
  );
}
