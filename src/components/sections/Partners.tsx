'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'motion/react';
import { useCallback, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { partnerCategories, partners, partnersSection, type Partner, type PartnerCategoryId } from '@/content/partners';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Bracket } from '@/components/ui/Bracket';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Typewriter } from '@/components/motion/Typewriter';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './Partners.module.css';

const MAX_PER_VIEW = 4;
const MAX_LEAD = 3;
const SLIDE_SPRING = { type: 'spring', stiffness: 260, damping: 34, restDelta: 0.001 } as const;

function wrapSlot(slot: number, offset: number, length: number) {
  return ((((slot - offset + 1) % length) + length) % length) - 1;
}

type StripCardProps = {
  offset: MotionValue<number>;
  slot: number;
  length: number;
  wrap: boolean;
  hidden: boolean;
  children: ReactNode;
};

function StripCard({ offset, slot, length, wrap, hidden, children }: StripCardProps) {
  const position = useTransform(offset, (value) => (wrap ? wrapSlot(slot, value, length) : slot));
  return (
    <motion.li className={styles.card} style={{ '--pos': position } as MotionStyle} aria-hidden={hidden || undefined}>
      {children}
    </motion.li>
  );
}

export function Partners() {
  const [category, setCategory] = useState<PartnerCategoryId>('all');
  const [perView, setPerView] = useState(MAX_PER_VIEW);
  const offset = useMotionValue(0);
  const target = useRef(0);
  const swipeStart = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (category === 'all' ? partners : partners.filter((p) => p.categories.includes(category))),
    [category],
  );

  const count = visible.length;
  const loop = count > 1 && count >= perView;
  const length = loop ? count * Math.ceil((perView + 2) / count) : count;

  const observeTrack = useCallback((track: HTMLUListElement | null) => {
    if (!track) return;
    const measure = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setPerView(Math.max(1, Math.round((track.clientWidth + gap) / (card.offsetWidth + gap))));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const resetStrip = () => {
    offset.stop();
    target.current = 0;
    offset.set(0);
  };

  const slide = (direction: 1 | -1) => {
    if (!loop) return;
    const current = Math.round(offset.get());
    target.current = Math.min(Math.max(target.current + direction, current - MAX_LEAD), current + MAX_LEAD);
    if (reduce) offset.set(target.current);
    else animate(offset, target.current, SLIDE_SPRING);
  };

  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    swipeStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLUListElement>) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 40) slide(distance < 0 ? 1 : -1);
  };

  return (
    <Section id="partners" labelledBy="partners-title">
      <SectionHeading id="partners-title" eyebrow={partnersSection.eyebrow} title={partnersSection.title} />

      <div className={grid.grid}>
        <div className={grid.colLeftHalf}>
          <ImageReveal className={styles.intro}>
            <Image
              src={partnersSection.image.src}
              alt={partnersSection.image.alt}
              fill
              sizes="(max-width: 1279px) 40vw, 203px"
              className={styles.introImage}
            />
          </ImageReveal>
        </div>

        <div className={cn(grid.colRightHalf, styles.about)}>
          {partnersSection.body.map((paragraph, index) => (
            <Typewriter key={paragraph} parts={[{ text: paragraph }]} delay={0.1 + index * 1.2} maxDuration={1.6} />
          ))}

          <Reveal y={16} delay={0.4}>
            <ButtonLink href={partnersSection.cta.href} variant="plain">
              {partnersSection.cta.label}
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger
          className={cn(grid.colRightHalf, styles.filters)}
          interval={0.05}
          role="group"
          aria-label="Категории партнёров"
        >
          {partnerCategories.map((item) => (
            <StaggerItem key={item.id} className={styles.filterItem}>
              <Chip active={category === item.id} pillId="partner-filter" onClick={() => setCategory(item.id)}>
                {item.label}
              </Chip>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className={styles.gallery}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={resetStrip}>
          <motion.ul
            key={category}
            ref={observeTrack}
            className={styles.track}
            aria-label="Логотипы партнёров"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {Array.from({ length }, (_, slot) => {
              const partner = visible[slot % count] as Partner;
              const hidden = slot >= count;
              return (
                <StripCard key={`${length}:${loop}:${slot}`} offset={offset} slot={slot} length={length} wrap={loop} hidden={hidden}>
                  <Bracket side="start" className={styles.cardBracket} />
                  <Image
                    src={partner.logo.src}
                    alt={hidden ? '' : partner.name}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    sizes="215px"
                    loading="eager"
                    draggable={false}
                    className={cn(
                      styles.logo,
                      partner.logo.fit === 'contain' && styles.logoContain,
                      partner.logo.fit === 'badge' && styles.logoBadge,
                    )}
                  />
                  <Bracket side="end" className={styles.cardBracket} />
                </StripCard>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => slide(-1)}
            disabled={!loop}
          >
            <ArrowLeftIcon />
            <span className="visuallyHidden">Предыдущие партнёры</span>
          </button>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => slide(1)}
            disabled={!loop}
          >
            <ArrowRightIcon />
            <span className="visuallyHidden">Следующие партнёры</span>
          </button>
        </div>
      </div>
    </Section>
  );
}
