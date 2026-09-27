import { cn } from '@/lib/cn';
import grid from '@/styles/grid.module.css';
import { SplitText } from '@/components/motion/SplitText';
import { Typewriter } from '@/components/motion/Typewriter';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  uppercase?: boolean;
  titleLines?: readonly string[];
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  uppercase,
  titleLines,
  className,
  titleClassName,
  eyebrowClassName,
}: SectionHeadingProps) {
  return (
    <header className={cn(grid.grid, styles.heading, className)}>
      <Typewriter
        parts={[{ text: eyebrow }]}
        className={cn(grid.colLeftHalf, styles.eyebrow, eyebrowClassName)}
        speed={0.035}
        delay={0.05}
      />
      <SplitText
        as="h2"
        id={id}
        lines={titleLines ?? [title]}
        className={cn(grid.colRightHalf, styles.title, uppercase && styles.uppercase, titleClassName)}
      />
    </header>
  );
}
