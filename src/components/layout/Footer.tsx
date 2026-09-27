import Image from 'next/image';
import Link from 'next/link';
import { navigation, site } from '@/content/site';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { ArtDirectedBackdrop } from '@/components/ui/ArtDirectedBackdrop';
import { Container } from './Section';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} data-theme="inverse">
      <ArtDirectedBackdrop
        wide="/img/gradient-footer.jpg"
        narrow="/img/gradient-footer-mobile.jpg"
        className={styles.gradient}
      />

      <Container className={styles.inner}>
        <SplitText as="p" lines={[site.name]} className={styles.wordmark} />

        <Reveal className={styles.menus} y={24}>
          <p className={styles.tagline}>{site.tagline}</p>

          <nav className={styles.nav} aria-label="Навигация в подвале">
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div className={styles.bottom}>
          <Link href="#top" className={styles.logo} aria-label={`${site.legalName} — наверх`}>
            <Image src="/brand/logo-mark-footer.svg" alt="" width={45} height={30} className={styles.mark}
            style={{ width: 'auto' }} />
            <Image
              src="/brand/logo-wordmark-en.svg"
              alt=""
              width={78}
              height={30}
              className={styles.wordmark2}
            style={{ width: 'auto' }}
            />
          </Link>

          <div className={styles.legalGroup}>
            <p className={styles.legal}>{site.copyright}</p>

            <Link className={styles.legal} href={site.privacy.href}>
              {site.privacy.label}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
