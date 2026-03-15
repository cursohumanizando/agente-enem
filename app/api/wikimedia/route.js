export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const RECURSOS = [
  { tipo:['mapa','infográfico'], keywords:['bioma','biomas','amazonia','cerrado','caatinga','mata atlantica','pantanal','vegetacao'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Brazil_Biomes.svg/800px-Brazil_Biomes.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['desmatamento','amazonia','floresta'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amazon_deforestation.jpg/800px-Amazon_deforestation.jpg', fonte:'INPE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['semiarido','seca','nordeste','caatinga'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Nordeste_brasileiro.svg/800px-Nordeste_brasileiro.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['bacia hidrografica','hidrografia','rio'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bacias_hidrograficas_brasil.svg/800px-Bacias_hidrograficas_brasil.svg.png', fonte:'ANA / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['clima','climatico','tropical','equatorial','subtropical'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Brazil_climate.svg/800px-Brazil_climate.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['queimada','incendio','fogo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Brazil_fires_August_2019.jpg/800px-Brazil_fires_August_2019.jpg', fonte:'NASA / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['densidade','demografica','populacao','habitantes'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brazil_population_density_map.svg/800px-Brazil_population_density_map.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['urbanizacao','urbano','rural','exodo','metropole'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Brazil_urbanization_rate_2010.svg/800px-Brazil_urbanization_rate_2010.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['migracao','migrante','fluxo','nordestino'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Brazil_internal_migration.svg/800px-Brazil_internal_migration.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['indigena','terra indigena','povo originario'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Indigenous_peoples_in_Brazil.svg/800px-Indigenous_peoples_in_Brazil.svg.png', fonte:'FUNAI / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['regiao','norte','nordeste','centro-oeste','sudeste','sul'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brazil_Regions.svg/800px-Brazil_Regions.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['estado','capital','municipio','federacao','politico'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Brazil_states_1_(1988).svg/800px-Brazil_states_1_%281988%29.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['amazonia legal','pan amazonia'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Amaz%C3%B4nia_Legal.svg/800px-Amaz%C3%B4nia_Legal.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['fronteira','vizinho','america do sul','geopolitica'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/South_America.svg/800px-South_America.svg.png', fonte:'Wikimedia Commons' },
  { tipo:['mapa'], keywords:['pib','produto interno bruto','economia por estado'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Brazil_states_GDP.svg/800px-Brazil_states_GDP.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['idh','desenvolvimento humano'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Brazil_HDI_by_state.svg/800px-Brazil_HDI_by_state.svg.png', fonte:'PNUD / Wikimedia Commons' },
  { tipo:['mapa'], keywords:['agronegocio','soja','agricultura'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Brazil_agriculture.svg/800px-Brazil_agriculture.svg.png', fonte:'IBGE / Wikimedia Commons' },
  { tipo:['mapa','infográfico'], keywords:['anamorfose','cartograma','populacao mundial'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/World_population_cartogram.png/800px-World_population_cartogram.png', fonte:'Wikimedia Commons' },
  { tipo:['mapa','infográfico'], keywords:['anamorfose pib','riqueza mundial','economia mundial'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Cartogram_GDP.png/800px-Cartogram_GDP.png', fonte:'Wikimedia Commons' },
  { tipo:['mapa','infográfico'], keywords:['co2','emissoes','carbono','aquecimento global'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cartogram_CO2_emissions.png/800px-Cartogram_CO2_emissions.png', fonte:'Wikimedia Commons' },
  { tipo:['mapa','infográfico'], keywords:['refugiado','migracao internacional','deslocamento'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Refugees_cartogram.svg/800px-Refugees_cartogram.svg.png', fonte:'ACNUR / Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['revolucao industrial','operario','fabrica','capitalismo industrial','chamine','burgues'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Uss_men_in_factory.jpg/800px-Uss_men_in_factory.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['escravidao','escravo','abolicao','trafico negreiro','senzala'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Slave_ship_diagram.jpg/800px-Slave_ship_diagram.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['primeira guerra','trincheira','frente de batalha'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cheshire_Regiment_trench_Somme_1916.jpg/800px-Cheshire_Regiment_trench_Somme_1916.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['segunda guerra','holocausto','nazismo','fascismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Buchenwald_Slave_Laborers_Liberation.jpg/800px-Buchenwald_Slave_Laborers_Liberation.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['favela','periferia','moradia precaria','habitacao'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rocinha_favela_Brazil.jpg/800px-Rocinha_favela_Brazil.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['protesto','manifestacao','movimento social','greve'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/March_on_Washington_1963.jpg/800px-March_on_Washington_1963.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['globalizacao','comercio','porto','conteiner'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image-Hafen-Hamburg-Aerial.jpg/800px-Image-Hafen-Hamburg-Aerial.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['revolucao francesa','guilhotina','bastilha','iluminismo'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/800px-Anonymous_-_Prise_de_la_Bastille.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['colonialismo','imperialismo','colonizacao','africa'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Scramble_for_Africa_1880_to_1913.png/800px-Scramble_for_Africa_1880_to_1913.png', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['ditadura','censura','repressao','regime militar'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pinochet_saluting_1995.jpg/800px-Pinochet_saluting_1995.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['poluicao','industria','fumaca','degradacao ambiental'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Coal_power_plant_Datteln_2_Crop1.jpg/800px-Coal_power_plant_Datteln_2_Crop1.jpg', fonte:'Wikimedia Commons' },
  { tipo:['charge','fotografia'], keywords:['guerra fria','urss','cortina de ferro','nuclear'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Checkpoint_Charlie_1961-10-27.jpg/800px-Checkpoint_Charlie_1961-10-27.jpg', fonte:'Wikimedia Commons' },
  { tipo:['gráfico','tabela'], keywords:['crescimento populacional','populacao mundial','demografico'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/World_population_growth_rate_1950-2050.svg/800px-World_population_growth_rate_1950-2050.svg.png', fonte:'Wikimedia Commons' },
  { tipo:['gráfico','tabela'], keywords:['pib','crescimento economico','renda','gdp'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/GDP_PPP_Per_Capita_IMF_2008.svg/800px-GDP_PPP_Per_Capita_IMF_2008.svg.png', fonte:'Wikimedia Commons' },
  { tipo:['gráfico','tabela'], keywords:['desigualdade','gini','distribuicao renda'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gini_Coefficient_World_CIA_Report_2015.png/800px-Gini_Coefficient_World_CIA_Report_2015.png', fonte:'Wikimedia Commons' },
  { tipo:['gráfico','tabela'], keywords:['temperatura','aquecimento','carbono','emissao climatica'], url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Global_Temperature_Anomaly.svg/800px-Global_Temperature_Anomaly.svg.png', fonte:'NASA / Wikimedia Commons' },
];

function normalizar(texto) {
  return (texto || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ');
}

function encontrarRecurso(descricao, tipo, tema) {
  const texto = normalizar(`${descricao} ${tema || ''}`);
  const tipoNorm = normalizar(tipo || '');
  let melhor = null, maiorScore = 0;
  for (const rec of RECURSOS) {
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

export async function POST(request) {
  try {
    const { descricao, tipo, tema } = await request.json();

    // 1. Biblioteca curada — retorna URL direta
    const recurso = encontrarRecurso(descricao, tipo, tema);
    if (recurso) {
      return Response.json({ found: true, imageUrl: recurso.url, fonte: recurso.fonte });
    }

    // 2. Fallback: busca no Wikimedia via Claude e retorna URL direta
    const searchTerm = await gerarTermoBusca(descricao, tipo);
    if (searchTerm) {
      const imageUrl = await buscarUrlWikimedia(searchTerm);
      if (imageUrl) {
        return Response.json({ found: true, imageUrl, fonte: 'Wikimedia Commons' });
      }
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('Wikimedia error:', error.message);
    return Response.json({ found: false });
  }
}

async function gerarTermoBusca(descricao, tipo) {
  try {
    const tipoEN = { 'mapa':'map', 'gráfico':'chart', 'tabela':'table', 'charge':'cartoon historical', 'fotografia':'photograph', 'infográfico':'infographic' }[tipo] || '';
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 40,
        messages: [{ role: 'user', content: `Convert to Wikimedia Commons search (max 4 words English, return ONLY the terms):\n"${descricao.slice(0,150)}" type:${tipoEN}` }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim().replace(/['"]/g, '').slice(0, 60) || null;
  } catch { return null; }
}

async function buscarUrlWikimedia(query) {
  try {
    const searchUrl = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query', generator: 'search', gsrnamespace: 6,
      gsrsearch: query, gsrlimit: 8, prop: 'imageinfo',
      iiprop: 'url|mime|size', iiurlwidth: 800, format: 'json', origin: '*',
    });
    const res = await fetch(searchUrl, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const candidates = Object.values(pages)
      .map(p => p.imageinfo?.[0])
      .filter(i => i?.thumburl && (i.mime === 'image/jpeg' || i.mime === 'image/png') && i.width > 400 && i.height > 300)
      .sort((a, b) => (b.width * b.height) - (a.width * a.height));
    return candidates[0]?.thumburl || null;
  } catch { return null; }
}
