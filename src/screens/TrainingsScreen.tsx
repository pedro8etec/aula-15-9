import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { TrainingCard } from '../components/TrainingCard';
import { trainingService } from '../services/api';
import { Training } from '../types';

const filters = ['Todos', 'Pendentes', 'Em andamento', 'Concluídos'];

type FilterType = 'Todos' | 'Pendentes' | 'Em andamento' | 'Concluídos';

export function TrainingsScreen() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await trainingService.list();
        setTrainings(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return trainings.filter((training) => {
      const matchesText = !term || training.titulo.toLowerCase().includes(term) || training.descricao.toLowerCase().includes(term);
      const matchesFilter = filter === 'Todos'
        || (filter === 'Pendentes' && training.status === 'pendente')
        || (filter === 'Em andamento' && training.status === 'em_andamento')
        || (filter === 'Concluídos' && training.status === 'concluido');
      return matchesText && matchesFilter;
    });
  }, [filter, search, trainings]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Treinamentos" showSearch showAddButton onAddClick={() => navigate('/treinamentos/novo')} searchValue={search} onSearchChange={setSearch} />

      <div className="mt-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar treinamento" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item as FilterType)}
            className={`pokedex-chip ${filter === item ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : filtered.length ? filtered.map((training) => <TrainingCard key={training.id} training={training} />) : <EmptyState message="Nenhum registro encontrado." />}
      </div>
    </div>
  );
}
