import type { ReactNode } from 'react';
import type { Tone } from '../content/types';
import styles from './Tag.module.css';

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={styles.tag} data-tone={tone}>
      {children}
    </span>
  );
}
