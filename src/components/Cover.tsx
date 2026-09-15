import { useState } from 'react';
import { coverOf, coverSrcSet, coverUrl, projectSlug, type Project } from '../content/projects';
import styles from './Cover.module.css';

type Props = { project: Project; name: string; sizes: string };

/**
 * Cover art for cards and catalog tiles. Wide art fills the 16:9 frame; a square store icon sits
 * on a blurred copy of itself (same file), so it is never stretched or left floating in an empty
 * box. Without art, or if the file fails to load, a placeholder shows the title. The images are
 * decorative (alt=""): the title is always the card's heading right below.
 */
export function Cover({ project, name, sizes }: Props) {
  const [failed, setFailed] = useState(false);
  const cover = coverOf(project);
  const slug = projectSlug(project);
  const onError = () => setFailed(true);

  if (!cover || failed) {
    return (
      <span className={styles.placeholder} aria-hidden="true">
        {name}
      </span>
    );
  }

  if (cover === 'square') {
    const src = coverUrl(slug);
    return (
      <>
        <img className={styles.backdrop} src={src} alt="" aria-hidden="true" width={480} height={480} loading="lazy" decoding="async" />
        <img className={styles.icon} src={src} alt="" width={480} height={480} loading="lazy" decoding="async" onError={onError} />
      </>
    );
  }

  return (
    <img
      className={styles.wide}
      src={coverUrl(`${slug}-400`)}
      srcSet={coverSrcSet(slug)}
      sizes={sizes}
      alt=""
      width={800}
      height={450}
      loading="lazy"
      decoding="async"
      onError={onError}
    />
  );
}
