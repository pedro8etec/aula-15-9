import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Employee, User } from '../types';
import { getAvatarGradient } from '../utils/format';

type TrainerCardProps = {
  trainer: Employee | User & { funcionario?: Employee | null };
  id?: number;
};

export function TrainerCard({ trainer, id }: TrainerCardProps) {
  const name = 'nome' in trainer ? trainer.nome : trainer.email;
  const role = 'cargo' in trainer ? trainer.cargo : 'Usuário do sistema';
  const status = 'ativo' in trainer ? (trainer.ativo ? 'Ativo' : 'Inativo') : 'Disponível';

  return (
    <Link to={`/treinadores/${id ?? trainer.id}`} className="block rounded-[26px] border border-slate-700 bg-slate-900/80 p-4 transition hover:border-blue-500/50 hover:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(Number((id ?? trainer.id) || 0))} text-white`}>
          <UserRound size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate text-base font-semibold text-white">{name}</h3>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
            <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">{status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
