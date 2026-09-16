import { Fragment } from 'react';
import { profile } from '../content/profile';
import type { L, Lang } from '../content/types';
import { cvData, type CvBlock } from './cvData';

// ATS-friendly resume page: rendered to dist/cv/ and dist/pt/cv/ by scripts/prerender.mjs and
// printed to PDF by scripts/cv-pdf.mjs. The Word version comes from the same cvData().

export const cvTitle: L = {
  en: `${profile.name} — Game QA Analyst — Resume`,
  pt: `${profile.name} — Analista de QA de Jogos — Currículo`,
};

/** "**Release validation:** …" → bold lead, so the line can be scanned. */
function Lead({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/**
 * A real "•" in the text, not a CSS marker: PDF text extraction only sees painted characters, so
 * this is what keeps the items apart when a parser reads the file as plain text.
 */
function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>
          <span className="bullet">•</span> <Lead text={item} />
        </li>
      ))}
    </ul>
  );
}

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
        <section key={section.heading} className={section.break ? 'break' : undefined}>
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
      return <Bullets items={block.items} />;

    case 'job': {
      const [first, ...rest] = block.bullets;
      return (
        <article>
          {/* The role heading, its dates and the first bullet never split across a page break. */}
          <div className="keep">
            <h3>{block.title}</h3>
            <p className="dates">{block.dates}</p>
            {first && <Bullets items={[first]} />}
          </div>
          {rest.length > 0 && <Bullets items={rest} className="rest" />}
          {block.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </article>
      );
    }
  }
}
