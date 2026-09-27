import { faq, faqSection } from '@/content/faq';
import { Accordion, type AccordionItemModel } from '@/components/ui/Accordion';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './Faq.module.css';

const items: AccordionItemModel[] = faq.map((item, index) => ({
  id: item.id,
  aside: String(index + 1).padStart(2, '0'),
  title: item.question,
  panel: <p className={styles.answer}>{item.answer}</p>,
}));

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <SectionHeading
        id="faq-title"
        eyebrow={faqSection.eyebrow}
        title={faqSection.title}
        titleClassName={styles.title}
      />

      <div className={grid.grid}>
        <Reveal className={cn(grid.colWide, styles.list)} y={32}>
          <Accordion items={items} defaultOpenId={faqSection.defaultOpenId} />
        </Reveal>
      </div>
    </Section>
  );
}
