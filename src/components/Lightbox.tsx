import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Lightbox.module.css';

type Props = { open: boolean; title: string; closeLabel: string; onClose: () => void; children: ReactNode };

/**
 * Native modal dialog: keeps focus inside, closes with Escape, the close button or a click on the
 * backdrop, and hands focus back to the element that opened it.
 */
export function Lightbox({ open, title, closeLabel, onClose, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // One dialog per section, so each title needs its own id.
  const titleId = useId();

  // Runs after every render (not only when `open` flips): reopening right after Escape keeps `open`
  // true while the dialog itself is already closed.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  });

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={() => {
        // The close event is queued: ignore a late one that arrives after the dialog was reopened.
        if (ref.current?.open) return;
        onClose();
        opener.current?.focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <p id={titleId} className={styles.title}>
            {title}
          </p>
          <button type="button" className={styles.close} onClick={onClose}>
            <Icon name="close" size={20} />
            <span className="sr-only">{closeLabel}</span>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}
