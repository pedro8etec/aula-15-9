import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-300 shadow-inner shadow-slate-950/30">
      <Search size={17} className="text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
