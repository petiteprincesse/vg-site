import { hero } from '@/content/hero';
import { ButtonLink } from '@/components/ui/Button';
import { ArtDirectedBackdrop } from '@/components/ui/ArtDirectedBackdrop';
import { Container } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Typewriter } from '@/components/motion/Typewriter';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import { HeroMedia } from './HeroMedia';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <HeroMedia src={hero.image.src} alt={hero.image.alt} />

      <div className={styles.panel} data-theme="inverse">
        <ArtDirectedBackdrop
          wide="/img/gradient-hero.jpg"
          narrow="/img/gradient-hero-mobile.jpg"
          className={styles.gradient}
        />

        <Container className={styles.panelInner}>
          <div className={cn(grid.grid, styles.lede)}>
            <SplitText
              as="h1"
              id="hero-title"
              by="char"
              immediate
              delay={0.25}
              lines={hero.titleLines}
              className={cn(grid.colLeftHalf, styles.title)}
            />

            <div className={cn(grid.colRightHalf, styles.copy)}>
              {hero.paragraphs.map((paragraph, index) => (
                <Typewriter
                  key={paragraph}
                  parts={[{ text: paragraph }]}
                  delay={0.7 + index * 1.3}
                  maxDuration={1.3}
                  hideUntilTyped
                />
              ))}
            </div>
          </div>

          <Reveal delay={0.9} y={24}>
            <ButtonLink href={hero.cta.href} size="lg" block>
              {hero.cta.label}
            </ButtonLink>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
