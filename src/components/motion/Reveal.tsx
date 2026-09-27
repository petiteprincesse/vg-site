'use client';

import { motion, stagger, type Variants } from 'motion/react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'p' | 'span' | 'article' | 'header' | 'figure';

type RevealProps = {
  as?: Tag;
  delay?: number;
  y?: number;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

export function Reveal({ as = 'div', delay = 0, y = 40, className, children, ...rest }: RevealProps) {
  const Component = motion[as] as ElementType;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  as?: Tag;
  interval?: number;
  delay?: number;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

export function Stagger({ as = 'div', interval = 0.08, delay = 0, className, children, ...rest }: StaggerProps) {
  const Component = motion[as] as ElementType;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  as = 'div',
  className,
  children,
  ...rest
}: { as?: Tag; className?: string; children?: ReactNode } & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>) {
  const Component = motion[as] as ElementType;
  return (
    <Component className={className} variants={riseVariants} {...rest}>
      {children}
    </Component>
  );
}
