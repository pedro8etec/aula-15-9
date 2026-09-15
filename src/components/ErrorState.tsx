export function ErrorState({ message = 'Não foi possível carregar os dados.' }: { message?: string }) {
  return (
    <div className="empty-state border-red-500/30 bg-red-500/5 text-red-100">
      <span className="text-2xl">⚠</span>
      <span>{message}</span>
    </div>
  );
}
