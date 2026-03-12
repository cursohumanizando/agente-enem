export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { descricao, tipo } = await request.json();
    const query = buildQuery(descricao, tipo);

    const searchUrl = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrnamespace: 6,
      gsrsearch: query,
      gsrlimit: 8,
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: 800,
      format: 'json',
      origin: '*',
    });

    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' }
    });

    if (!searchRes.ok) return Response.json({ found: false });

    const searchData = await searchRes.json();
    const pages = searchData?.query?.pages;
    if (!pages) return Response.json({ found: false });

    const candidates = Object.values(pages)
      .map(p => p.imageinfo?.[0])
      .filter(info =>
        info?.thumburl &&
        (info.mime === 'image/jpeg' || info.mime === 'image/png') &&
        info.width > 200 && info.height > 200
      );

    if (candidates.length === 0) return Response.json({ found: false });

    const imgInfo = candidates[0];

    const imgRes = await fetch(imgInfo.thumburl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' }
    });

    if (!imgRes.ok) return Response.json({ found: false });

    const arrayBuffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${imgInfo.mime};base64,${base64}`;

    return Response.json({
      found: true,
      dataUrl,
      mimeType: imgInfo.mime,
      width: imgInfo.thumbwidth || imgInfo.width,
      height: imgInfo.thumbheight || imgInfo.height,
      sourceUrl: imgInfo.url,
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function buildQuery(descricao, tipo) {
  const tipoMap = {
    'mapa': 'map',
    'gráfico': 'chart',
    'tabela': 'table',
    'charge': 'cartoon',
    'fotografia': 'photo',
    'infográfico': 'infographic',
  };
  const clean = descricao
    .replace(/\b(mostrando|apresentando|destacando|ilustrando|indicando)\b/gi, '')
    .replace(/\(.*?\)/g, '')
    .trim()
    .slice(0, 100);
  return `${clean} ${tipoMap[tipo] || ''}`.trim();
}
