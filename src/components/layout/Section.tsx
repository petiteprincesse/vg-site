import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

type SectionProps = {
  id: string;
  theme?: 'default' | 'inverse';
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, theme = 'default', labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={theme === 'inverse' ? 'inverse' : undefined}
      className={cn(styles.section, className)}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}
