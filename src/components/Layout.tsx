import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="pokedex-shell pb-24 md:pb-8 md:pl-32">
      <div className="mx-auto max-w-6xl px-0 md:px-6">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
