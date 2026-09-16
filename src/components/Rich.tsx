import { Fragment } from 'react';
import { Abbr } from './Abbr';

/**
 * Text with **bold** markers, used by the experience bullets: each one opens with what it is about,
 * so the list can be scanned. Abbreviations keep their <abbr title>; the resumes strip the markers.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i}>
            <Abbr text={part} />
          </strong>
        ) : (
          <Fragment key={i}>
            <Abbr text={part} />
          </Fragment>
        ),
      )}
    </>
  );
}
