import type { ReactNode } from 'react';
import styles from './Section.module.css';

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  /** 1 when the section title is the page title. */
  level?: 1 | 2;
  /** Shown above the title, e.g. a back link. */
  lead?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, subtitle, level = 2, lead, children }: Props) {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.header}>
          {lead}
          <Heading id={`${id}-title`} className={styles.title}>
            {title}
          </Heading>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
