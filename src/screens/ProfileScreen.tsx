import { LogOut, ShieldCheck, UserCog, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { authService } from '../services/api';

export function ProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await authService.me();
        setProfile(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const logout = () => {
    localStorage.removeItem('pokedex-token');
    localStorage.removeItem('pokedex-user');
    navigate('/login');
    window.location.reload();
  };

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-6"><LoadingState /></div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-6"><ErrorState message={error} /></div>;

  const user = profile?.usuario;
  const funcionario = profile?.funcionario;
  const perfis = profile?.perfis || [];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Meu Perfil" subtitle="Conta e permissões" />

      <section className="mt-5 rounded-[30px] border border-slate-700 bg-slate-900/80 p-5 shadow-glow">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-slate-900 text-2xl font-bold text-white">{user?.email?.slice(0, 2).toUpperCase() || 'US'}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{funcionario?.nome || 'Usuário'}</h2>
            <p className="text-sm text-slate-300">{user?.email}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{funcionario?.cargo || 'Perfil'}</span>
              <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-blue-200">{funcionario?.setor || 'Operações'}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center gap-2"><UserCog size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Minha conta</p></div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><span className="text-slate-400">E-mail</span><p className="mt-1 text-white">{user?.email || 'Não informado'}</p></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><span className="text-slate-400">Matrícula</span><p className="mt-1 text-white">{funcionario?.matricula || 'Não informado'}</p></div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center gap-2"><ShieldCheck size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Permissões</p></div>
          <div className="space-y-3 text-sm text-slate-300">
            {perfis.length ? perfis.map((perfil: any) => (
              <div key={perfil.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><span className="text-slate-400">Perfil</span><p className="mt-1 text-white">{perfil.nome}</p></div>
            )) : <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-3 text-slate-300">Nenhum registro encontrado.</div>}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2"><Settings size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Configurações</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">Notificações</div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">Segurança</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-100 hover:bg-red-500/20">
          <LogOut size={16} /> Fazer logout
        </button>
      </div>
    </div>
  );
}
