'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/cn';
import { navigation, site } from '@/content/site';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { Container } from './Section';
import styles from './Header.module.css';

const SECTION_IDS = navigation.map((item) => item.href.slice(1));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(64);
  const activeId = useScrollSpy(SECTION_IDS) ?? SECTION_IDS[0];
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    lastY.current = y;
    if (Math.abs(delta) < 4) return;
    setHidden(delta > 0 && y > 480);
  });

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, close]);

  return (
    <header
      className={cn(styles.header, scrolled && styles.solid, hidden && !menuOpen && styles.tucked)}
      data-open={menuOpen || undefined}
    >
      <Container className={styles.bar}>
        <Link href="#top" className={styles.logo} aria-label={`${site.name} — на главную`} onClick={close}>
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={45}
            height={30}
            className={styles.mark}
            style={{ width: 'auto' }}
            priority
          />
          <Image
            src="/brand/logo-wordmark-ru.svg"
            alt=""
            width={110}
            height={28}
            className={styles.wordmark}
            style={{ width: 'auto' }}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  data-active={activeId === item.href.slice(1) || undefined}
                  aria-current={activeId === item.href.slice(1) ? 'true' : undefined}
                >
                  {activeId === item.href.slice(1) ? (
                    <motion.span
                      layoutId="nav-pill"
                      className={styles.pill}
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
          <span className="visuallyHidden">{menuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
        </button>
      </Container>

      <div id="mobile-nav" className={styles.mobilePanel} inert={!menuOpen} data-lenis-prevent>
        <nav aria-label="Мобильная навигация">
          <ul className={styles.mobileList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.mobileLink} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
