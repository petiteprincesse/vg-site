import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ArrowUpRightIcon } from './icons';
import styles from './Button.module.css';

type Variant = 'solid' | 'plain';
type Size = 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  withArrow?: boolean;
  className?: string;
};

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
type LinkProps = CommonProps & { href: string };

function classes({ variant = 'solid', size = 'md', block, className }: CommonProps) {
  return cn(styles.button, styles[variant], styles[size], block && styles.block, className);
}

function Inner({ children, withArrow = true }: Pick<CommonProps, 'children' | 'withArrow'>) {
  return (
    <span className={styles.inner}>
      <span>{children}</span>
      {withArrow ? <ArrowUpRightIcon className={styles.icon} /> : null}
    </span>
  );
}

export function Button({ children, withArrow, variant, size, block, className, ...rest }: ButtonProps) {
  return (
    <button className={classes({ children, variant, size, block, className })} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({ children, withArrow, variant, size, block, className, href }: LinkProps) {
  return (
    <Link href={href} className={classes({ children, variant, size, block, className })}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
