'use client';

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import styles from './Field.module.css';

type BaseProps = {
  label: string;
  error?: string;
  className?: string;
};

type InputProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;
type TextareaProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

function useFieldIds(error?: string) {
  const id = useId();
  return { id, errorId: error ? `${id}-error` : undefined };
}

export function TextField({ label, error, className, ...rest }: InputProps) {
  const { id, errorId } = useFieldIds(error);

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={cn(styles.control, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({ label, error, className, ...rest }: TextareaProps) {
  const { id, errorId } = useFieldIds(error);

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={cn(styles.control, styles.textarea, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
