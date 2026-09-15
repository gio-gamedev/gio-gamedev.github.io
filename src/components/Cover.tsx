import { useState } from 'react';
import { coverOf, coverSrcSet, coverUrl, projectSlug, type Project } from '../content/projects';
import { Icon } from './Icon';
import styles from './Cover.module.css';

type Props = { project: Project; sizes: string };

/**
 * Cover art for cards and catalog tiles, framed per image: art close to 16:9 fills the frame; icons,
 * 4:3, portrait and very wide art are shown whole over a blurred copy of the same file, so nothing
 * is stretched or has its title cut. Without a confirmed image (or if the file fails) a neutral
 * placeholder shows no text: the title is the heading right below. Images are decorative (alt="").
 */
export function Cover({ project, sizes }: Props) {
  const [failed, setFailed] = useState(false);
  const art = coverOf(project);
  const slug = projectSlug(project);

  if (!art || failed) {
    return (
      <span className={styles.placeholder} aria-hidden="true">
        <Icon name="image" size={26} />
      </span>
    );
  }

  const image = (
    <img
      className={art.fit === 'cover' ? styles.cover : styles.contain}
      src={coverUrl(slug, art.widths[0])}
      srcSet={coverSrcSet(slug, art)}
      sizes={sizes}
      alt=""
      width={art.width}
      height={art.height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  if (art.fit === 'cover') return image;
  return (
    <>
      <img className={styles.backdrop} src={coverUrl(slug, art.widths[0])} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      {image}
    </>
  );
}
