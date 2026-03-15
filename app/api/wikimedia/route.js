// v2 - Google Custom Search API
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

// Biblioteca curada para temas mais comuns do ENEM
const RECURSOS_CURADOS = [
  { tipo:['mapa','infográfico'], keywords:['bioma','biomas','amazonia','cerrado','caatinga','mata atlantica','pantanal','vegetacao'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Brazil_Biomes.svg/800px-Brazil_Biomes.svg.png' },
  { tipo:['mapa'], keywords:['desmatamento','amazonia','floresta'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amazon_deforestation.jpg/800px-Amazon_deforestation.jpg' },
  { tipo:['mapa'], keywords:['regiao','norte','nordeste','centro-oeste','sudeste','sul'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brazil_Regions.svg/800px-Brazil_Regions.svg.png' },
  { tipo:['mapa'], keywords:['densidade','demografica','populacao','habitantes'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brazil_population_density_map.svg/800px-Brazil_population_density_map.svg.png' },
  { tipo:['mapa','infográfico'], keywords:['anamorfose','cartograma','populacao mundial'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/World_population_cartogram.png/800px-World_population_cartogram.png' },
  { tipo:['mapa','infográfico'], keywords:['co2','emissoes','carbono','aquecimento global'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cartogram_CO2_emissions.png/800px-Cartogram_CO2_emissions.png' },
  { tipo:['charge','fotografia'], keywords:['revolucao industrial','operario','fabrica','capitalismo industrial','chamine','burgues'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Uss_men_in_factory.jpg/800px-Uss_men_in_factory.jpg' },
  { tipo:['charge','fotografia'], keywords:['escravidao','escravo','abolicao','trafico negreiro'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Slave_ship_diagram.jpg/800px-Slave_ship_diagram.jpg' },
  { tipo:['charge','fotografia'], keywords:['primeira guerra','trincheira'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cheshire_Regiment_trench_Somme_1916.jpg/800px-Cheshire_Regiment_trench_Somme_1916.jpg' },
  { tipo:['charge','fotografia'], keywords:['segunda guerra','holocausto','nazismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Buchenwald_Slave_Laborers_Liberation.jpg/800px-Buchenwald_Slave_Laborers_Liberation.jpg' },
  { tipo:['charge','fotografia'], keywords:['favela','periferia','moradia precaria'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rocinha_favela_Brazil.jpg/800px-Rocinha_favela_Brazil.jpg' },
  { tipo:['charge','fotografia'], keywords:['revolucao francesa','guilhotina','bastilha'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/800px-Anonymous_-_Prise_de_la_Bastille.jpg' },
  { tipo:['charge','fotografia'], keywords:['colonialismo','imperialismo','africa'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Scramble_for_Africa_1880_to_1913.png/800px-Scramble_for_Africa_1880_to_1913.png' },
  { tipo:['charge','fotografia'], keywords:['ditadura','censura','regime militar'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pinochet_saluting_1995.jpg/800px-Pinochet_saluting_1995.jpg' },
  { tipo:['gráfico','tabela'], keywords:['desigualdade','gini','distribuicao renda'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gini_Coefficient_World_CIA_Report_2015.png/800px-Gini_Coefficient_World_CIA_Report_2015.png' },
];

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

// Busca imagem via Google Custom Search API
async function buscarGoogleImages(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (!apiKey || !cx) return null;

  try {
    const url = `https://www.googleapis.com/customsearch/v1?` + new URLSearchParams({
      key: apiKey,
      cx: cx,
      q: query,
      searchType: 'image',
      num: 5,
      imgSize: 'large',
      safe: 'active',
    });

    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;

    const data = await res.json();
    const items = data.items || [];

    // Pega a primeira imagem disponível
    for (const item of items) {
      const imgUrl = item.link;
      if (imgUrl && (imgUrl.endsWith('.jpg') || imgUrl.endsWith('.jpeg') || imgUrl.endsWith('.png') || imgUrl.includes('jpg') || imgUrl.includes('png'))) {
        return imgUrl;
      }
    }
    return items[0]?.link || null;
  } catch {
    return null;
  }
}

// Baixa imagem e converte para base64
async function baixarImagem(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AgenteENEM/1.0)',
        'Referer': 'https://www.google.com/',
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
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const { descricao, tipo, tema } = await request.json();

    // 1. Tenta biblioteca curada primeiro
    const curado = encontrarCurado(descricao, tipo, tema);
    if (curado) {
      const img = await baixarImagem(curado.url);
      if (img) return Response.json({ found: true, ...img });
    }

    // 2. Busca dinâmica via Google Custom Search
    const searchQuery = await gerarQueryBusca(descricao, tipo, tema);
    if (searchQuery) {
      const googleUrl = await buscarGoogleImages(searchQuery);
      if (googleUrl) {
        const img = await baixarImagem(googleUrl);
        if (img) return Response.json({ found: true, ...img });
      }
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('Erro:', error.message);
    return Response.json({ found: false });
  }
}

async function gerarQueryBusca(descricao, tipo, tema) {
  try {
    const tipoEN = {
      'mapa': 'map',
      'gráfico': 'chart graph',
      'tabela': 'table data',
      'charge': 'political cartoon historical',
      'fotografia': 'historical photograph',
      'infográfico': 'infographic',
    }[tipo] || '';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 50,
        messages: [{
          role: 'user',
          content: `Create a Google image search query in English (max 5 words) for this educational content. Return ONLY the search terms.\n\nDescription: "${descricao.slice(0, 150)}"\nTheme: "${tema || ''}"\nType: ${tipoEN}\n\nSearch query:`
        }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim().replace(/['"]/g, '').slice(0, 80) || null;
  } catch { return null; }
}
