import Image from 'next/image';
import Link from 'next/link';
import { news, newsSection } from '@/content/news';
import { Tag } from '@/components/ui/Tag';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { formatDate } from '@/lib/date';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import styles from './News.module.css';

export function News() {
  return (
    <Section id="news" labelledBy="news-title">
      <SectionHeading id="news-title" eyebrow={newsSection.eyebrow} title={newsSection.title} />

      <Stagger className={styles.mosaic} interval={0.1}>
        {news.map((item) => (
          <StaggerItem
            as="article"
            key={item.id}
            className={styles.item}
            data-side={item.image?.side}
            data-wide={item.wide || undefined}
          >
            <div className={styles.body}>
              <Tag>{item.tag}</Tag>

              <h3 className={styles.title}>
                <Link href={item.href} className={styles.link}>
                  {item.title}
                </Link>
              </h3>

              <time className={styles.date} dateTime={item.date}>
                {formatDate(item.date)}
              </time>

              <p className={styles.excerpt}>{item.excerpt}</p>
            </div>

            {item.image ? (
              <ImageReveal className={styles.photo} from={item.image.side === 'start' ? 'left' : 'right'}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 23vw"
                  className={styles.photoImage}
                />
              </ImageReveal>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
