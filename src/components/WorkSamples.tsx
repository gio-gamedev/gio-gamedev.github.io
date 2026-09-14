import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { SHOW_DRAFTS } from '../content/review';
import { ui } from '../content/ui';
import { sampleDisclaimer, workSamples, type Block } from '../content/workSamples';
import { draftSamples } from '../content/workSamples.drafts';
import { useLang } from '../i18n/LanguageContext';
import { DraftBadge } from './DraftBadge';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './WorkSamples.module.css';

// Drafts (fictional examples still to be redone) only show in review mode. SHOW_DRAFTS is a
// build-time constant, so the published bundle drops the drafts module altogether.
const samples = SHOW_DRAFTS ? [...workSamples, ...draftSamples] : workSamples;

export function WorkSamples({ index }: { index: string }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Links such as #sample-test-plan select the matching tab.
  useEffect(() => {
    const fromHash = () => {
      const i = samples.findIndex((sample) => location.hash === `#sample-${sample.id}`);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = samples.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = moves[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section id="samples" index={index} title={t(ui.sections.samples)} subtitle={t(ui.sections.samplesSubtitle)}>
      <div className={styles.tabs} role="tablist" aria-label={t(ui.samples.tabs)}>
        {samples.map((sample, i) => (
          <button
            key={sample.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${sample.id}`}
            aria-selected={i === active}
            aria-controls={`sample-${sample.id}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            <Icon name={sample.icon} size={18} />
            {t(sample.tab)}
            {sample.draft && <DraftBadge variant="chip" />}
          </button>
        ))}
      </div>

      {/* Inactive panels stay in the HTML (hidden), so screening tools and print still get every sample. */}
      {samples.map((sample, i) => (
        <article
          key={sample.id}
          id={`sample-${sample.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${sample.id}`}
          hidden={i !== active}
          tabIndex={0}
          className={styles.panel}
          data-draft={sample.draft || undefined}
        >
          {sample.draft && <DraftBadge />}
          <header className={styles.panelHead}>
            <span className={styles.icon} aria-hidden="true">
              <Icon name={sample.icon} size={22} />
            </span>
            <div>
              <h3 className={styles.title}>{t(sample.title)}</h3>
              <p className={styles.subtitle}>{t(sample.subtitle)}</p>
            </div>
          </header>

          <p className={styles.disclaimer}>
            <Icon name="info" size={16} />
            {t(sample.disclaimer ?? sampleDisclaimer)}
          </p>

          {sample.sections.map((section) => (
            <section key={section.heading.en} className={styles.section}>
              <h4 className={styles.sectionHeading}>{t(section.heading)}</h4>
              {section.blocks.map((block, bi) => (
                <SampleBlock key={bi} block={block} label={t(section.heading)} />
              ))}
            </section>
          ))}
        </article>
      ))}
    </Section>
  );
}

function SampleBlock({ block, label }: { block: Block; label: string }) {
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
        // Wide tables scroll sideways on phones; the region takes focus so keyboard users can scroll it.
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={label}>
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
