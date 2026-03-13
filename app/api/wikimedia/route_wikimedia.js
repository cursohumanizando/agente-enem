export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { descricao, tipo } = await request.json();

    // Passo 1: Claude gera um termo de busca preciso em inglês
    const searchTerm = await gerarTermoBusca(descricao, tipo);
    if (!searchTerm) return Response.json({ found: false });

    // Passo 2: Busca no Wikimedia com queries em cascata
    const queries = buildQueries(searchTerm, tipo);
    for (const query of queries) {
      const result = await buscarImagem(query);
      if (result) return Response.json(result);
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('Wikimedia error:', error.message);
    return Response.json({ found: false });
  }
}

// Claude Haiku gera um termo de busca preciso em inglês
async function gerarTermoBusca(descricao, tipo) {
  try {
    const tipoEN = {
      'mapa': 'map',
      'gráfico': 'chart OR graph',
      'tabela': 'table',
      'charge': 'political cartoon',
      'fotografia': 'photograph',
      'infográfico': 'infographic',
    }[tipo] || '';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 60,
        messages: [{
          role: 'user',
          content: `Convert this image description to a precise Wikimedia Commons search query in English (max 5 words, no quotes, no operators). Return ONLY the search terms, nothing else.

Description: "${descricao}"
Visual type: ${tipoEN}

Search query:`
        }]
      })
    });

    const data = await res.json();
    const term = data.content?.[0]?.text?.trim().replace(/['"]/g, '').slice(0, 80);
    return term || null;
  } catch {
    return null;
  }
}

async function buscarImagem(query) {
  try {
    const searchUrl = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrnamespace: 6,
      gsrsearch: query,
      gsrlimit: 10,
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: 1000,
      format: 'json',
      origin: '*',
    });

    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' },
      signal: AbortSignal.timeout(8000),
    });

    if (!searchRes.ok) return null;

    const searchData = await searchRes.json();
    const pages = searchData?.query?.pages;
    if (!pages) return null;

    const candidates = Object.values(pages)
      .map(p => p.imageinfo?.[0])
      .filter(info =>
        info?.thumburl &&
        (info.mime === 'image/jpeg' || info.mime === 'image/png') &&
        info.width > 400 && info.height > 300
      )
      .sort((a, b) => (b.width * b.height) - (a.width * a.height));

    if (candidates.length === 0) return null;

    const imgInfo = candidates[0];
    const imgRes = await fetch(imgInfo.thumburl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' },
      signal: AbortSignal.timeout(10000),
    });

    if (!imgRes.ok) return null;

    const arrayBuffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${imgInfo.mime};base64,${base64}`;

    return {
      found: true,
      dataUrl,
      mimeType: imgInfo.mime,
      width: imgInfo.thumbwidth || imgInfo.width,
      height: imgInfo.thumbheight || imgInfo.height,
      sourceUrl: imgInfo.url,
    };

  } catch {
    return null;
  }
}

function buildQueries(searchTerm, tipo) {
  const tipoEN = {
    'mapa': 'map',
    'gráfico': 'chart',
    'tabela': 'table',
    'charge': 'cartoon',
    'fotografia': 'photo',
    'infográfico': 'infographic',
  }[tipo] || '';

  const palavras = searchTerm.split(/\s+/).filter(p => p.length > 2);
  const queries = new Set();

  queries.add(searchTerm);
  if (palavras.length > 2) queries.add(palavras.slice(0, 3).join(' ') + ' ' + tipoEN);
  if (palavras.length > 1) queries.add(palavras.slice(0, 2).join(' ') + ' ' + tipoEN);
  if (palavras[0]) queries.add(palavras[0] + ' ' + tipoEN);

  return [...queries].map(q => q.trim()).filter(q => q.length > 2);
}
