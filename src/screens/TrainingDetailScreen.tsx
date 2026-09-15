import { Pencil, Trash2, UserRound, ShieldCheck, FileText, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { trainingService } from '../services/api';
import { TrainingDetail } from '../types';
import { formatDate, formatStatus } from '../utils/format';

export function TrainingDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<TrainingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        const result = await trainingService.detail(Number(id));
        setData(result as any);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await trainingService.remove(Number(id));
      navigate('/treinamentos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir.');
    }
  };

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-6"><LoadingState /></div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-6"><ErrorState message={error} /></div>;
  if (!data?.treinamento) return <div className="mx-auto max-w-6xl px-4 py-6"><EmptyState message="Nenhum registro encontrado." /></div>;

  const { treinamento, instrutores, responsaveis, participantes, evidencias } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title={treinamento.titulo} backTo="/treinamentos" subtitle="Ficha do treinamento" />

      <div className="mt-5 rounded-[28px] border border-slate-700 bg-slate-900/80 p-4 shadow-glow">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Status</p>
            <div className="mt-2"><StatusBadge status={formatStatus(treinamento.status)} /></div>
          </div>
          <div className="flex gap-2">
            <Link to={`/treinamentos/${treinamento.id}/editar`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
              <Pencil size={15} /> Editar
            </Link>
            <button onClick={handleDelete} type="button" className="inline-flex items-center gap-2 rounded-2xl border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-100 hover:bg-red-500/20">
              <Trash2 size={15} /> Excluir
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <section className="space-y-5">
          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Informações</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-slate-400">Nome</p>
                <p className="text-lg font-semibold text-white">{treinamento.titulo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Descrição</p>
                <p className="text-sm text-slate-200">{treinamento.descricao || 'Nenhuma descrição disponível.'}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Responsável</p><p className="mt-2 text-sm text-white">{responsaveis[0]?.email || 'Não informado'}</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Data</p><p className="mt-2 text-sm text-white">{formatDate(treinamento.dataInicio)}</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Duração</p><p className="mt-2 text-sm text-white">{treinamento.cargaHoraria || 0}h</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Status</p><p className="mt-2 text-sm text-white">{formatStatus(treinamento.status)}</p></div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2"><UserRound size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Instrutores</p></div>
            <div className="mt-4 space-y-3">
              {instrutores.length ? instrutores.map((instrutor) => (
                <div key={instrutor.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{instrutor.nome}</p>
                      <p className="text-xs text-slate-400">{instrutor.especialidade}</p>
                    </div>
                    <ShieldCheck size={16} className="text-emerald-300" />
                  </div>
                </div>
              )) : <EmptyState message="Nenhum registro encontrado." />}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2"><FileText size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Participantes</p></div>
            <div className="mt-4 space-y-3">
              {participantes.length ? participantes.map((participant) => (
                <div key={participant.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white">{participant.funcionario?.nome || 'Participante'}</p>
                    <StatusBadge status={participant.status} />
                  </div>
                </div>
              )) : <EmptyState message="Nenhum registro encontrado." />}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Assinaturas</p>
            <div className="mt-4 space-y-3">
              {data?.treinamento ? <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">Assinatura digital disponível.</div> : <EmptyState message="Nenhum registro encontrado." />}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2"><Award size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Evidências</p></div>
            <div className="mt-4 space-y-3">
              {evidencias.length ? evidencias.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <p className="text-sm font-medium text-white">{item.tipo}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.descricao}</p>
                </div>
              )) : <EmptyState message="Nenhum registro encontrado." />}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Certificados</p>
            <div className="mt-4 space-y-3">
              {participantes.length ? <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">Certificado emitido para o participante principal.</div> : <EmptyState message="Nenhum registro encontrado." />}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={() => navigate('/treinamentos')}>Cancelar</Button>
        <Button onClick={() => navigate(`/treinamentos/${treinamento.id}/editar`)}>Editar</Button>
      </div>
    </div>
  );
}
