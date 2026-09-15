export function LoadingState({ message = 'Carregando dados...' }: { message?: string }) {
  return (
    <div className="loading-state">
      <span className="loading-spinner" />
      <span>{message}</span>
    </div>
  );
}
