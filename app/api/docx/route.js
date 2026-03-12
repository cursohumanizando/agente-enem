export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { questoes, wikiImgs = {} } = await request.json();
    const docx = await buildDOCX(questoes, wikiImgs);
    
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

async function buildDOCX(questoes, wikiImgs = {}) {
  let body = '';
  const imageRels = []; // imagens Wikimedia a embedar

  // Título
  body += para('HUMANIZANDO · AGENTE ELABORADOR ENEM', { bold: true, size: 26, color: '6c63ff', spacing: 80 });
  body += para('Simulado · Ciências Humanas e suas Tecnologias', { size: 20, color: '8080b0', spacing: 320 });

  questoes.forEach((q, i) => {
    const hab = (q.habilidade || '').match(/H\d+/)?.[0] || '';
    body += para(`QUESTÃO ${i + 1}  ·  ${(q.nivel || '').toUpperCase()}  ·  ${hab}`, { bold: true, size: 20, color: '6c63ff', spacing: 80 });
    if (q.tema) body += para(q.tema, { size: 17, color: '9090b0', italic: true, spacing: 120 });
    body += para(q.textoBase || '', { size: 19, color: '2a2a4a', italic: true, indent: 480, spacing: 80 });
    body += para(q.fonte || '', { size: 16, color: 'a0a0c0', indent: 480, spacing: 120 });
    if (q.recursoVisual && q.recursoVisual.descricao) {
      const icone = q.recursoVisual.tipo === 'mapa' ? '🗺' : q.recursoVisual.tipo === 'gráfico' ? '📊' : q.recursoVisual.tipo === 'tabela' ? '📋' : q.recursoVisual.tipo === 'charge' ? '🎨' : q.recursoVisual.tipo === 'fotografia' ? '📷' : '📌';
      body += para(icone + ' ' + (q.recursoVisual.tipo || '').toUpperCase(), { bold: true, size: 17, color: '8a6800', spacing: 60 });
      const wimg = wikiImgs[q.numero];
      if (wimg) {
        // Imagem encontrada no Wikimedia — embeda como base64
        const imgPart = wimg.dataUrl.split(',')[1];
        const mimeType = wimg.mimeType || 'image/jpeg';
        const ext = mimeType === 'image/png' ? 'png' : 'jpeg';
        const relId = 'rIdImg' + (i + 1);
        imageRels.push({ relId, ext, data: imgPart, mimeType });
        // Calcula dimensões em EMU (máx 5400000 = ~15cm)
        const ratio = (wimg.height || 400) / (wimg.width || 600);
        const wEmu = 4800000;
        const hEmu = Math.round(wEmu * ratio);
        body += `<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="120"/></w:pPr><w:r><w:drawing><wp:inline><wp:extent cx="${wEmu}" cy="${hEmu}"/><wp:docPr id="${i+1}" name="img${i+1}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${i+1}" name="img${i+1}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${wEmu}" cy="${hEmu}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
        body += para('Fonte: Wikimedia Commons — ' + q.recursoVisual.descricao, { size: 14, color: '8a8060', indent: 280, spacing: 100 });
      } else {
        body += para(q.recursoVisual.descricao, { size: 17, color: '4a3800', indent: 280, spacing: 60 });
      }
      if (q.recursoVisual.fonteRecurso) body += para('📎 Fonte sugerida: ' + q.recursoVisual.fonteRecurso, { size: 15, color: '8a8060', indent: 280, spacing: 160 });
    }
    body += para(q.comando || '', { bold: true, size: 20, color: '1a1a2e', spacing: 160 });
    (q.opcoes || []).forEach(op => {
      body += para(`${op.letra})  ${op.texto}`, { size: 19, color: '1a1a2e', indent: 280, spacing: 100 });
    });
    // Gabarito Comentado
    body += para('─── GABARITO COMENTADO ───', { bold: true, size: 17, color: '6c63ff', spacing: 80 });
    body += para('Gabarito: ' + q.gabarito, { bold: true, size: 18, color: '228855', spacing: 80 });

    // Alternativa correta
    const correta = (q.opcoes || []).find(op => op.correta);
    if (correta) {
      body += para('✓ Alternativa Correta — ' + correta.letra, { bold: true, size: 17, color: '228855', indent: 280, spacing: 60 });
      body += para(correta.explicacao || 'Esta alternativa responde diretamente ao comando.', { size: 17, color: '2a4a2a', italic: true, indent: 560, spacing: 100 });
    }

    // Distratores
    body += para('✗ Distratores:', { bold: true, size: 17, color: 'cc3355', indent: 280, spacing: 60 });
    (q.opcoes || []).filter(op => !op.correta).forEach(op => {
      body += para(op.letra + ')  ' + (op.explicacao || 'Alternativa incorreta.'), { size: 16, color: '664444', indent: 560, spacing: 80 });
    });

    if (q.habilidade) body += para('🎯 ' + q.habilidade, { size: 15, color: '5550aa', indent: 280, spacing: 60 });
    body += para('', { spacing: 280 });
  });

  // Gabarito resumido
  body += para('GABARITO GERAL', { bold: true, size: 22, color: '6c63ff', spacing: 120 });
  questoes.forEach((q, i) => {
    const hab = (q.habilidade || '').match(/H\d+/)?.[0] || '';
    body += para(`${i + 1}.   ${q.gabarito}     ${hab}`, { size: 20, color: '1a1a2e', spacing: 100 });
  });

  const wordXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
  xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
  xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
<w:body>
${body}
<w:sectPr>
  <w:pgSz w:w="12240" w:h="15840"/>
  <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
</w:sectPr>
</w:body>
</w:document>`;

  // Montar o ZIP do DOCX manualmente (DOCX é um ZIP com XMLs)
  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="png" ContentType="image/png"/>
</Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    'word/document.xml': wordXML,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${imageRels.map(r => `  <Relationship Id="${r.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${r.relId}.${r.ext}"/>`).join('\n')}
</Relationships>`,
  };

  // Adicionar arquivos de imagem ao ZIP
  for (const img of imageRels) {
    const filename = `word/media/${img.relId}.${img.ext}`;
    // Converte base64 para Uint8Array
    const binStr = atob(img.data);
    const bytes = new Uint8Array(binStr.length);
    for (let k = 0; k < binStr.length; k++) bytes[k] = binStr.charCodeAt(k);
    files[filename] = bytes;
  }

  return createZip(files);
}

// Mini implementação de ZIP sem dependências externas
function createZip(files) {
  const encoder = new TextEncoder();
  const parts = [];
  const centralDir = [];
  let offset = 0;

  for (const [name, content] of Object.entries(files)) {
    const nameBytes = encoder.encode(name);
    const contentBytes = content instanceof Uint8Array ? content : encoder.encode(content);
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
