'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from './icons';
import styles from './Accordion.module.css';

export type AccordionItemModel = {
  id: string;
  aside: ReactNode;
  title: ReactNode;
  panel: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItemModel[];
  defaultOpenId?: string;
  className?: string;
};

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);
  const uid = useId();

  useEffect(() => {
    const ids = new Set(items.map((item) => item.id));
    const openFromHash = (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      if (ids.has(id)) setOpenId(id);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (link) openFromHash(link.getAttribute('href') ?? '');
    };
    const onHashChange = () => openFromHash(window.location.hash);

    openFromHash(window.location.hash);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [items]);

  return (
    <div className={cn(styles.list, className)}>
      {items.map((item) => {
        const open = item.id === openId;
        const buttonId = `${uid}-${item.id}-button`;
        const panelId = `${uid}-${item.id}-panel`;

        return (
          <div key={item.id} id={item.id} className={styles.row} data-open={open || undefined}>
            <div className={styles.aside}>{item.aside}</div>

            <h3 className={styles.headingRow}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? undefined : item.id)}
              >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.toggle} aria-hidden>
                  <ChevronDownIcon className={styles.chevron} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              inert={!open}
            >
              <div className={styles.panelInner}>{item.panel}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
