import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { trainingService } from '../services/api';

export function CreateTrainingScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    responsavel: '',
    dataInicio: '',
    cargaHoraria: '',
    status: 'pendente',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.titulo || !form.descricao || !form.responsavel || !form.dataInicio || !form.cargaHoraria) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      await trainingService.create({
        titulo: form.titulo,
        descricao: form.descricao,
        status: form.status,
        dataInicio: new Date(form.dataInicio).toISOString(),
        cargaHoraria: Number(form.cargaHoraria),
      });
      setSuccess('Treinamento registrado com sucesso.');
      setTimeout(() => navigate('/treinamentos'), 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível registrar o treinamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Novo Treinamento" backTo="/treinamentos" />
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
        {success ? <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">{success}</div> : null}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => navigate('/treinamentos')}>Cancelar</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar Treinamento'}</Button>
        </div>
      </form>
    </div>
  );
}
