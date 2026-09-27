import Image from 'next/image';
import { teamGroups, teamSection } from '@/content/team';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';
import styles from './Team.module.css';

export function Team() {
  return (
    <Section id="team" labelledBy="team-title">
      <SectionHeading id="team-title" eyebrow={teamSection.eyebrow} title={teamSection.title} />

      <div className={styles.groups}>
        {teamGroups.map((group) => (
          <section key={group.id} className={styles.group} aria-labelledby={`team-${group.id}`}>
            <Reveal y={20}>
              <h3 id={`team-${group.id}`} className={styles.groupTitle}>
                {group.title}
              </h3>
            </Reveal>

            <Stagger as="ul" className={styles.members} interval={0.1}>
              {group.members.map((member, index) => (
                <StaggerItem
                  as="li"
                  key={member.id}
                  className={cn(styles.member, member.featured && styles.featured)}
                >
                  <ImageReveal
                    className={cn(styles.photo, member.featured && styles.photoFeatured)}
                    delay={index * 0.1}
                  >
                    <Image
                      src={member.photo.src}
                      alt={member.name}
                      fill
                      sizes={member.featured ? '(max-width: 1279px) 100vw, 46vw' : '(max-width: 1279px) 50vw, 23vw'}
                      className={styles.photoImage}
                      style={member.photo.position ? { objectPosition: member.photo.position } : undefined}
                    />
                  </ImageReveal>

                  <p className={styles.name}>{member.name}</p>
                  <p className={styles.role}>{member.role || '\u00a0'}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </Section>
  );
}
