import { assessment, type Table } from '../content/evidence';
import { approach } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './Evidence.module.css';

/** The real 2022 QA assessment (historical material) and the QA workflow. */
export function Evidence({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="evidence" index={index} title={t(ui.sections.evidence)} subtitle={t(ui.sections.evidenceSubtitle)}>
      <article id={assessment.id} className={styles.panel} aria-labelledby={`${assessment.id}-title`}>
        <div className={styles.top}>
          <div>
            <h3 id={`${assessment.id}-title`} className={styles.title}>
              {t(assessment.title)}
            </h3>
            <p className={styles.summary}>{t(assessment.summary)}</p>
            <dl className={styles.fields}>
              {assessment.fields.map((field) => (
                <div key={field.label.en}>
                  <dt>{t(field.label)}</dt>
                  <dd>{t(field.value)}</dd>
                </div>
              ))}
            </dl>
            <ul className={styles.stats}>
              {assessment.stats.map((stat) => (
                <li key={stat.label.en}>
                  <strong className={styles.statValue} data-fail={stat.fail || undefined}>
                    {stat.value}
                  </strong>
                  <span className={styles.statLabel}>{t(stat.label)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.download}>
            <p className={styles.badge}>
              <Icon name="clipboard" size={16} />
              {t(assessment.badge)}
            </p>
            <p className={styles.note}>{t(assessment.pdfNote)}</p>
            <a className="btn btn-primary" href={assessment.pdf} target="_blank" rel="noreferrer" type="application/pdf" hrefLang="pt-BR">
              <Icon name="download" />
              {t(ui.evidence.open)}
              <span className="sr-only"> {t(ui.a11y.newTab)}</span>
            </a>
          </div>
        </div>

        <details className={`disclosure ${styles.details}`}>
          <summary>{t(ui.evidence.details)}</summary>
          <div className={styles.detailsBody}>
            <h4 className={styles.tableTitle}>{t(ui.evidence.casesTitle)}</h4>
            <DataTable table={assessment.cases} label={t(ui.evidence.casesTitle)} />
            <h4 className={styles.tableTitle}>{t(ui.evidence.findingsTitle)}</h4>
            <DataTable table={assessment.findings} label={t(ui.evidence.findingsTitle)} />
            <p className={styles.p}>{t(assessment.findingsNote)}</p>
          </div>
        </details>
      </article>

      <div className={styles.approach}>
        <h3 className={styles.approachTitle}>{t(ui.evidence.approach)}</h3>
        <ol className={styles.steps}>
          {approach.steps.map((step, i) => (
            <li key={step.title.en} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className={styles.stepTitle}>{t(step.title)}</h4>
              <p className={styles.stepText}>{t(step.text)}</p>
            </li>
          ))}
        </ol>
        <p className={styles.technical}>{t(approach.technical)}</p>
      </div>
    </Section>
  );
}

const failed = new Set(['Fail', 'NOK', 'Bug', 'Falha']);

function DataTable({ table, label }: { table: Table; label: string }) {
  const { t } = useLang();

  return (
    // Wide tables scroll sideways on phones; the region takes focus so keyboard users can scroll it.
    <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={label}>
      <table className={styles.table}>
        <thead>
          <tr>
            {t(table.head).map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t(table.rows).map((row) => (
            <tr key={row[0]}>
              {row.map((cell, ci) => (
                <td key={ci} data-fail={failed.has(cell) || undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
