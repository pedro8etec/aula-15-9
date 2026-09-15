import { ArrowUpRight, CalendarDays, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Training } from '../types';
import { formatDate, formatStatus, getProgress } from '../utils/format';
import { StatusBadge } from './StatusBadge';

export function TrainingCard({ training }: { training: Training }) {
  const progress = getProgress(training);

  return (
    <Link to={`/treinamentos/${training.id}`} className="group block rounded-[26px] border border-slate-700 bg-slate-900/80 p-4 shadow-md shadow-slate-950/30 transition hover:border-blue-500/50 hover:bg-slate-900">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-red-500/20 text-blue-200 ring-1 ring-slate-700">
            <ClipboardList size={18} />
          </div>
          <div>
            <h3 className="line-clamp-1 text-base font-semibold text-white">{training.titulo}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={12} />
              <span>{formatDate(training.dataInicio)}</span>
            </div>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-blue-200" />
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <StatusBadge status={formatStatus(training.status)} />
        <span className="text-xs text-slate-400">{training.cargaHoraria || 0}h</span>
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Responsável</span>
          <span className="text-slate-200">Equipe</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Link>
  );
}
