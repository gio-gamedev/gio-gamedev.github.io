import { Fragment } from 'react';
import { abbreviations } from '../content/abbreviations';
import { useLang } from '../i18n/LanguageContext';

const pattern = new RegExp(`\\b(${Object.keys(abbreviations).join('|')})\\b`, 'g');

/** Wraps known industry abbreviations (FTUE, UEFN…) in <abbr title="…">. */
export function Abbr({ text }: { text: string }) {
  const { t } = useLang();
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <abbr key={i} title={t(abbreviations[part])}>
            {part}
          </abbr>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
