import { cn } from '@/lib/cn';
import styles from './Bracket.module.css';

export function Bracket({ side, className }: { side: 'start' | 'end'; className?: string }) {
  return (
    <svg
      className={cn(styles.bracket, side === 'start' && styles.start, className)}
      viewBox="0 0 71 501"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      focusable={false}
    >
      <path
        d="M0.5 0.5H68.5C69.6046 0.5 70.5 1.39543 70.5 2.5V498.5C70.5 499.605 69.6046 500.5 68.5 500.5H0.5"
        stroke="currentColor"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
