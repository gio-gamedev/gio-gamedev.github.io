import type { ReactNode } from 'react';
import styles from './Section.module.css';

type Props = {
  id: string;
  /** "01" etc. on the home page; omitted on pages with a single section. */
  index?: string;
  title: string;
  subtitle?: string;
  /** 1 when the section title is the page title. */
  level?: 1 | 2;
  children: ReactNode;
};

export function Section({ id, index, title, subtitle, level = 2, children }: Props) {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.header}>
          {index && (
            <p className={styles.index} aria-hidden="true">
              {index} //
            </p>
          )}
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
