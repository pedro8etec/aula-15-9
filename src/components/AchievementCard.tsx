import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Certificate } from '../types';
import { formatDate } from '../utils/format';

export function AchievementCard({ certificate }: { certificate: Certificate }) {
  return (
    <Link to={`/conquistas`} className="block rounded-[26px] border border-slate-700 bg-slate-900/80 p-4 transition hover:border-blue-500/50 hover:bg-slate-900">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 text-amber-200">
          <Award size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white">{certificate.numero}</h3>
          <p className="text-xs text-slate-400">Emissão {formatDate(certificate.dataEmissao)}</p>
        </div>
      </div>
    </Link>
  );
}
