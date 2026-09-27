import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Section';
import { site } from '@/content/site';
import styles from '../status-page.module.css';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: `Как ${site.name} обрабатывают персональные данные, оставленные через форму заявки.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <Container className={styles.inner}>
        <h1 className={styles.title}>Политика конфиденциальности</h1>

        <div className={styles.prose}>
          <p>
            Форма «Станьте партнером» собирает только те данные, которые вы вводите сами: имя, контакт
            в Telegram и описание проекта. Они нужны организаторам {site.name}, чтобы связаться с вами
            и оценить заявку.
          </p>

          <h2>Что мы собираем</h2>
          <p>
            Имя, название компании или стартапа, стадию проекта, контакт для связи и текст заявки.
            Мы не собираем платёжные данные и не используем рекламные трекеры.
          </p>

          <h2>Как используем</h2>
          <p>
            Данные передаются только команде проекта и не публикуются. Мы храним заявки до завершения
            отбора и удаляем их по вашему запросу.
          </p>

          <h2>Как отозвать согласие</h2>
          <p>
            Напишите организаторам через форму на главной странице — мы удалим заявку и подтвердим это
            в ответном сообщении.
          </p>
        </div>

        <Link className={styles.secondary} href="/">
          Вернуться на главную
        </Link>
      </Container>
    </main>
  );
}
