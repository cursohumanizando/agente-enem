export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { descricao, tipo, tema } = await request.json();
    
    console.log('=== WIKIMEDIA DEBUG ===');
    console.log('tipo:', tipo);
    console.log('tema:', tema);
    console.log('descricao:', descricao?.slice(0, 100));

    // Testa download direto de uma imagem conhecida
    const testUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Uss_men_in_factory.jpg/800px-Uss_men_in_factory.jpg';
    console.log('Testando download direto:', testUrl);
    
    const testRes = await fetch(testUrl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' },
      signal: AbortSignal.timeout(10000),
    });
    
    console.log('Status download:', testRes.status, testRes.ok);
    console.log('Content-Type:', testRes.headers.get('content-type'));
    
    if (!testRes.ok) {
      return Response.json({ found: false, debug: `download falhou: status ${testRes.status}` });
    }
    
    const arrayBuffer = await testRes.arrayBuffer();
    console.log('Tamanho bytes:', arrayBuffer.byteLength);
    
    if (arrayBuffer.byteLength < 5000) {
      return Response.json({ found: false, debug: `imagem muito pequena: ${arrayBuffer.byteLength} bytes` });
    }
    
    const mime = testRes.headers.get('content-type')?.split(';')[0].trim() || 'image/jpeg';
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;
    
    console.log('SUCCESS! mime:', mime, 'base64 length:', base64.length);
    
    return Response.json({
      found: true,
      dataUrl,
      mimeType: mime,
      fonte: 'Wikimedia Commons (debug)',
      debug: `ok - ${arrayBuffer.byteLength} bytes`
    });

  } catch (error) {
    console.error('ERRO:', error.message);
    return Response.json({ found: false, debug: error.message });
  }
}
