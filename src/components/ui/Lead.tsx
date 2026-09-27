import { cn } from '@/lib/cn';
import { Typewriter } from '@/components/motion/Typewriter';
import styles from './Lead.module.css';

export type LeadPart = {
  readonly text: string;
  readonly tone: 'strong' | 'muted' | 'faint';
};

export function Lead({ parts, className }: { parts: readonly LeadPart[]; className?: string }) {
  return (
    <Typewriter
      className={cn(styles.lead, className)}
      parts={parts.map((part) => ({ text: part.text, className: styles[part.tone] }))}
      speed={0.016}
      maxDuration={2.6}
    />
  );
}
