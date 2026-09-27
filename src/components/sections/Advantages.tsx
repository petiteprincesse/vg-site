import Image from 'next/image';
import { advantages, advantagesSection } from '@/content/advantages';
import { ButtonLink } from '@/components/ui/Button';
import { Lead } from '@/components/ui/Lead';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './Advantages.module.css';

export function Advantages() {
  return (
    <Section id="about" theme="inverse" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow={advantagesSection.eyebrow} title={advantagesSection.title} />

      <div className={grid.grid}>
        <Lead
          className={grid.colWide}
          parts={[
            { text: advantagesSection.lead.strong, tone: 'strong' },
            { text: advantagesSection.lead.muted, tone: 'muted' },
          ]}
        />

        <div className={cn(grid.colWide, styles.cards)}>
          <Stagger as="ul" className={styles.cardList} interval={0.12}>
            {advantages.map((advantage, index) => (
              <StaggerItem as="li" key={advantage.id} className={styles.card}>
                <ImageReveal className={styles.media} delay={index * 0.12}>
                  <Image
                    src={advantage.image.src}
                    alt={advantage.image.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 23vw"
                    className={styles.image}
                  />
                </ImageReveal>

                <h3 className={styles.cardTitle}>{advantage.title}</h3>

                <div className={styles.cardBody}>
                  {advantage.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal y={24}>
            <ButtonLink href={advantagesSection.cta.href} block>
              {advantagesSection.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
