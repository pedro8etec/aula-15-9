export const formatDate = (value?: string) => {
  if (!value) return 'Não informado';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatStatus = (status?: string) => {
  if (!status) return 'Sem status';
  const map: Record<string, string> = {
    pendente: 'Pendente',
    em_andamento: 'Em andamento',
    'em andamento': 'Em andamento',
    concluido: 'Concluído',
    aprovado: 'Aprovado',
    valido: 'Válido',
    ativo: 'Ativo',
    inativo: 'Inativo',
  };
  return map[status] || status;
};

export const toTitleCase = (value?: string) => {
  if (!value) return 'Não informado';
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

export const getProgress = (training?: { status?: string; cargaHoraria?: number; dataInicio?: string; dataFim?: string }) => {
  if (!training) return 0;
  if (training.status === 'concluido') return 100;
  if (training.status === 'em_andamento') return 65;
  if (training.status === 'pendente') return 25;
  if (training.dataInicio && training.dataFim) {
    const start = new Date(training.dataInicio).getTime();
    const end = new Date(training.dataFim).getTime();
    const now = Date.now();
    if (Number.isFinite(start) && Number.isFinite(end)) {
      const total = end - start;
      const elapsed = now - start;
      if (total > 0) return Math.min(100, Math.max(10, (elapsed / total) * 100));
    }
  }
  return 40;
};

export const getAvatarGradient = (seed: number) => {
  const colors = ['from-blue-500 via-cyan-400 to-indigo-500', 'from-red-500 via-rose-400 to-orange-500', 'from-slate-500 via-zinc-400 to-slate-700', 'from-emerald-500 via-green-400 to-teal-500'];
  return colors[seed % colors.length];
};
