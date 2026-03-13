export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { descricao, tipo } = await request.json();

    // Tenta queries progressivamente mais simples até encontrar imagem
    const queries = buildQueries(descricao, tipo);

    for (const query of queries) {
      const result = await buscarImagem(query, tipo);
      if (result) return Response.json(result);
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('Wikimedia error:', error.message);
    return Response.json({ found: false });
  }
}

async function buscarImagem(query, tipo) {
  try {
    const searchUrl = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrnamespace: 6,
      gsrsearch: query,
      gsrlimit: 10,
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: 800,
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
        info.width > 300 && info.height > 300
      );

    if (candidates.length === 0) return null;

    // Pega a maior imagem disponível
    const imgInfo = candidates.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

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

// Gera queries em inglês, do mais específico ao mais genérico
function buildQueries(descricao, tipo) {
  const tipoEN = {
    'mapa': 'map',
    'gráfico': 'chart graph',
    'tabela': 'table data',
    'charge': 'political cartoon',
    'fotografia': 'photograph',
    'infográfico': 'infographic',
  }[tipo] || '';

  // Traduz termos geográficos/históricos comuns PT → EN
  const traducoes = {
    'brasil': 'brazil', 'brasileira': 'brazilian', 'brasileiro': 'brazilian',
    'amazônia': 'amazon', 'desmatamento': 'deforestation', 'floresta': 'forest',
    'urbano': 'urban', 'urbanização': 'urbanization', 'cidade': 'city', 'cidades': 'cities',
    'migração': 'migration', 'migrante': 'migrant', 'refugiado': 'refugee',
    'população': 'population', 'demografico': 'demographic', 'densidade': 'density',
    'pobreza': 'poverty', 'desigualdade': 'inequality', 'favela': 'favela slum',
    'industrialização': 'industrialization', 'indústria': 'industry',
    'globalização': 'globalization', 'comércio': 'trade', 'exportação': 'export',
    'clima': 'climate', 'temperatura': 'temperature', 'seca': 'drought',
    'energia': 'energy', 'petróleo': 'oil petroleum', 'renovável': 'renewable',
    'guerra': 'war', 'conflito': 'conflict', 'revolução': 'revolution',
    'escravidão': 'slavery', 'escravo': 'slave', 'abolição': 'abolition',
    'colonização': 'colonization', 'colonial': 'colonial', 'imperialismo': 'imperialism',
    'movimentos sociais': 'social movements', 'protesto': 'protest',
    'democracia': 'democracy', 'ditadura': 'dictatorship', 'governo': 'government',
    'direitos humanos': 'human rights', 'cidadania': 'citizenship',
    'bioma': 'biome', 'cerrado': 'cerrado savanna', 'caatinga': 'caatinga',
    'agronegócio': 'agribusiness', 'agricultura': 'agriculture',
    'pib': 'gdp', 'economia': 'economy', 'inflação': 'inflation',
    'africa': 'africa', 'europa': 'europe', 'ásia': 'asia', 'china': 'china',
    'estados unidos': 'united states', 'eua': 'usa',
    'séc': 'century', 'século': 'century',
    'mapa': 'map', 'gráfico': 'chart', 'tabela': 'table',
  };

  // Aplica traduções
  let textoEN = descricao.toLowerCase();
  Object.entries(traducoes).forEach(([pt, en]) => {
    textoEN = textoEN.replace(new RegExp(`\\b${pt}\\b`, 'gi'), en);
  });

  // Limpa e extrai palavras-chave
  const clean = textoEN
    .replace(/\b(mostrando|apresentando|destacando|ilustrando|indicando|showing|presenting|highlighting)\b/gi, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();

  // Extrai as palavras mais relevantes (ignora stopwords)
  const stopwords = new Set(['de', 'da', 'do', 'em', 'no', 'na', 'o', 'a', 'os', 'as', 'um', 'uma', 'the', 'of', 'in', 'and', 'with', 'for', 'to', 'by', 'at', 'from']);
  const palavras = clean.split(/\s+/).filter(p => p.length > 2 && !stopwords.has(p));

  const queries = [];

  // Query 1: palavras principais + tipo
  if (palavras.length >= 3) {
    queries.push(`${palavras.slice(0, 4).join(' ')} ${tipoEN}`.trim());
  }

  // Query 2: primeiras 2 palavras + tipo
  queries.push(`${palavras.slice(0, 2).join(' ')} ${tipoEN}`.trim());

  // Query 3: só as primeiras 3 palavras sem tipo
  if (palavras.length >= 2) {
    queries.push(palavras.slice(0, 3).join(' '));
  }

  // Query 4: primeira palavra + tipo (fallback genérico)
  if (palavras[0]) {
    queries.push(`${palavras[0]} ${tipoEN}`.trim());
  }

  // Remove duplicatas e queries vazias
  return [...new Set(queries)].filter(q => q.length > 2);
}
