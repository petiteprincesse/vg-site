import Image from 'next/image';
import { isUpcoming, upcomingGame } from '@/content/upcoming';
import { ButtonLink } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal } from '@/components/motion/Reveal';
import { Typewriter } from '@/components/motion/Typewriter';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './Upcoming.module.css';

export function Upcoming() {
  if (!isUpcoming(upcomingGame)) return null;

  const [lead, ...rest] = upcomingGame.paragraphs;

  return (
    <Section id={upcomingGame.id} labelledBy="upcoming-title">
      <SectionHeading id="upcoming-title" eyebrow={upcomingGame.eyebrow} title={upcomingGame.title} />

      <div className={cn(grid.grid, styles.layout)}>
        <ImageReveal className={styles.poster}>
          <Image
            src={upcomingGame.poster.src}
            alt={upcomingGame.poster.alt}
            fill
            sizes="(max-width: 1279px) 100vw, 23vw"
            className={styles.posterImage}
          />
        </ImageReveal>

        <div className={styles.content}>
          <Reveal className={styles.meta} y={16}>
            <Tag>{upcomingGame.when}</Tag>
            <Tag>{upcomingGame.where}</Tag>
          </Reveal>

          {lead ? <Typewriter parts={[{ text: lead }]} className={styles.lead} maxDuration={1.4} /> : null}

          {rest.map((paragraph, index) => (
            <Typewriter
              key={paragraph}
              parts={[{ text: paragraph }]}
              className={styles.text}
              delay={0.6 + index * 0.9}
              maxDuration={1.8}
            />
          ))}

          <Reveal y={16} delay={0.3}>
            <ButtonLink href={upcomingGame.cta.href} size="lg" block>
              {upcomingGame.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
