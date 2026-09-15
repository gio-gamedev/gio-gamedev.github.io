import { useEffect, useRef, type ReactNode } from 'react';
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

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="lightbox-title"
      onClose={() => {
        onClose();
        opener.current?.focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <p id="lightbox-title" className={styles.title}>
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
