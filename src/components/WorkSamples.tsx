import { useEffect } from 'react';
import { sampleDisclaimer, workSamples, type Block } from '../content/workSamples';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './WorkSamples.module.css';

export function WorkSamples({ index }: { index: string }) {
  const { t } = useLang();

  // Links such as #sample-bug-report (from the hero) open the matching sample.
  useEffect(() => {
    const openFromHash = () => {
      const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
      if (target instanceof HTMLDetailsElement) target.open = true;
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <Section id="samples" index={index} title={t(ui.sections.samples)} subtitle={t(ui.sections.samplesSubtitle)}>
      <div className={styles.list}>
        {workSamples.map((sample) => (
          <details key={sample.id} id={`sample-${sample.id}`} className={styles.sample}>
            <summary className={styles.summary}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={sample.icon} size={22} />
              </span>
              <span className={styles.heading}>
                <span className={styles.title}>{t(sample.title)}</span>
                <span className={styles.subtitle}>{t(sample.subtitle)}</span>
              </span>
              <span className={styles.chevron}>
                <Icon name="chevron" size={20} />
              </span>
            </summary>

            <div className={styles.body}>
              <p className={styles.disclaimer}>
                <Icon name="info" size={16} />
                {t(sampleDisclaimer)}
              </p>
              {sample.sections.map((section) => (
                <section key={section.heading.en} className={styles.section}>
                  <h3 className={styles.sectionHeading}>{t(section.heading)}</h3>
                  {section.blocks.map((block, bi) => (
                    <SampleBlock key={bi} block={block} />
                  ))}
                </section>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

function SampleBlock({ block }: { block: Block }) {
  const { t } = useLang();

  switch (block.kind) {
    case 'p':
      return <p className={styles.p}>{t(block.text)}</p>;

    case 'fields':
      return (
        <dl className={styles.fields}>
          {block.rows.map((row) => (
            <div key={row.label.en}>
              <dt>{t(row.label)}</dt>
              <dd>{t(row.value)}</dd>
            </div>
          ))}
        </dl>
      );

    case 'list': {
      const items = t(block.items).map((item) => <li key={item}>{item}</li>);
      return block.ordered ? <ol className={styles.ol}>{items}</ol> : <ul className={styles.ul}>{items}</ul>;
    }

    case 'checklist':
      return (
        <ul className={styles.checklist}>
          {t(block.items).map((item) => (
            <li key={item}>
              <span className={styles.box} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {t(block.head).map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t(block.rows).map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
