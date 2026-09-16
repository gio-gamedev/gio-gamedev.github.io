// Word version of the resume, built from the same data as the PDF (cvData in src/cv/cvData.ts).
// Called by scripts/prerender.mjs, so every build ships dist/cv/*.docx next to the PDFs.
// Built-in Title/Heading styles and plain bullets keep it easy for screening tools to parse.
import { Document, ExternalHyperlink, HeadingLevel, Packer, Paragraph, TextRun } from 'docx';

const font = 'Arial';
const black = '000000';

/** "**Release validation:** …" → a bold run followed by the rest, as on the PDF. */
function runs(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .filter((part) => part !== '')
    .map((part, i) => new TextRun({ text: part, bold: i % 2 === 1 }));
}

export async function buildDocx(data, title) {
  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(data.name)] }),
    new Paragraph({ children: [new TextRun({ text: data.title, bold: true, size: 24 })] }),
    new Paragraph({
      spacing: { after: 160 },
      children: data.contact.flatMap((item, i) => [
        ...(i > 0 ? [new TextRun({ text: ' | ', size: 18 })] : []),
        item.href
          ? new ExternalHyperlink({ link: item.href, children: [new TextRun({ text: item.text, size: 18, style: 'Hyperlink' })] })
          : new TextRun({ text: item.text, size: 18 }),
      ]),
    }),
  ];

  for (const section of data.sections) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(section.heading.toUpperCase())] }));
    for (const block of section.blocks) {
      if (block.kind === 'p') {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [...(block.label ? [new TextRun({ text: `${block.label}: `, bold: true })] : []), new TextRun(block.text)],
          }),
        );
      } else if (block.kind === 'list') {
        for (const item of block.items) children.push(new Paragraph({ children: runs(item), bullet: { level: 0 } }));
      } else {
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(block.title)] }));
        children.push(new Paragraph({ children: [new TextRun({ text: block.dates, italics: true })] }));
        for (const bullet of block.bullets) children.push(new Paragraph({ children: runs(bullet), bullet: { level: 0 } }));
        for (const note of block.notes) children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun(note)] }));
      }
    }
  }

  const doc = new Document({
    creator: data.name,
    title,
    styles: {
      default: {
        document: { run: { font, size: 20 } },
        title: { run: { font, size: 36, bold: true, color: black }, paragraph: { spacing: { after: 40 } } },
        heading1: { run: { font, size: 22, bold: true, color: black }, paragraph: { spacing: { before: 220, after: 80 } } },
        heading2: { run: { font, size: 21, bold: true, color: black }, paragraph: { spacing: { before: 140 } } },
      },
    },
    sections: [{ properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } }, children }],
  });
  return Packer.toBuffer(doc);
}
