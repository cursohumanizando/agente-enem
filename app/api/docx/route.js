export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { questoes } = await request.json();
    const docx = buildDOCX(questoes);
    
    return new Response(docx, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="simulado-enem.docx"',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function para(text, opts = {}) {
  const { bold = false, size = 22, color = '1a1a2e', indent = 0, italic = false, spacing = 160 } = opts;
  const rpr = `<w:rPr>${bold ? '<w:b/>' : ''}${italic ? '<w:i/>' : ''}<w:color w:val="${color}"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr>`;
  const ppr = `<w:pPr><w:spacing w:after="${spacing}"/>${indent ? `<w:ind w:left="${indent}"/>` : ''}</w:pPr>`;
  const lines = esc(text).split('&#xA;').join('\n').split('\n');
  const runs = lines.map((l, i) =>
    `<w:r>${rpr}<w:t xml:space="preserve">${l}</w:t></w:r>${i < lines.length - 1 ? '<w:br/>' : ''}`
  ).join('');
  return `<w:p>${ppr}${runs}</w:p>`;
}

function buildDOCX(questoes) {
  let body = '';

  // TÃ­tulo
  body += para('HUMANIZANDO Â· AGENTE ELABORADOR ENEM', { bold: true, size: 26, color: '6c63ff', spacing: 80 });
  body += para('Simulado Â· CiÃªncias Humanas e suas Tecnologias', { size: 20, color: '8080b0', spacing: 320 });

  questoes.forEach((q, i) => {
    const hab = (q.habilidade || '').match(/H\d+/)?.[0] || '';
    body += para(`QUESTÃƒO ${i + 1}  Â·  ${(q.nivel || '').toUpperCase()}  Â·  ${hab}`, { bold: true, size: 20, color: '6c63ff', spacing: 80 });
    if (q.tema) body += para(q.tema, { size: 17, color: '9090b0', italic: true, spacing: 120 });
    body += para(q.textoBase || '', { size: 19, color: '2a2a4a', italic: true, indent: 480, spacing: 80 });
    body += para(q.fonte || '', { size: 16, color: 'a0a0c0', indent: 480, spacing: 120 });
    if (q.recursoVisual && q.recursoVisual.descricao) {
      const icone = q.recursoVisual.tipo === 'mapa' ? 'ðŸ—º' : q.recursoVisual.tipo === 'grÃ¡fico' ? 'ðŸ“Š' : q.recursoVisual.tipo === 'tabela' ? 'ðŸ“‹' : q.recursoVisual.tipo === 'charge' ? 'ðŸŽ¨' : q.recursoVisual.tipo === 'fotografia' ? 'ðŸ“·' : 'ðŸ“Œ';
      body += para(icone + ' ' + (q.recursoVisual.tipo || '').toUpperCase() + ' SUGERIDO', { bold: true, size: 17, color: '8a6800', spacing: 60 });
      body += para(q.recursoVisual.descricao, { size: 17, color: '4a3800', indent: 280, spacing: 60 });
      if (q.recursoVisual.fonteRecurso) body += para('ðŸ“Ž Fonte: ' + q.recursoVisual.fonteRecurso, { size: 15, color: '8a8060', indent: 280, spacing: 160 });
    }
    body += para(q.comando || '', { bold: true, size: 20, color: '1a1a2e', spacing: 160 });
    (q.opcoes || []).forEach(op => {
      body += para(`${op.letra})  ${op.texto}`, { size: 19, color: '1a1a2e', indent: 280, spacing: 100 });
    });
    body += para('', { spacing: 200 });
  });

  // Gabarito
  body += para('GABARITO', { bold: true, size: 22, color: '6c63ff', spacing: 120 });
  questoes.forEach((q, i) => {
    const hab = (q.habilidade || '').match(/H\d+/)?.[0] || '';
    body += para(`${i + 1}.   ${q.gabarito}     ${hab}`, { size: 20, color: '1a1a2e', spacing: 100 });
  });

  const wordXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<w:body>
${body}
<w:sectPr>
  <w:pgSz w:w="12240" w:h="15840"/>
  <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
</w:sectPr>
</w:body>
</w:document>`;

  // Montar o ZIP do DOCX manualmente (DOCX Ã© um ZIP com XMLs)
  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    'word/document.xml': wordXML,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`,
  };

  return createZip(files);
}

// Mini implementaÃ§Ã£o de ZIP sem dependÃªncias externas
function createZip(files) {
  const encoder = new TextEncoder();
  const parts = [];
  const centralDir = [];
  let offset = 0;

  for (const [name, content] of Object.entries(files)) {
    const nameBytes = encoder.encode(name);
    const contentBytes = encoder.encode(content);
    const crc = crc32(contentBytes);
    const size = contentBytes.length;

    const local = new Uint8Array(30 + nameBytes.length + size);
    const view = new DataView(local.buffer);
    // Local file header signature
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);   // version needed
    view.setUint16(6, 0, true);    // flags
    view.setUint16(8, 0, true);    // compression: stored
    view.setUint16(10, 0, true);   // mod time
    view.setUint16(12, 0, true);   // mod date
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    local.set(contentBytes, 30 + nameBytes.length);

    parts.push(local);

    const cd = new Uint8Array(46 + nameBytes.length);
    const cdv = new DataView(cd.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, size, true);
    cdv.setUint32(24, size, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);
    cd.set(nameBytes, 46);
    centralDir.push(cd);

    offset += local.length;
  }

  const cdSize = centralDir.reduce((a, b) => a + b.length, 0);
  const eocd = new Uint8Array(22);
  const eocdv = new DataView(eocd.buffer);
  eocdv.setUint32(0, 0x06054b50, true);
  eocdv.setUint16(4, 0, true);
  eocdv.setUint16(6, 0, true);
  eocdv.setUint16(8, centralDir.length, true);
  eocdv.setUint16(10, centralDir.length, true);
  eocdv.setUint32(12, cdSize, true);
  eocdv.setUint32(16, offset, true);
  eocdv.setUint16(20, 0, true);

  const total = [...parts, ...centralDir, eocd];
  const totalSize = total.reduce((a, b) => a + b.length, 0);
  const result = new Uint8Array(totalSize);
  let pos = 0;
  for (const part of total) { result.set(part, pos); pos += part.length; }
  return result;
}

function crc32(data) {
  const table = makeCRCTable();
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeCRCTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  return table;
}
