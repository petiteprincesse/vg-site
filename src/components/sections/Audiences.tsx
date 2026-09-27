import { audiences, audienceSection } from '@/content/audiences';
import { Bracket } from '@/components/ui/Bracket';
import { Lead } from '@/components/ui/Lead';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import grid from '@/styles/grid.module.css';
import styles from './Audiences.module.css';

export function Audiences() {
  return (
    <Section id="audience" labelledBy="audience-title">
      <SectionHeading id="audience-title" eyebrow={audienceSection.eyebrow} title={audienceSection.title} />

      <div className={grid.grid}>
        <Lead
          className={grid.colWide}
          parts={[
            { text: audienceSection.lead.muted, tone: 'faint' },
            { text: audienceSection.lead.strong, tone: 'strong' },
          ]}
        />
      </div>

      <Stagger as="ul" className={styles.cards} interval={0.09}>
        {audiences.map((audience) => (
          <StaggerItem as="li" key={audience.id} className={styles.card}>
            <Bracket side="start" className={styles.bracketStart} />
            <Bracket side="end" className={styles.bracketEnd} />

            <div className={styles.inner}>
              <div className={styles.head}>
                <p className={styles.number}>{audience.number}</p>
                <h3 className={styles.title}>{audience.title}</h3>
              </div>

              <ul className={styles.points}>
                {audience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
