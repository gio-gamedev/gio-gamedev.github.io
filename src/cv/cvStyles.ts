/** Print stylesheet for the resume pages: neutral colors and system fonts that every PDF parser reads. */
export const cvStyles = `
@page { size: A4; margin: 10mm 13mm 12mm; }
* { box-sizing: border-box; }
body { margin: 0; background: #fff; color: #111; font-family: Arial, Helvetica, sans-serif; font-size: 9.4pt; line-height: 1.34; }
.cv { max-width: 184mm; margin: 0 auto; }
h1 { margin: 0; font-size: 19pt; }
h2 { margin: 9pt 0 3pt; padding-bottom: 2pt; border-bottom: 1px solid #999; font-size: 10.5pt; letter-spacing: 0.04em; text-transform: uppercase; }
h3 { margin: 7pt 0 0; font-size: 9.8pt; }
h2, h3, .dates { break-after: avoid; }
.keep { break-inside: avoid; }
.keep ul { margin-bottom: 0; }
ul.rest { margin-top: 1pt; }
p { margin: 2.5pt 0; }
/* The "•" is real text (see CvDocument), so the list needs no marker of its own. */
ul { margin: 2pt 0 0; padding-left: 0; list-style: none; }
li { margin: 1.5pt 0; padding-left: 9pt; text-indent: -9pt; break-inside: avoid; }
.bullet { color: #444; }
a { color: #111; text-decoration: none; }
.title { margin-top: 2pt; font-size: 12pt; font-weight: bold; }
.contact { margin-top: 4pt; font-size: 9pt; }
.contact span { white-space: nowrap; }
.dates { margin: 0; color: #444; font-size: 9pt; }
section.break { break-before: page; }
@media screen { .cv { padding: 24px; } }
`;
