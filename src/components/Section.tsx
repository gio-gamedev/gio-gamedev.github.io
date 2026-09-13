import type { ReactNode } from 'react';
import styles from './Section.module.css';

type Props = {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, index, title, subtitle, children }: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.index} aria-hidden="true">
            {index} //
          </p>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
