type PokeBallProps = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export function PokeBall({ size = 'medium', className = '' }: PokeBallProps) {
  return <span className={`pokeball ${size} ${className}`.trim()} aria-label="Poké Ball" />;
}
