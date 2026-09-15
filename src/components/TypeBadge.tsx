type TypeBadgeProps = {
  label: string;
  tone?: 'blue' | 'red' | 'green' | 'amber' | 'slate' | 'indigo';
};

const tones: Record<string, string> = {
  blue: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
  red: 'border-red-500/50 bg-red-500/10 text-red-200',
  green: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200',
  amber: 'border-amber-500/50 bg-amber-500/10 text-amber-200',
  slate: 'border-slate-500/50 bg-slate-500/10 text-slate-200',
  indigo: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-200',
};

export function TypeBadge({ label, tone = 'blue' }: TypeBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {label}
    </span>
  );
}
