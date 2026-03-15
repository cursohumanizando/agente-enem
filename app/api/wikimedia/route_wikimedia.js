export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const MAPAS_IBGE = [
  { id:"biomas_brasil", titulo:"Biomas do Brasil", keywords:["bioma","biomas","amazonia","cerrado","caatinga","mata atlantica","pampa","pantanal","floresta","vegetação"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Brazil_Biomes.svg/800px-Brazil_Biomes.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"desmatamento_amazonia", titulo:"Desmatamento na Amazônia", keywords:["desmatamento","deforestation","amazonia","amazon","prodes","inpe"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amazon_deforestation.jpg/800px-Amazon_deforestation.jpg", fonte:"INPE / Wikimedia Commons" },
  { id:"areas_protegidas", titulo:"Áreas Protegidas", keywords:["unidade conservação","área protegida","parque nacional","reserva","apa"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Mapa_unidades_de_conserva%C3%A7%C3%A3o_brasil.png/800px-Mapa_unidades_de_conserva%C3%A7%C3%A3o_brasil.png", fonte:"MMA / Wikimedia Commons" },
  { id:"semiarido", titulo:"Região Semiárida", keywords:["semiárido","semiarido","seca","nordeste seco","caatinga","drought","nordeste"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Nordeste_brasileiro.svg/800px-Nordeste_brasileiro.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"hidrografia", titulo:"Bacias Hidrográficas", keywords:["bacia hidrográfica","hidrografia","rio","river basin","são francisco","paraná","amazonas"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bacias_hidrograficas_brasil.svg/800px-Bacias_hidrograficas_brasil.svg.png", fonte:"ANA / Wikimedia Commons" },
  { id:"clima_brasil", titulo:"Climas do Brasil", keywords:["clima","climate","tropical","equatorial","subtropical","temperado"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Brazil_climate.svg/800px-Brazil_climate.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"queimadas", titulo:"Queimadas no Brasil", keywords:["queimada","incêndio","fogo","fire","burning"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Brazil_fires_August_2019.jpg/800px-Brazil_fires_August_2019.jpg", fonte:"NASA / Wikimedia Commons" },
  { id:"densidade_demografica", titulo:"Densidade Demográfica", keywords:["densidade demográfica","population density","habitantes por km","concentração populacional"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brazil_population_density_map.svg/800px-Brazil_population_density_map.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"populacao_estados", titulo:"População por Estados", keywords:["população","census","habitantes","estado"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Brazil_states_population_2010.svg/800px-Brazil_states_population_2010.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"urbanizacao", titulo:"Urbanização no Brasil", keywords:["urbanização","urbanization","urbano","rural","êxodo rural","metropole"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Brazil_urbanization_rate_2010.svg/800px-Brazil_urbanization_rate_2010.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"migracao", titulo:"Fluxos Migratórios", keywords:["migração","migration","migrante","êxodo","fluxo populacional","nordestino"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Brazil_internal_migration.svg/800px-Brazil_internal_migration.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"populacao_indigena", titulo:"Povos Indígenas", keywords:["indígena","indigenous","terra indígena","povo originário","demarcação"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Indigenous_peoples_in_Brazil.svg/800px-Indigenous_peoples_in_Brazil.svg.png", fonte:"FUNAI / Wikimedia Commons" },
  { id:"regioes_brasil", titulo:"Regiões do Brasil", keywords:["região","region","norte","nordeste","centro-oeste","sudeste","sul","divisão regional"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brazil_Regions.svg/800px-Brazil_Regions.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"estados_capitais", titulo:"Estados e Capitais", keywords:["estado","capital","município","federação","divisão política","mapa político"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Brazil_states_1_(1988).svg/800px-Brazil_states_1_%281988%29.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"amazonia_legal", titulo:"Amazônia Legal", keywords:["amazônia legal","legal amazon","pan amazônia","região norte","floresta amazônica"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Amaz%C3%B4nia_Legal.svg/800px-Amaz%C3%B4nia_Legal.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"fronteiras", titulo:"Fronteiras do Brasil", keywords:["fronteira","border","vizinho","américa do sul","south america","geopolítica"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/South_America.svg/800px-South_America.svg.png", fonte:"Wikimedia Commons" },
  { id:"pib_estados", titulo:"PIB por Estado", keywords:["pib","gdp","produto interno bruto","economia","riqueza"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Brazil_states_GDP.svg/800px-Brazil_states_GDP.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"idh_estados", titulo:"IDH dos Estados", keywords:["idh","hdi","desenvolvimento humano","desigualdade","índice"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Brazil_HDI_by_state.svg/800px-Brazil_HDI_by_state.svg.png", fonte:"PNUD / Wikimedia Commons" },
  { id:"desigualdade_gini", titulo:"Índice de Gini", keywords:["gini","desigualdade","inequality","concentração renda","pobreza"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gini_Coefficient_World_CIA_Report_2015.png/800px-Gini_Coefficient_World_CIA_Report_2015.png", fonte:"CIA / Wikimedia Commons" },
  { id:"agronegocio", titulo:"Agronegócio no Brasil", keywords:["agronegócio","agribusiness","soja","agricultura","produção agrícola","safra"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Brazil_agriculture.svg/800px-Brazil_agriculture.svg.png", fonte:"IBGE / Wikimedia Commons" },
  { id:"anamorfose_populacao_mundial", titulo:"Anamorfose — População Mundial", keywords:["anamorfose","cartogram","população mundial","world population","tamanho proporcional"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/World_population_cartogram.png/800px-World_population_cartogram.png", fonte:"Wikimedia Commons" },
  { id:"anamorfose_pib_mundial", titulo:"Anamorfose — PIB Mundial", keywords:["anamorfose pib","gdp cartogram","riqueza mundial","economia mundial"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Cartogram_GDP.png/800px-Cartogram_GDP.png", fonte:"Wikimedia Commons" },
  { id:"anamorfose_co2", titulo:"Anamorfose — Emissões de CO2", keywords:["co2","emissões","carbono","aquecimento global","efeito estufa"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cartogram_CO2_emissions.png/800px-Cartogram_CO2_emissions.png", fonte:"Wikimedia Commons" },
  { id:"anamorfose_migracao_mundial", titulo:"Anamorfose — Migração Mundial", keywords:["refugiado","refugee","migração internacional","deslocamento forçado"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Refugees_cartogram.svg/800px-Refugees_cartogram.svg.png", fonte:"ACNUR / Wikimedia Commons" },
];

// Charges e fotografias históricas curadas por tema
const RECURSOS_HISTORICOS = [
  { keywords:["revolução industrial","operário","fábrica","capitalismo industrial","trabalho século xix"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Uss_men_in_factory.jpg/800px-Uss_men_in_factory.jpg", fonte:"Wikimedia Commons" },
  { keywords:["escravidão","escravo","abolição","tráfico negreiro","senzala"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Slave_ship_diagram.jpg/800px-Slave_ship_diagram.jpg", fonte:"Wikimedia Commons" },
  { keywords:["primeira guerra mundial","guerra","trincheira","frente de batalha"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cheshire_Regiment_trench_Somme_1916.jpg/800px-Cheshire_Regiment_trench_Somme_1916.jpg", fonte:"Wikimedia Commons" },
  { keywords:["segunda guerra mundial","holocausto","nazismo","fascismo"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Buchenwald_Slave_Laborers_Liberation.jpg/800px-Buchenwald_Slave_Laborers_Liberation.jpg", fonte:"Wikimedia Commons" },
  { keywords:["urbanização","favela","periferia","cidade","moradia precária"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rocinha_favela_Brazil.jpg/800px-Rocinha_favela_Brazil.jpg", fonte:"Wikimedia Commons" },
  { keywords:["desmatamento","devastação ambiental","exploração natureza"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amazon_deforestation.jpg/800px-Amazon_deforestation.jpg", fonte:"Wikimedia Commons" },
  { keywords:["protesto","manifestação","movimento social","greve","trabalhadores"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/March_on_Washington_1963.jpg/800px-March_on_Washington_1963.jpg", fonte:"Wikimedia Commons" },
  { keywords:["globalização","comércio internacional","porto","contêiner","exportação"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image-Hafen-Hamburg-Aerial.jpg/800px-Image-Hafen-Hamburg-Aerial.jpg", fonte:"Wikimedia Commons" },
  { keywords:["revolução francesa","guilhotina","bastilha","iluminismo","monarquia"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/800px-Anonymous_-_Prise_de_la_Bastille.jpg", fonte:"Wikimedia Commons" },
  { keywords:["colonialismo","imperialismo","colonização","exploração colonial"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Scramble_for_Africa_1880_to_1913.png/800px-Scramble_for_Africa_1880_to_1913.png", fonte:"Wikimedia Commons" },
  { keywords:["ditadura","censura","repressão","autoritarismo","regime militar"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pinochet_saluting_1995.jpg/800px-Pinochet_saluting_1995.jpg", fonte:"Wikimedia Commons" },
  { keywords:["meio ambiente","poluição","indústria","fumaça","degradação"], url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Coal_power_plant_Datteln_2_Crop1.jpg/800px-Coal_power_plant_Datteln_2_Crop1.jpg", fonte:"Wikimedia Commons" },
];

function encontrarMapaIBGE(descricao, tema) {
  const texto = `${descricao} ${tema || ''}`.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let melhor = null, maiorScore = 0;
  for (const mapa of MAPAS_IBGE) {
    let score = 0;
    for (const kw of mapa.keywords) {
      const kwNorm = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (texto.includes(kwNorm)) score += kwNorm.split(' ').length;
    }
    if (score > maiorScore) { maiorScore = score; melhor = mapa; }
  }
  return maiorScore > 0 ? melhor : null;
}

function encontrarRecursoHistorico(descricao, tema) {
  const texto = `${descricao} ${tema || ''}`.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let melhor = null, maiorScore = 0;
  for (const rec of RECURSOS_HISTORICOS) {
    let score = 0;
    for (const kw of rec.keywords) {
      const kwNorm = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (texto.includes(kwNorm)) score += kwNorm.split(' ').length;
    }
    if (score > maiorScore) { maiorScore = score; melhor = rec; }
  }
  return maiorScore > 0 ? melhor : null;
}

export async function POST(request) {
  try {
    const { descricao, tipo, tema } = await request.json();

    // 1. Mapas do IBGE (prioridade para mapas e infográficos)
    if (tipo === 'mapa' || tipo === 'infográfico') {
      const mapaIBGE = encontrarMapaIBGE(descricao, tema);
      if (mapaIBGE) {
        const result = await baixarImagem(mapaIBGE.url, mapaIBGE.fonte);
        if (result) return Response.json(result);
      }
    }

    // 2. Recursos históricos curados (charges e fotografias)
    if (tipo === 'charge' || tipo === 'fotografia') {
      const rec = encontrarRecursoHistorico(descricao, tema);
      if (rec) {
        const result = await baixarImagem(rec.url, rec.fonte);
        if (result) return Response.json(result);
      }
    }

    // 3. Fallback: Wikimedia Commons com busca via Claude Haiku
    const searchTerm = await gerarTermoBusca(descricao, tipo);
    if (searchTerm) {
      const queries = buildQueries(searchTerm, tipo);
      for (const query of queries) {
        const result = await buscarWikimedia(query);
        if (result) return Response.json(result);
      }
    }

    // 4. Último recurso: busca direta com palavras-chave do tema
    const fallbackQuery = buildFallbackQuery(descricao, tipo);
    if (fallbackQuery) {
      const result = await buscarWikimedia(fallbackQuery);
      if (result) return Response.json(result);
    }

    return Response.json({ found: false });

  } catch (error) {
    console.error('Wikimedia error:', error.message);
    return Response.json({ found: false });
  }
}

async function baixarImagem(url, fonte) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AgenteENEM/1.0 (cursohumanizando.com)' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || 'image/png';
    const mime = contentType.split(';')[0].trim();
    if (!mime.startsWith('image/')) return null;
    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength < 5000) return null;
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { found: true, dataUrl: `data:${mime};base64,${base64}`, mimeType: mime, fonte: fonte || 'Wikimedia Commons' };
  } catch { return null; }
}

async function gerarTermoBusca(descricao, tipo) {
  try {
    const tipoEN = { 'mapa':'map', 'gráfico':'chart graph', 'tabela':'table', 'charge':'political cartoon historical', 'fotografia':'historical photograph', 'infográfico':'infographic' }[tipo] || '';
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 60,
        messages: [{ role: 'user', content: `Convert to Wikimedia Commons search query in English (max 5 words, no quotes). Return ONLY the search terms.\n\nDescription: "${descricao.slice(0,200)}"\nType: ${tipoEN}\n\nSearch query:` }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim().replace(/['"]/g, '').slice(0, 80) || null;
  } catch { return null; }
}

async function buscarWikimedia(query) {
  try {
    const searchUrl = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query', generator: 'search', gsrnamespace: 6,
      gsrsearch: query, gsrlimit: 10, prop: 'imageinfo',
      iiprop: 'url|mime|size', iiurlwidth: 1000, format: 'json', origin: '*',
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
      .filter(info => info?.thumburl && (info.mime === 'image/jpeg' || info.mime === 'image/png') && info.width > 400 && info.height > 300)
      .sort((a, b) => (b.width * b.height) - (a.width * a.height));
    if (candidates.length === 0) return null;
    return await baixarImagem(candidates[0].thumburl, 'Wikimedia Commons');
  } catch { return null; }
}

function buildFallbackQuery(descricao, tipo) {
  const tipoEN = { 'mapa':'map', 'gráfico':'chart', 'tabela':'table', 'charge':'cartoon', 'fotografia':'photograph', 'infográfico':'infographic' }[tipo] || '';
  // Extrai as 3 primeiras palavras significativas da descrição
  const stopwords = new Set(['de','da','do','em','no','na','o','a','os','as','um','uma','com','por','para','que','se','ao','dos','das','um','uma']);
  const palavras = descricao.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ').split(/\s+/)
    .filter(p => p.length > 3 && !stopwords.has(p))
    .slice(0, 3);
  return palavras.length > 0 ? `${palavras.join(' ')} ${tipoEN}`.trim() : null;
}

function buildQueries(searchTerm, tipo) {
  const tipoEN = { 'mapa':'map', 'gráfico':'chart', 'tabela':'table', 'charge':'cartoon', 'fotografia':'photograph', 'infográfico':'infographic' }[tipo] || '';
  const palavras = searchTerm.split(/\s+/).filter(p => p.length > 2);
  const queries = new Set();
  queries.add(searchTerm);
  if (palavras.length > 2) queries.add(palavras.slice(0, 3).join(' ') + ' ' + tipoEN);
  if (palavras.length > 1) queries.add(palavras.slice(0, 2).join(' ') + ' ' + tipoEN);
  if (palavras[0]) queries.add(palavras[0] + ' ' + tipoEN);
  return [...queries].map(q => q.trim()).filter(q => q.length > 2);
}
