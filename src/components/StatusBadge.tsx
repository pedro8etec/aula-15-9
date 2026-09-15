type StatusBadgeProps = {
  status?: string;
  className?: string;
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = (status || '').toLowerCase().replace(/\s+/g, '_');
  return <span className={`status-badge ${normalized} ${className}`.trim()}>{status || 'Sem status'}</span>;
}
