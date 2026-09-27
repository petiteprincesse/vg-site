import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import styles from './status-page.module.css';

export const metadata: Metadata = { title: 'Страница не найдена' };

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Container className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Такой страницы нет</h1>
        <p className={styles.body}>
          Возможно, ссылка устарела. Вернитесь на главную — там вся программа Венчурных игр.
        </p>
        <ButtonLink href="/">На главную</ButtonLink>
        <Link className={styles.secondary} href="/#contact">
          Написать организаторам
        </Link>
      </Container>
    </main>
  );
}
