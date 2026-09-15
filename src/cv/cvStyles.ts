/** Print stylesheet for the resume pages: neutral colors and system fonts that every PDF parser reads. */
export const cvStyles = `
@page { size: A4; margin: 10mm 13mm; }
* { box-sizing: border-box; }
body { margin: 0; background: #fff; color: #111; font-family: Arial, Helvetica, sans-serif; font-size: 9.2pt; line-height: 1.3; }
.cv { max-width: 184mm; margin: 0 auto; }
h1 { margin: 0; font-size: 19pt; }
h2 { margin: 8pt 0 3pt; padding-bottom: 2pt; border-bottom: 1px solid #999; font-size: 10.5pt; letter-spacing: 0.04em; text-transform: uppercase; }
h3 { margin: 6pt 0 0; font-size: 9.8pt; }
h2, h3, .dates { break-after: avoid; }
.keep { break-inside: avoid; }
.keep ul { margin-bottom: 0; }
ul.rest { margin-top: 1pt; }
p { margin: 2.5pt 0; }
ul { margin: 2pt 0 0; padding-left: 13pt; }
li { margin: 1pt 0; break-inside: avoid; }
a { color: #111; text-decoration: none; }
.title { margin-top: 2pt; font-size: 12pt; font-weight: bold; }
.contact { margin-top: 4pt; font-size: 9pt; }
.contact span { white-space: nowrap; }
.dates { margin: 0; color: #444; font-size: 9pt; }
@media screen { .cv { padding: 24px; } }
`;
