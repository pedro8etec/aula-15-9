import { Sparkles, Trophy, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { employeeService, trainingService } from '../services/api';
import { Employee, Training } from '../types';

export function TrainerProfileScreen() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const employees = await employeeService.list();
        const trainer = (Array.isArray(employees) ? employees : []).find((item) => item.id === Number(id)) || null;
        setEmployee(trainer);
        const trainingList = await trainingService.list();
        const related = (Array.isArray(trainingList) ? trainingList : []).slice(0, 3);
        setTrainings(related);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-6"><LoadingState /></div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-6"><ErrorState message={error} /></div>;
  if (!employee) return <div className="mx-auto max-w-6xl px-4 py-6"><EmptyState message="Nenhum registro encontrado." /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Treinador" backTo="/treinadores" />

      <section className="mt-5 rounded-[30px] border border-slate-700 bg-slate-900/80 p-5 shadow-glow">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-slate-900 text-2xl font-bold text-white">{employee.nome.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{employee.nome}</h2>
            <p className="text-sm text-slate-300">{employee.cargo}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{employee.setor}</span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">Ativo</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
          <div className="mb-3 flex items-center gap-2"><BookOpen size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Treinamentos</p></div>
          <div className="space-y-3">
            {trainings.length ? trainings.map((training) => (
              <div key={training.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                <p className="font-medium text-white">{training.titulo}</p>
                <p className="mt-1 text-xs text-slate-400">{training.status}</p>
              </div>
            )) : <EmptyState message="Nenhum registro encontrado." />}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5">
          <div className="mb-3 flex items-center gap-2"><Trophy size={16} className="text-blue-200" /><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Conquistas</p></div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200"><Sparkles size={16} /></div>
              <div>
                <p className="font-medium text-white">Certificado de segurança</p>
                <p className="text-xs text-slate-400">Registro ativo</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
