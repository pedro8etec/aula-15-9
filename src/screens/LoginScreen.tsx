import { KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PokeBall } from '../components/PokeBall';
import { authService } from '../services/api';

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('carlo.souza@empresa.com');
  const [password, setPassword] = useState('senhaSegura123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login({ email, senha: password });
      if (!user?.token) throw new Error('Credenciais inválidas.');
      localStorage.setItem('pokedex-token', user.token);
      localStorage.setItem('pokedex-user', JSON.stringify(user.usuario));
      onLoginSuccess();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokedex-shell relative overflow-hidden">
      <div className="pokedex-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 shadow-glow">
            <PokeBall size="large" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Pokédex</p>
            <h1 className="text-2xl font-bold text-white">Treinamentos</h1>
          </div>
        </div>

        <div className="pokedex-panel p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Acesso</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Entrar</h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-200">
              <ShieldCheck size={18} />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Usuário ou e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              leftIcon={<Mail size={16} className="text-slate-400" />}
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<KeyRound size={16} className="text-slate-400" />}
            />

            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {error ? <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</div> : null}

          {loading ? (
            <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-300">
              <span className="loading-spinner" />
              <span>Carregando dados...</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
