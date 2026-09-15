import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { TrainerCard } from '../components/TrainerCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { employeeService } from '../services/api';
import { Employee } from '../types';

export function TrainersScreen() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await employeeService.list();
        setTrainers(Array.isArray(result) ? result : []);
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
    return trainers.filter((trainer) => !term || trainer.nome.toLowerCase().includes(term) || trainer.cargo.toLowerCase().includes(term));
  }, [search, trainers]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Treinadores" subtitle="Pokédex de treinadores" showSearch searchValue={search} onSearchChange={setSearch} />
      <div className="mt-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar treinador" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <div className="md:col-span-2 xl:col-span-3"><LoadingState /></div> : error ? <div className="md:col-span-2 xl:col-span-3"><ErrorState message={error} /></div> : filtered.length ? filtered.map((trainer) => <div key={trainer.id} onClick={() => navigate(`/treinadores/${trainer.id}`)}><TrainerCard trainer={trainer} id={trainer.id} /></div>) : <div className="md:col-span-2 xl:col-span-3"><EmptyState message="Nenhum registro encontrado." /></div>}
      </div>
    </div>
  );
}
