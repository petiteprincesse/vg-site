import Image from 'next/image';
import type { CSSProperties } from 'react';
import { historyEvents, historySection } from '@/content/history';
import { Accordion, type AccordionItemModel } from '@/components/ui/Accordion';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { Typewriter } from '@/components/motion/Typewriter';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './History.module.css';

const items: AccordionItemModel[] = historyEvents.map((event) => ({
  id: event.id,
  aside: event.year,
  title: event.title,
  panel: (
    <div className={styles.panel}>
      <p className={styles.summary}>{event.summary}</p>

      <ul className={styles.gallery} style={{ '--cols': Math.max(3, event.gallery.length) } as CSSProperties}>
        {event.gallery.map((media, index) => (
          <li
            key={`${event.id}-${index}`}
            className={styles.shot}
            style={{ '--i': index } as CSSProperties}
          >
            {media.kind === 'image' ? (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1279px) 33vw, 23vw"
                className={styles.shotImage}
              />
            ) : (
              <video
                className={styles.shotImage}
                src={media.src}
                poster={media.poster}
                aria-label={media.alt}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  ),
}));

export function History() {
  return (
    <Section id="history" labelledBy="history-title">
      <SectionHeading id="history-title" eyebrow={historySection.eyebrow} title={historySection.title} />

      <div className={grid.grid}>
        <div className={cn(grid.colRightHalf, styles.intro)}>
          {historySection.body.map((paragraph, index) => (
            <Typewriter key={index} parts={[{ text: paragraph }]} delay={0.1 + index * 1.2} maxDuration={1.8} />
          ))}
        </div>
      </div>

      <Reveal y={32}>
        <Accordion items={items} defaultOpenId={historySection.defaultOpenId} className={styles.list} />
      </Reveal>
    </Section>
  );
}
