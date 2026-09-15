export function EmptyState({ message = 'Nenhum registro encontrado.' }: { message?: string }) {
  return (
    <div className="empty-state">
      <span className="text-2xl">◌</span>
      <span>{message}</span>
    </div>
  );
}
