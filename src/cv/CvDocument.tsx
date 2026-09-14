import { Fragment } from 'react';
import { profile } from '../content/profile';
import type { L, Lang } from '../content/types';
import { cvData, type CvBlock } from './cvData';

// ATS-friendly resume page: rendered to dist/cv/ and dist/pt/cv/ by scripts/prerender.mjs and
// printed to PDF by scripts/cv-pdf.mjs. The Word version comes from the same cvData().

export const cvTitle: L = {
  en: `${profile.name} — Game QA Analyst — Resume`,
  pt: `${profile.name} — Analista de QA de Games — Currículo`,
};

export function CvDocument({ lang }: { lang: Lang }) {
  const data = cvData(lang);

  return (
    <main className="cv">
      <header>
        <h1>{data.name}</h1>
        <p className="title">{data.title}</p>
        {/* Items never break inside (a URL split at its hyphen extracts as the wrong address);
            the line wraps only at the separators. */}
        <p className="contact">
          {data.contact.map((item, i) => (
            <Fragment key={item.text}>
              {i > 0 && ' | '}
              <span>{item.href ? <a href={item.href}>{item.text}</a> : item.text}</span>
            </Fragment>
          ))}
        </p>
      </header>

      {data.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </main>
  );
}

function Block({ block }: { block: CvBlock }) {
  switch (block.kind) {
    case 'p':
      return block.label ? (
        <p>
          <strong>{block.label}:</strong> {block.text}
        </p>
      ) : (
        <p>{block.text}</p>
      );

    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case 'job':
      return (
        <article>
          <h3>{block.title}</h3>
          <p className="dates">{block.dates}</p>
          <ul>
            {block.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          {block.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </article>
      );
  }
}
