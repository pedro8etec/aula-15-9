import { Award, BookOpen, House, User, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Central', to: '/', icon: House },
  { label: 'Pokédex', to: '/treinamentos', icon: BookOpen },
  { label: 'Treinadores', to: '/treinadores', icon: Users },
  { label: 'Conquistas', to: '/conquistas', icon: Award },
  { label: 'Perfil', to: '/perfil', icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-700/80 bg-slate-950/90 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:bottom-6 md:left-6 md:right-auto md:top-24 md:w-24 md:rounded-[32px] md:border md:px-2 md:py-3 md:shadow-glow">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 md:flex-col md:justify-start md:gap-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex w-full flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium transition ${
                isActive ? 'bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
