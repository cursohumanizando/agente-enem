export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url || !url.startsWith('https://upload.wikimedia.org/')) {
      return new Response('URL inválida', { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)',
        'Referer': 'https://commons.wikimedia.org/',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return new Response('Imagem não encontrada', { status: 404 });

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await res.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Erro ao carregar imagem', { status: 500 });
  }
}
