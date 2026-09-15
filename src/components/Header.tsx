import { Bell, Search, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PokeBall } from './PokeBall';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
  backTo?: string;
};

export function Header({
  title = 'Central',
  subtitle,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  showAddButton = false,
  onAddClick,
  backTo,
}: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-slate-700/80 bg-slate-950/80 px-4 pb-4 pt-5 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {backTo ? (
            <Link to={backTo} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800">
              <ArrowLeft size={18} />
            </Link>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
              <PokeBall size="small" />
            </div>
          )}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Pokédex</p>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
              <Search size={15} />
              <input
                className="w-28 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none md:w-48"
                placeholder="Buscar"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          ) : null}

          {showAddButton ? (
            <button type="button" onClick={onAddClick} className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/15 text-blue-200 transition hover:bg-blue-500/30">
              <Plus size={18} />
            </button>
          ) : (
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300">
              <Bell size={16} />
            </button>
          )}
        </div>
      </div>
      {subtitle ? <div className="mx-auto mt-3 max-w-6xl text-sm text-slate-300">{subtitle}</div> : null}
    </header>
  );
}
