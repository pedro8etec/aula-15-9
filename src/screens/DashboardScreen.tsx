import { Activity, Award, BookOpen, CheckCircle2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { PokedexCard } from '../components/PokedexCard';
import { TrainingCard } from '../components/TrainingCard';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PokeBall } from '../components/PokeBall';
import { dashboardService, employeeService, instructorService, trainingService, certificateService } from '../services/api';
import { DashboardData, Employee, Instructor, Training, Certificate } from '../types';

export function DashboardScreen() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [dashboardData, trainingData, employeesData, instructorsData, certificatesData] = await Promise.all([
          dashboardService.get(),
          trainingService.list(),
          employeeService.list(),
          instructorService.list(),
          certificateService.list(),
        ]);

        setDashboard(dashboardData);
        setTrainings(trainingData || []);
        setEmployees(employeesData || []);
        setInstructors(instructorsData || []);
        setCertificates(certificatesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = [
    { title: 'Treinamentos', value: dashboard?.quantidadeTreinamentos ?? 0, icon: <BookOpen size={18} />, subtitle: 'Total no sistema' },
    { title: 'Em andamento', value: trainings.filter((item) => item.status === 'em_andamento').length, icon: <Activity size={18} />, subtitle: 'Ativos' },
    { title: 'Concluídos', value: trainings.filter((item) => item.status === 'concluido').length, icon: <CheckCircle2 size={18} />, subtitle: 'Atividades fechadas' },
    { title: 'Treinadores', value: employees.length, icon: <Users size={18} />, subtitle: 'Equipe' },
    { title: 'Certificados', value: certificates.length, icon: <Award size={18} />, subtitle: 'Emitidos' },
  ];

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-6"><LoadingState /></div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-6"><ErrorState message={error} /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Central" subtitle="Bem-vindo de volta ao sistema" />

      <section className="mt-5 rounded-[30px] border border-slate-700 bg-slate-900/80 p-4 shadow-glow">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Saudação</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Olá, Carlos</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-red-500 text-white shadow-lg shadow-blue-900/20">
              <span className="text-sm font-bold">CS</span>
            </div>
            <PokeBall size="small" />
          </div>
        </div>

        <div className="mt-5 rounded-[24px] border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-500/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resumo</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Operação ativa</h3>
            </div>
            <div className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-200">Online</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3"><span className="block text-slate-400">Funcionários</span><strong className="text-lg text-white">{dashboard?.quantidadeFuncionarios ?? 0}</strong></div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3"><span className="block text-slate-400">Instrutores</span><strong className="text-lg text-white">{instructors.length}</strong></div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <PokedexCard key={stat.title} title={stat.title} subtitle={stat.subtitle} value={stat.value} icon={stat.icon} className="min-h-[130px]" />
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Treinamentos recentes</h3>
          <Link to="/treinamentos" className="text-xs uppercase tracking-[0.18em] text-blue-200">Ver todos</Link>
        </div>
        <div className="space-y-3">
          {trainings.length ? trainings.slice(0, 3).map((training) => <TrainingCard key={training.id} training={training} />) : <div className="empty-state">Nenhum registro encontrado.</div>}
        </div>
      </section>
    </div>
  );
}
