// v5 - Multi-source com atribuição: Wikimedia Commons + NASA + Met Museum + Smithsonian
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Biblioteca curada — temas mais frequentes no ENEM
// ---------------------------------------------------------------------------
const RECURSOS_CURADOS = [
  // --- Geografia do Brasil ---
  { tipo:['mapa','infográfico'], keywords:['bioma','biomas','amazonia','cerrado','caatinga','mata atlantica','pantanal','vegetacao'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Brazil_Biomes.svg/800px-Brazil_Biomes.svg.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['mapa'], keywords:['desmatamento','amazonia','floresta'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amazon_deforestation.jpg/800px-Amazon_deforestation.jpg', credito:'NASA / Wikimedia Commons / Domínio Público' },
  { tipo:['mapa'], keywords:['regiao','norte','nordeste','centro-oeste','sudeste','sul'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brazil_Regions.svg/800px-Brazil_Regions.svg.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['mapa'], keywords:['densidade','demografica','populacao','habitantes'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brazil_population_density_map.svg/800px-Brazil_population_density_map.svg.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['mapa','infográfico'], keywords:['anamorfose','cartograma','populacao mundial'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/World_population_cartogram.png/800px-World_population_cartogram.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['mapa','infográfico'], keywords:['co2','emissoes','carbono','aquecimento global'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cartogram_CO2_emissions.png/800px-Cartogram_CO2_emissions.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia','mapa'], keywords:['sertao','semiarido','nordeste','seca','estiagem'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Caatinga3.jpg/800px-Caatinga3.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia','infográfico'], keywords:['energia eolica','geracao eolica','aerogerador','vento'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Eolic_Brazil.jpg/800px-Eolic_Brazil.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia'], keywords:['extrativismo','mineracao','vale','ferro','para'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Carajas_mine.jpg/800px-Carajas_mine.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },

  // --- Urbanização e problemas sociais ---
  { tipo:['charge','fotografia'], keywords:['favela','periferia','moradia precaria','habitacao'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rocinha_favela_Brazil.jpg/800px-Rocinha_favela_Brazil.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia'], keywords:['sao paulo','urbanizacao','metropole','megatropole'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sao_Paulo_-_Skyscrapers.jpg/800px-Sao_Paulo_-_Skyscrapers.jpg', credito:'Wikimedia Commons / CC BY-SA 2.0' },
  { tipo:['gráfico','tabela'], keywords:['desigualdade','gini','distribuicao renda'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gini_Coefficient_World_CIA_Report_2015.png/800px-Gini_Coefficient_World_CIA_Report_2015.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },

  // --- História do Brasil ---
  { tipo:['fotografia','charge'], keywords:['independencia','grito ipiranga','dom pedro','proclamacao independencia'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Independ%C3%AAncia_ou_Morte.jpg/800px-Independ%C3%AAncia_ou_Morte.jpg', credito:'Pedro Américo / Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia','charge'], keywords:['proclamacao republica','marechal deodoro','republica velha'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica_by_Benedito_Calixto_%281893%29.jpg/800px-Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica_by_Benedito_Calixto_%281893%29.jpg', credito:'Benedito Calixto (1893) / Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia','charge'], keywords:['escravidao','escravo','abolicao','trafico negreiro','lei aurea'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Slave_ship_diagram.jpg/800px-Slave_ship_diagram.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia'], keywords:['quilombo','palmares','zumbi','resistencia negra'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Zumbi.jpg/800px-Zumbi.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia','charge'], keywords:['getulio vargas','estado novo','populismo','trabalhismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Get%C3%BAlio_Vargas_foto_oficial.jpg/800px-Get%C3%BAlio_Vargas_foto_oficial.jpg', credito:'Arquivo Nacional / Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia','charge'], keywords:['ditadura','censura','regime militar','1964','ato institucional'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pinochet_saluting_1995.jpg/800px-Pinochet_saluting_1995.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['fotografia','charge'], keywords:['diretas ja','redemocratizacao','abertura politica'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Diretas_Ja.jpg/800px-Diretas_Ja.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia','charge'], keywords:['mst','reforma agraria','sem terra','latifundio'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/MST_Brazil.jpg/800px-MST_Brazil.jpg', credito:'Wikimedia Commons / CC BY-SA 3.0' },

  // --- História mundial ---
  { tipo:['charge','fotografia'], keywords:['revolucao industrial','operario','fabrica','capitalismo industrial','chamine','burgues'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Uss_men_in_factory.jpg/800px-Uss_men_in_factory.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['charge','fotografia'], keywords:['primeira guerra','trincheira','grande guerra'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cheshire_Regiment_trench_Somme_1916.jpg/800px-Cheshire_Regiment_trench_Somme_1916.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['charge','fotografia'], keywords:['segunda guerra','holocausto','nazismo','fascismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Buchenwald_Slave_Laborers_Liberation.jpg/800px-Buchenwald_Slave_Laborers_Liberation.jpg', credito:'US Army / Wikimedia Commons / Domínio Público' },
  { tipo:['charge','fotografia'], keywords:['revolucao francesa','guilhotina','bastilha','iluminismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/800px-Anonymous_-_Prise_de_la_Bastille.jpg', credito:'Wikimedia Commons / Domínio Público' },
  { tipo:['charge','fotografia'], keywords:['colonialismo','imperialismo','africa','neocolonialismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Scramble_for_Africa_1880_to_1913.png/800px-Scramble_for_Africa_1880_to_1913.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['mapa','infográfico'], keywords:['guerra fria','cortina de ferro','urss','capitalismo socialismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cold_War_Map_1980.svg/800px-Cold_War_Map_1980.svg.png', credito:'Wikimedia Commons / CC BY-SA 3.0' },
  { tipo:['fotografia','charge'], keywords:['globalizacao','comercio internacional','multinacional','neoliberalismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Crowded_street_in_Shanghai.jpg/800px-Crowded_street_in_Shanghai.jpg', credito:'Wikimedia Commons / CC BY-SA 2.0' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function normalizar(texto) {
  return (texto || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ');
}

function encontrarCurado(descricao, tipo, tema) {
  const texto = normalizar(`${descricao} ${tema || ''}`);
  const tipoNorm = normalizar(tipo || '');
  let melhor = null, maiorScore = 0;
  for (const rec of RECURSOS_CURADOS) {
    const tipoBate = rec.tipo.some(t => normalizar(t) === tipoNorm || tipoNorm.includes(normalizar(t)));
    if (!tipoBate) continue;
    let score = 0;
    for (const kw of rec.keywords) {
      if (texto.includes(normalizar(kw))) score += kw.split(' ').length;
    }
    if (score > maiorScore) { maiorScore = score; melhor = rec; }
  }
  return maiorScore > 0 ? melhor : null;
}

// Limpa HTML de strings de metadados (ex: "<bdi>Autor</bdi>")
function limparHTML(str) {
  return (str || '').replace(/<[^>]+>/g, '').trim();
}

// ---------------------------------------------------------------------------
// IBGE Atlas Geográfico Escolar — mapas oficiais do Brasil (domínio público)
// Prioridade máxima para questões do tipo "mapa" com tema de geografia BR
// ---------------------------------------------------------------------------
const IBGE_BASE = 'https://atlasescolar.ibge.gov.br/images/mapas/brasil/1920/';

const IBGE_MAPAS_CURADOS = [
  { keywords: ['bioma','biomas','vegetacao','vegetação','mata atlantica','cerrado','caatinga','amazonia','pantanal','pampa','mangue'], img: 'pag103.jpg', legenda: 'Biomas do Brasil — IBGE Atlas Escolar' },
  { keywords: ['vegetacao natural','floresta','flora brasileira'], img: 'pag100.jpg', legenda: 'Vegetação Natural do Brasil — IBGE Atlas Escolar' },
  { keywords: ['clima','climatico','precipitacao','pluviosidade','semiarido','tropical','equatorial'], img: 'pag98.jpg', legenda: 'Clima do Brasil — IBGE Atlas Escolar' },
  { keywords: ['temperatura','termico','calor'], img: 'pag88.jpg', legenda: 'Temperatura do Brasil — IBGE Atlas Escolar' },
  { keywords: ['relevo','altimetria','planalto','planicie','depressao','chapada','serras'], img: 'brasil-relevo-continental-e-fundo-oceanico.jpg', legenda: 'Relevo do Brasil — IBGE Atlas Escolar' },
  { keywords: ['topografia','perfil topografico'], img: 'brasil-perfil-topografico.jpg', legenda: 'Perfil Topográfico do Brasil — IBGE Atlas Escolar' },
  { keywords: ['geologia','geologico','formacao geologica','escudo','bacia sedimentar'], img: 'pag97.jpg', legenda: 'Geologia do Brasil — IBGE Atlas Escolar' },
  { keywords: ['solo','solos','latossolo','argissolo','pedologia'], img: 'pag102_mapa1_v2.jpg', legenda: 'Solos do Brasil — IBGE Atlas Escolar' },
  { keywords: ['hidrografia','bacia hidrografica','rio','recursos hidricos','aquifero'], img: 'pag105.jpg', legenda: 'Regiões Hidrográficas do Brasil — IBGE Atlas Escolar' },
  { keywords: ['uso da terra','cobertura do solo','agropecuaria','pastagem','lavoura'], img: 'pag104_v2.jpg', legenda: 'Cobertura e Uso da Terra — IBGE Atlas Escolar' },
];

function buscarIBGE(descricao, tipo, tema) {
  if (!['mapa', 'infográfico'].includes(tipo)) return null;
  const texto = normalizar(`${descricao} ${tema || ''}`);
  let melhor = null, maiorScore = 0;
  for (const rec of IBGE_MAPAS_CURADOS) {
    let score = 0;
    for (const kw of rec.keywords) {
      if (texto.includes(normalizar(kw))) score += kw.split(' ').length;
    }
    if (score > maiorScore) { maiorScore = score; melhor = rec; }
  }
  return maiorScore > 0
    ? { url: IBGE_BASE + melhor.img, credito: melhor.legenda + ' / Domínio Público' }
    : null;
}

// ---------------------------------------------------------------------------
// Fonte 1: Wikimedia Commons — com extração de licença e autor
// ---------------------------------------------------------------------------
async function buscarWikimediaCommons(query, tipo) {
  try {
    const aceitaSvg = ['mapa', 'infográfico'].includes(tipo);
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrnamespace: '6',
      gsrsearch: query,
      gsrlimit: '10',
      prop: 'imageinfo',
      iiprop: 'url|size|mime|extmetadata',
      iiextmetadatafilter: 'Artist|LicenseShortName|Credit',
      iiurlwidth: '800',
      format: 'json',
      origin: '*',
    });
    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`,
      { headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' }, signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const mime = info.mime || '';
      if (!aceitaSvg && mime === 'image/svg+xml') continue;
      if (!mime.startsWith('image/')) continue;
      if (info.width && info.width < 300) continue;
      const url = info.thumburl || info.url;
      if (!url) continue;

      // Monta crédito a partir dos metadados
      const meta = info.extmetadata || {};
      const autor = limparHTML(meta.Artist?.value || meta.Credit?.value || '');
      const licenca = limparHTML(meta.LicenseShortName?.value || '');
      const partes = [autor, 'Wikimedia Commons', licenca].filter(Boolean);
      // Remove duplicatas caso autor seja "Wikimedia Commons"
      const creditoFinal = [...new Set(partes)].join(' / ');

      return { url, credito: creditoFinal || 'Wikimedia Commons' };
    }
    return null;
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Fonte 2: NASA Images API — totalmente domínio público, ótima para geografia
// ---------------------------------------------------------------------------
async function buscarNASA(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      media_type: 'image',
      page_size: '5',
    });
    const res = await fetch(
      `https://images-api.nasa.gov/search?${params}`,
      { headers: { 'User-Agent': 'AgenteENEM/1.0' }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const items = data.collection?.items || [];
    for (const item of items) {
      const thumb = item.links?.find(l => l.rel === 'preview')?.href;
      if (thumb) {
        const titulo = item.data?.[0]?.title || '';
        const centro = item.data?.[0]?.center || 'NASA';
        return { url: thumb, credito: `${titulo ? titulo + ' / ' : ''}${centro} / Domínio Público` };
      }
    }
    return null;
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Fonte 3: Met Museum Open Access
// ---------------------------------------------------------------------------
async function buscarMetMuseum(query) {
  try {
    const searchRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?` + new URLSearchParams({
        q: query,
        hasImages: 'true',
      }),
      { signal: AbortSignal.timeout(8000) }
    );
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const ids = (searchData.objectIDs || []).slice(0, 8);
    for (const id of ids) {
      const objRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!objRes.ok) continue;
      const obj = await objRes.json();
      const imgUrl = obj.primaryImageSmall || obj.primaryImage;
      if (!imgUrl) continue;
      const artista = obj.artistDisplayName || '';
      const data = obj.objectDate || '';
      const licenca = obj.isPublicDomain ? 'Domínio Público' : 'CC0';
      const partes = [artista, data, 'Metropolitan Museum of Art', licenca].filter(Boolean);
      return { url: imgUrl, credito: partes.join(' / ') };
    }
    return null;
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Fonte 4: Pixabay (requer PIXABAY_API_KEY — gratuito em pixabay.com/api)
// ---------------------------------------------------------------------------
async function buscarPixabay(query) {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) return null;
  try {
    const params = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: 'photo',
      lang: 'pt',
      safesearch: 'true',
      per_page: '5',
      min_width: '600',
    });
    const res = await fetch(
      `https://pixabay.com/api/?${params}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const hit = data.hits?.[0];
    if (!hit) return null;
    const url = hit.largeImageURL || hit.webformatURL;
    const usuario = hit.user || 'Pixabay';
    return { url, credito: `${usuario} / Pixabay / Licença Pixabay` };
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Fonte 5: Google Custom Search Images (requer GOOGLE_API_KEY + GOOGLE_CX)
// ---------------------------------------------------------------------------
async function buscarGoogle(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;
  if (!apiKey || !cx) return null;
  try {
    const params = new URLSearchParams({
      key: apiKey,
      cx,
      q: query,
      searchType: 'image',
      num: '5',
      safe: 'active',
      lr: 'lang_pt',
      gl: 'br',
      rights: 'cc_publicdomain|cc_attribute|cc_sharealike',
    });
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?${params}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    const url = item.link;
    const fonte = item.displayLink || 'Google Images';
    const titulo = item.title || '';
    return { url, credito: `${titulo ? titulo + ' / ' : ''}${fonte}` };
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Fonte 6: Smithsonian Open Access (requer SMITHSONIAN_API_KEY)
// ---------------------------------------------------------------------------
async function buscarSmithsonian(query) {
  const apiKey = process.env.SMITHSONIAN_API_KEY;
  if (!apiKey) return null;
  try {
    const params = new URLSearchParams({ q: query, api_key: apiKey, rows: '5' });
    const res = await fetch(
      `https://api.si.edu/openaccess/api/v1.0/search?${params}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    for (const row of (data.response?.rows || [])) {
      const media = row.content?.descriptiveNonRepeating?.online_media;
      const url = media?.media?.[0]?.content;
      if (url && url.startsWith('http')) {
        const titulo = row.title || '';
        return { url, credito: `${titulo ? titulo + ' / ' : ''}Smithsonian Institution / CC0` };
      }
    }
    return null;
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Download e conversão para base64
// ---------------------------------------------------------------------------
async function baixarImagem(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)',
        'Referer': 'https://commons.wikimedia.org/',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) return null;
    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength < 5000) return null;
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { dataUrl: `data:${contentType.split(';')[0]};base64,${base64}` };
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// Handler principal
// ---------------------------------------------------------------------------
export async function POST(request) {
  try {
    const { descricao, tipo, tema } = await request.json();

    // 1. IBGE Atlas Escolar (prioridade máxima para mapas de geografia BR)
    const ibge = buscarIBGE(descricao, tipo, tema);
    if (ibge) {
      const img = await baixarImagem(ibge.url);
      if (img) return Response.json({ found: true, credito: ibge.credito, ...img });
    }

    // 2. Biblioteca curada (Wikimedia verificado)
    const curado = encontrarCurado(descricao, tipo, tema);
    if (curado) {
      const img = await baixarImagem(curado.url);
      if (img) return Response.json({ found: true, credito: curado.credito, ...img });
    }

    // 3. Gera queries PT + EN via Claude Haiku
    const { pt: queryPT, en: queryEN } = await gerarQueryBusca(descricao, tipo, tema);
    const queriesPT = [queryPT, tema].filter(Boolean);

    // 4. Wikipedia em Português (prioridade para conteúdo PT-BR)
    for (const q of queriesPT) {
      const resultado = await buscarWikipediaPT(q);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    // 5. Wikimedia Commons em PT (busca com query em português)
    for (const q of queriesPT) {
      const resultado = await buscarWikimediaCommons(q, tipo);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    // 6. Pixabay em PT (se PIXABAY_API_KEY configurada)
    for (const q of queriesPT) {
      const resultado = await buscarPixabay(q);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    // 7. Google Custom Search em PT (se GOOGLE_API_KEY + GOOGLE_CX configurados)
    for (const q of queriesPT) {
      const resultado = await buscarGoogle(q);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    // 8. NASA Images (domínio público — query em EN pois conteúdo é em inglês)
    const resultado = await buscarNASA(queryEN || tema || '');
    if (resultado) {
      const img = await baixarImagem(resultado.url);
      if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
    }

    // 9. Met Museum (fallback)
    for (const q of queriesPT) {
      const resultado = await buscarMetMuseum(q);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    // 10. Smithsonian (se SMITHSONIAN_API_KEY configurada)
    for (const q of queriesPT) {
      const resultado = await buscarSmithsonian(q);
      if (resultado) {
        const img = await baixarImagem(resultado.url);
        if (img) return Response.json({ found: true, credito: resultado.credito, ...img });
      }
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('[wikimedia] erro:', error.message);
    return Response.json({ found: false });
  }
}

// ---------------------------------------------------------------------------
// Geração de queries via Claude Haiku — PT-BR + EN para NASA
// ---------------------------------------------------------------------------
async function gerarQueryBusca(descricao, tipo, tema) {
  try {
    const tipoPT = {
      'mapa': 'mapa',
      'gráfico': 'gráfico dados',
      'tabela': 'tabela dados',
      'charge': 'charge política histórica',
      'fotografia': 'fotografia histórica',
      'infográfico': 'infográfico',
    }[tipo] || '';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 80,
        messages: [{
          role: 'user',
          content: `Crie duas queries de busca para encontrar uma imagem no Wikimedia Commons ou Wikipedia em português.\nRetorne APENAS JSON: {"pt":"query em português (máx 5 palavras)","en":"english query (max 5 words)"}\n\nDescrição: "${descricao.slice(0, 150)}"\nTema: "${tema || ''}"\nTipo: ${tipoPT}\n\nJSON:`
        }]
      })
    });
    const data = await res.json();
    const raw = data.content?.[0]?.text?.trim() || '{}';
    const parsed = JSON.parse(raw.match(/\{.*\}/s)?.[0] || '{}');
    return { pt: (parsed.pt || tema || '').slice(0, 80), en: (parsed.en || tema || '').slice(0, 80) };
  } catch { return { pt: tema || '', en: tema || '' }; }
}

// ---------------------------------------------------------------------------
// Wikipedia PT — busca imagem de artigo em português
// ---------------------------------------------------------------------------
async function buscarWikipediaPT(query) {
  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrlimit: '5',
      prop: 'pageimages|info',
      pithumbsize: '800',
      format: 'json',
      origin: '*',
    });
    const res = await fetch(
      `https://pt.wikipedia.org/w/api.php?${params}`,
      { headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});
    for (const page of pages) {
      const url = page.thumbnail?.source;
      if (url) {
        const titulo = page.title || query;
        return { url, credito: `${titulo} / Wikipedia em Português / CC BY-SA 4.0` };
      }
    }
    return null;
  } catch { return null; }
}
