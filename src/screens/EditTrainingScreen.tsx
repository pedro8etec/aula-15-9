import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { trainingService } from '../services/api';
import { Training } from '../types';

export function EditTrainingScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    responsavel: '',
    dataInicio: '',
    cargaHoraria: '',
    status: 'pendente',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const result = await trainingService.detail(Number(id));
        const training = (result as any)?.treinamento as Training | undefined;
        if (!training) return;
        setForm({
          titulo: training.titulo || '',
          descricao: training.descricao || '',
          responsavel: '',
          dataInicio: training.dataInicio ? new Date(training.dataInicio).toISOString().slice(0, 10) : '',
          cargaHoraria: String(training.cargaHoraria || ''),
          status: training.status || 'pendente',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!id) return;
    setSaving(true);
    setError('');

    try {
      await trainingService.update(Number(id), {
        titulo: form.titulo,
        descricao: form.descricao,
        status: form.status,
        dataInicio: new Date(form.dataInicio).toISOString(),
        cargaHoraria: Number(form.cargaHoraria),
      });
      navigate(`/treinamentos/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mx-auto max-w-5xl px-4 py-6"><LoadingState /></div>;
  if (error) return <div className="mx-auto max-w-5xl px-4 py-6"><ErrorState message={error} /></div>;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Editar Treinamento" backTo={`/treinamentos/${id}`} />
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="pokedex-panel p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Dados principais</p>
            <div className="mt-4 space-y-4">
              <Input label="Nome" value={form.titulo} onChange={(e) => handleChange('titulo', e.target.value)} />
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400">Descrição</span>
                <textarea value={form.descricao} onChange={(e) => handleChange('descricao', e.target.value)} className="pokedex-input min-h-[120px] resize-none" />
              </label>
              <Input label="Responsável" value={form.responsavel} onChange={(e) => handleChange('responsavel', e.target.value)} />
            </div>
          </div>

          <div className="pokedex-panel p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Detalhes</p>
            <div className="mt-4 space-y-4">
              <Input label="Data" type="date" value={form.dataInicio} onChange={(e) => handleChange('dataInicio', e.target.value)} />
              <Input label="Duração (horas)" type="number" value={form.cargaHoraria} onChange={(e) => handleChange('cargaHoraria', e.target.value)} />
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400">Status</span>
                <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="pokedex-input">
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</div> : null}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => navigate(`/treinamentos/${id}`)}>Cancelar</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar alterações'}</Button>
        </div>
      </form>
    </div>
  );
}
