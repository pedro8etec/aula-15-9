import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { AchievementCard } from '../components/AchievementCard';
import { certificateService } from '../services/api';
import { Certificate } from '../types';

export function AchievementsScreen() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await certificateService.list();
        setCertificates(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6 md:pb-10">
      <Header title="Conquistas" subtitle="Medalhas e certificados" />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <div className="md:col-span-2 xl:col-span-3"><LoadingState /></div> : error ? <div className="md:col-span-2 xl:col-span-3"><ErrorState message={error} /></div> : certificates.length ? certificates.map((certificate) => <AchievementCard key={certificate.id} certificate={certificate} />) : <div className="md:col-span-2 xl:col-span-3"><EmptyState message="Nenhum registro encontrado." /></div>}
      </div>
    </div>
  );
}
