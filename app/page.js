"use client";
import { useState, useEffect, useRef } from "react";

// â”€â”€â”€ Dados â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DISCIPLINAS = ["Geografia", "HistÃ³ria", "Filosofia", "Sociologia"];
const NIVEIS = ["FÃ¡cil", "MÃ©dio", "DifÃ­cil"];
const TIPOS_ITEM = [
  "InterpretaÃ§Ã£o de texto",
  "Leitura de dados / grÃ¡fico",
  "AplicaÃ§Ã£o de conceito",
  "AnÃ¡lise de processo histÃ³rico/geogrÃ¡fico",
  "Atualidade contextualizada",
  "Dois textos em diÃ¡logo",
];

// â”€â”€â”€ Matriz de ReferÃªncia Oficial ENEM â€” CiÃªncias Humanas e suas Tecnologias â”€â”€
// Fonte: INEP/MEC â€” H1 a H30 distribuÃ­das por competÃªncia de Ã¡rea
// A matriz Ã© compartilhada por todas as 4 disciplinas; filtramos por afinidade temÃ¡tica.

const HABILIDADES_TODAS = [
  // CompetÃªncia 1 â€” Identidades e cultura
  { id:"H1",  texto:"H1 â€” Interpretar historicamente e/ou geograficamente fontes documentais acerca de aspectos da cultura.", disciplinas:["HistÃ³ria","Sociologia","Filosofia"] },
  { id:"H2",  texto:"H2 â€” Analisar a produÃ§Ã£o da memÃ³ria pelas sociedades humanas.", disciplinas:["HistÃ³ria","Sociologia","Filosofia"] },
  { id:"H3",  texto:"H3 â€” Associar as manifestaÃ§Ãµes culturais do presente aos seus processos histÃ³ricos.", disciplinas:["HistÃ³ria","Sociologia"] },
  { id:"H4",  texto:"H4 â€” Comparar pontos de vista expressos em diferentes fontes sobre determinado aspecto da cultura.", disciplinas:["HistÃ³ria","Filosofia","Sociologia"] },
  { id:"H5",  texto:"H5 â€” Identificar as manifestaÃ§Ãµes ou representaÃ§Ãµes da diversidade do patrimÃ´nio cultural e artÃ­stico em diferentes sociedades.", disciplinas:["HistÃ³ria","Sociologia"] },
  // CompetÃªncia 2 â€” EspaÃ§os geogrÃ¡ficos e poder
  { id:"H6",  texto:"H6 â€” Interpretar diferentes representaÃ§Ãµes grÃ¡ficas e cartogrÃ¡ficas dos espaÃ§os geogrÃ¡ficos.", disciplinas:["Geografia"] },
  { id:"H7",  texto:"H7 â€” Identificar os significados histÃ³rico-geogrÃ¡ficos das relaÃ§Ãµes de poder entre as naÃ§Ãµes.", disciplinas:["Geografia","HistÃ³ria"] },
  { id:"H8",  texto:"H8 â€” Analisar a aÃ§Ã£o dos estados nacionais no que se refere Ã  dinÃ¢mica dos fluxos populacionais e no enfrentamento de problemas de ordem econÃ´mico-social.", disciplinas:["Geografia","HistÃ³ria","Sociologia"] },
  { id:"H9",  texto:"H9 â€” Comparar o significado histÃ³rico-geogrÃ¡fico das organizaÃ§Ãµes polÃ­ticas e socioeconÃ´micas em escala local, regional ou mundial.", disciplinas:["Geografia","HistÃ³ria"] },
  { id:"H10", texto:"H10 â€” Reconhecer a dinÃ¢mica da organizaÃ§Ã£o dos movimentos sociais e a importÃ¢ncia da participaÃ§Ã£o da coletividade na transformaÃ§Ã£o da realidade histÃ³rico-geogrÃ¡fica.", disciplinas:["Sociologia","HistÃ³ria","Geografia"] },
  // CompetÃªncia 3 â€” InstituiÃ§Ãµes sociais, polÃ­ticas e econÃ´micas
  { id:"H11", texto:"H11 â€” Identificar registros de prÃ¡ticas de grupos sociais no tempo e no espaÃ§o.", disciplinas:["HistÃ³ria","Sociologia"] },
  { id:"H12", texto:"H12 â€” Analisar o papel da justiÃ§a como instituiÃ§Ã£o na organizaÃ§Ã£o das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H13", texto:"H13 â€” Analisar a atuaÃ§Ã£o dos movimentos sociais que contribuÃ­ram para mudanÃ§as ou rupturas em processos de disputa pelo poder.", disciplinas:["HistÃ³ria","Sociologia"] },
  { id:"H14", texto:"H14 â€” Comparar diferentes pontos de vista, presentes em textos analÃ­ticos e interpretativos, sobre situaÃ§Ã£o ou fatos de natureza histÃ³rico-geogrÃ¡fica acerca das instituiÃ§Ãµes sociais, polÃ­ticas e econÃ´micas.", disciplinas:["HistÃ³ria","Filosofia","Sociologia"] },
  { id:"H15", texto:"H15 â€” Avaliar criticamente conflitos culturais, sociais, polÃ­ticos, econÃ´micos ou ambientais ao longo da histÃ³ria.", disciplinas:["HistÃ³ria","Sociologia","Filosofia"] },
  // CompetÃªncia 4 â€” TÃ©cnica, tecnologia e produÃ§Ã£o
  { id:"H16", texto:"H16 â€” Identificar registros sobre o papel das tÃ©cnicas e tecnologias na organizaÃ§Ã£o do trabalho e/ou da vida social.", disciplinas:["Sociologia","HistÃ³ria","Geografia"] },
  { id:"H17", texto:"H17 â€” Analisar fatores que explicam o impacto das novas tecnologias no processo de territorializaÃ§Ã£o da produÃ§Ã£o.", disciplinas:["Geografia","Sociologia"] },
  { id:"H18", texto:"H18 â€” Analisar diferentes processos de produÃ§Ã£o ou circulaÃ§Ã£o de riquezas e suas implicaÃ§Ãµes sÃ³cio-espaciais.", disciplinas:["Geografia","Sociologia","HistÃ³ria"] },
  { id:"H19", texto:"H19 â€” Reconhecer as transformaÃ§Ãµes tÃ©cnicas e tecnolÃ³gicas que determinam as vÃ¡rias formas de uso e apropriaÃ§Ã£o dos espaÃ§os rural e urbano.", disciplinas:["Geografia","Sociologia"] },
  { id:"H20", texto:"H20 â€” Selecionar argumentos favorÃ¡veis ou contrÃ¡rios Ã s modificaÃ§Ãµes impostas pelas novas tecnologias Ã  vida social e ao mundo do trabalho.", disciplinas:["Filosofia","Sociologia"] },
  // CompetÃªncia 5 â€” Cidadania e democracia
  { id:"H21", texto:"H21 â€” Identificar o papel dos meios de comunicaÃ§Ã£o na construÃ§Ã£o da vida social.", disciplinas:["Sociologia","Filosofia"] },
  { id:"H22", texto:"H22 â€” Analisar as lutas sociais e conquistas obtidas no que se refere Ã s mudanÃ§as nas legislaÃ§Ãµes ou nas polÃ­ticas pÃºblicas.", disciplinas:["HistÃ³ria","Sociologia"] },
  { id:"H23", texto:"H23 â€” Analisar a importÃ¢ncia dos valores Ã©ticos na estruturaÃ§Ã£o polÃ­tica das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H24", texto:"H24 â€” Relacionar cidadania e democracia na organizaÃ§Ã£o das sociedades.", disciplinas:["Filosofia","Sociologia","HistÃ³ria"] },
  { id:"H25", texto:"H25 â€” Identificar estratÃ©gias que promovam formas de inclusÃ£o social.", disciplinas:["Sociologia","HistÃ³ria"] },
  // CompetÃªncia 6 â€” Sociedade, natureza e ambiente
  { id:"H26", texto:"H26 â€” Identificar em fontes diversas o processo de ocupaÃ§Ã£o dos meios fÃ­sicos e as relaÃ§Ãµes da vida humana com a paisagem.", disciplinas:["Geografia"] },
  { id:"H27", texto:"H27 â€” Analisar de maneira crÃ­tica as interaÃ§Ãµes da sociedade com o meio fÃ­sico, levando em consideraÃ§Ã£o aspectos histÃ³ricos e/ou geogrÃ¡ficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H28", texto:"H28 â€” Relacionar o uso das tecnologias com os impactos sÃ³cio-ambientais em diferentes contextos histÃ³rico-geogrÃ¡ficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H29", texto:"H29 â€” Reconhecer a funÃ§Ã£o dos recursos naturais na produÃ§Ã£o do espaÃ§o geogrÃ¡fico, relacionando-os com as mudanÃ§as provocadas pelas aÃ§Ãµes humanas.", disciplinas:["Geografia"] },
  { id:"H30", texto:"H30 â€” Avaliar as relaÃ§Ãµes entre preservaÃ§Ã£o e degradaÃ§Ã£o da vida no planeta nas diferentes escalas.", disciplinas:["Geografia","Sociologia","HistÃ³ria"] },
];

// Indexado por disciplina para o dropdown
const HABILIDADES = {
  Geografia:  HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Geografia")).map(h => h.texto),
  HistÃ³ria:   HABILIDADES_TODAS.filter(h => h.disciplinas.includes("HistÃ³ria")).map(h => h.texto),
  Filosofia:  HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Filosofia")).map(h => h.texto),
  Sociologia: HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Sociologia")).map(h => h.texto),
};

const COR_DISC = {
  Geografia:  { bg: "rgba(67,232,160,.12)",  border: "#43e8a0", text: "#43e8a0", active: "#43e8a0" },
  HistÃ³ria:   { bg: "rgba(255,101,132,.12)", border: "#ff6584", text: "#ff6584", active: "#ff6584" },
  Filosofia:  { bg: "rgba(108,99,255,.15)",  border: "#6c63ff", text: "#a09cff", active: "#a09cff" },
  Sociologia: { bg: "rgba(255,209,102,.12)", border: "#ffd166", text: "#ffd166", active: "#ffd166" },
};

const NIVEL_COR = {
  FÃ¡cil:   { bg: "rgba(67,232,160,.18)",  border: "#43e8a0", text: "#43e8a0" },
  MÃ©dio:   { bg: "rgba(255,209,102,.18)", border: "#ffd166", text: "#ffd166" },
  DifÃ­cil: { bg: "rgba(255,101,132,.18)", border: "#ff6584", text: "#ff6584" },
};

const TEMPO_MEDIO = {
  FÃ¡cil:   { m: 2, desc: "Leitura direta",      cor: "#43e8a0" },
  MÃ©dio:   { m: 3, desc: "AnÃ¡lise necessÃ¡ria",   cor: "#ffd166" },
  DifÃ­cil: { m: 5, desc: "RaciocÃ­nio complexo",  cor: "#ff6584" },
};

// â”€â”€â”€ Prompt builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildDistribuicao(qtd, niveisSel) {
  const sel = ["FÃ¡cil","MÃ©dio","DifÃ­cil"].filter(n => niveisSel.includes(n));
  const base = Math.floor(qtd / sel.length);
  let resto = qtd % sel.length;
  const dist = [];
  sel.forEach(n => { const q = base + (resto-- > 0 ? 1 : 0); for (let i=0;i<q;i++) dist.push(n); });
  return dist;
}

// Eixos cognitivos oficiais ENEM (comuns a todas as Ã¡reas)
const EIXOS_COGNITIVOS = {
  DL: "I. Dominar linguagens (DL)",
  CF: "II. Compreender fenÃ´menos (CF)",
  SP: "III. Enfrentar situaÃ§Ãµes-problema (SP)",
  CA: "IV. Construir argumentaÃ§Ã£o (CA)",
  EP: "V. Elaborar propostas (EP)",
};

function buildPrompt({ disciplina, niveis, tipoItem, tema, qtd, offset = 0 }) {
  const dist = buildDistribuicao(qtd, niveis);
  const letras = ["A","B","C","D","E"];
  const gabs = Array.from({ length: qtd }, (_, i) => letras[(i + offset) % 5]);
  const lista = dist.map((n, i) => `Q${i+1}: ${n} â€” gabarito: ${gabs[i]}`).join("\n");


  return `VocÃª Ã© um elaborador especialista de itens no padrÃ£o ENEM, CiÃªncias Humanas e suas Tecnologias.

â•â•â• ESPECIFICAÃ‡ÃƒO DO ITEM â•â•â•
Disciplina: ${disciplina}
Tipo de item: ${tipoItem}
Tema/Contexto: ${tema || "livre, adequado Ã  disciplina"}
Quantidade: ${qtd} questÃ£o(Ãµes)

HABILIDADE: vocÃª deve escolher a habilidade mais adequada da Matriz de ReferÃªncia ENEM (H1â€“H30) de CiÃªncias Humanas, com base na disciplina e no tema. Escolha habilidades distintas para cada questÃ£o quando houver mais de uma.

HABILIDADES DISPONÃVEIS PARA ${disciplina}:
${(HABILIDADES[disciplina]||[]).join("\n")}

â•â•â• DISTRIBUIÃ‡ÃƒO OBRIGATÃ“RIA â•â•â•
${lista}

â•â•â• CRITÃ‰RIOS COGNITIVOS POR NÃVEL â•â•â•
ðŸŸ¢ FÃCIL â€” COMPREENSÃƒO (eixo DL/CF)
  â€¢ O candidato identifica ou reconhece informaÃ§Ã£o explÃ­cita no texto-base
  â€¢ Verbo do comando: evidencia / demonstra / caracteriza / tem como objetivo / ilustra
  â€¢ Texto-base: 5â€“7 linhas, linguagem direta, 1 fonte
  â€¢ Distratores: desvios Ã³bvios (inversÃ£o direta, generalizaÃ§Ã£o evidente)

ðŸŸ¡ MÃ‰DIO â€” ANÃLISE (eixo SP/CA)
  â€¢ O candidato relaciona dois elementos ou articula conceito ao contexto apresentado
  â€¢ Verbo do comando: permite reconhecer / contribui para / encontra fundamento / reflete
  â€¢ Texto-base: 7â€“10 linhas, dado ou argumento a ser interpretado
  â€¢ Distratores: plausÃ­veis, eliminados por leitura cuidadosa

ðŸ”´ DIFÃCIL â€” SÃNTESE/AVALIAÃ‡ÃƒO (eixo CA/EP)
  â€¢ O candidato articula dois textos, avalia contradiÃ§Ã£o ou mobiliza conceito nÃ£o explÃ­cito
  â€¢ Verbo do comando: permite inferir / revela a tensÃ£o entre / fundamenta-se na / pressupÃµe
  â€¢ Texto-base: 10â€“12 linhas OU dois textos complementares em diÃ¡logo
  â€¢ Distratores: sofisticados, verdadeiros em parte, eliminados sÃ³ por sÃ­ntese completa

â•â•â• REGRAS OBRIGATÃ“RIAS â•â•â•
1. Texto-base suficiente e necessÃ¡rio â€” sem ele a questÃ£o NÃƒO pode ser respondida
2. PROIBIDO no comando: "segundo o texto" / "de acordo com o texto" / "com base no texto" / "a partir do texto"
3. Alternativas com estrutura nominal paralela, 6â€“20 palavras cada
4. Cada distrator usa exatamente um tipo de desvio distinto:
   generalizaÃ§Ã£o indevida | reduÃ§Ã£o indevida | inversÃ£o de causalidade |
   deslocamento temporal | confusÃ£o conceitual | relaÃ§Ã£o parcial
5. Fonte real com autor e ano (ex: SANTOS, Milton. A Natureza do EspaÃ§o. 2002.)
6. O GABARITO de cada questÃ£o DEVE ser EXATAMENTE a letra indicada na lista acima
7. O campo "nivel" DEVE corresponder ao nÃ­vel da lista acima
8. O campo "habilidade" deve conter o cÃ³digo oficial (ex: "H8") e seu enunciado completo
9. RECURSOS VISUAIS â€” quando o tipo de item for "Leitura de dados / grÃ¡fico" OU quando o tema envolver dados espaciais, estatÃ­sticos ou histÃ³ricos, preencha o campo "recursoVisual" com:
   - tipo: "mapa" | "grÃ¡fico" | "tabela" | "charge" | "fotografia" | "infogrÃ¡fico"
   - descricao: descriÃ§Ã£o detalhada do que a imagem mostraria (ex: "Mapa do Brasil com taxa de desmatamento por estado em 2022")
   - fonteRecurso: fonte real onde o professor pode encontrar ou gerar o recurso (ex: "INPE â€“ inpe.br/queimadas" ou "IBGE â€“ ibge.gov.br/geociencias")
   Se nÃ£o houver recurso visual necessÃ¡rio, deixe "recursoVisual": null

Responda SOMENTE com JSON vÃ¡lido, sem markdown, sem texto antes ou depois:
{"questoes":[{"tema":"","nivel":"FÃ¡cil|MÃ©dio|DifÃ­cil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|grÃ¡fico|tabela|charge|fotografia|infogrÃ¡fico","descricao":"","fonteRecurso":""},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}`;
}

// â”€â”€â”€ CSS Global â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d0d12; --surface: #13131c; --panel: #1a1a26; --card: #1e1e2e;
    --border: #2a2a3e; --border2: #333348;
    --accent: #6c63ff; --accent2: #ff6584; --accent3: #43e8a0; --accent4: #ffd166;
    --text: #f0f0fa; --muted: #6868a0; --label: #9090c0;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: var(--surface); } ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer { 0%,100% { opacity:.6; } 50% { opacity:1; } }
  .fade-up { animation: fadeUp .35s ease both; }
  .spin { animation: spin 1s linear infinite; }
  .shimmer { animation: shimmer 1.4s ease infinite; }

  /* Tabs */
  .tab-btn { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:10px; border:none; background:transparent; color:var(--muted); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:all .18s; }
  .tab-btn.active { background:var(--panel); color:var(--text); border:1.5px solid var(--border2); }
  .tab-btn:not(.active):hover { color:var(--label); }

  /* Chips */
  .chip { padding:7px 16px; border-radius:8px; border:1.5px solid var(--border); background:transparent; color:var(--muted); font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; transition:all .15s; white-space:nowrap; }
  .chip:hover { border-color:var(--border2); color:var(--label); }

  /* Options */
  .opt-btn { width:100%; display:flex; align-items:flex-start; gap:12px; padding:13px 16px; background:var(--card); border:1.5px solid var(--border); border-radius:10px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; text-align:left; cursor:pointer; transition:all .18s; line-height:1.55; }
  .opt-btn:hover:not(:disabled) { border-color:#6c63ff88; background:rgba(108,99,255,.07); }
  .opt-btn.sel { border-color:var(--accent); background:rgba(108,99,255,.12); }
  .opt-btn.ok { border-color:var(--accent3); background:rgba(67,232,160,.1); }
  .opt-btn.err { border-color:var(--accent2); background:rgba(255,101,132,.1); }
  .opt-btn:disabled { cursor:default; }

  /* Select */
  .sel-native { width:100%; background:var(--panel); border:1.5px solid var(--border); border-radius:10px; padding:12px 16px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; cursor:pointer; appearance:none; -webkit-appearance:none; transition:border-color .18s; }
  .sel-native:focus { border-color:var(--accent); }
  .sel-native option { background:#1a1a26; }

  /* Textarea */
  .textarea { width:100%; background:var(--panel); border:1.5px solid var(--border); border-radius:10px; padding:14px 16px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; resize:vertical; min-height:100px; transition:border-color .18s; }
  .textarea:focus { border-color:var(--accent); }
  .textarea::placeholder { color:var(--muted); }

  /* Buttons */
  .btn-gerar { display:flex; align-items:center; gap:10px; padding:14px 28px; background:linear-gradient(135deg,#6c63ff,#9c63ff); border:none; border-radius:12px; color:#fff; font-family:'Syne',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all .2s; }
  .btn-gerar:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(108,99,255,.45); }
  .btn-gerar:disabled { opacity:.5; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn-ghost { background:transparent; border:1.5px solid var(--border); border-radius:8px; color:var(--label); font-family:'DM Sans',sans-serif; font-size:12px; padding:6px 12px; cursor:pointer; transition:all .15s; }
  .btn-ghost:hover { border-color:var(--accent); color:var(--accent); }

  /* Label */
  .field-label { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:2px; color:var(--label); text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .field-label span { color:var(--muted); font-size:10px; letter-spacing:0; text-transform:none; font-family:'DM Sans',sans-serif; }

  /* Progress */
  .prog-bar { height:3px; background:var(--border); border-radius:3px; overflow:hidden; }
  .prog-fill { height:100%; background:linear-gradient(90deg,var(--accent),var(--accent3)); border-radius:3px; transition:width .5s ease; }

  /* Badge pill */
  .pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:999px; font-size:11px; font-family:'DM Mono',monospace; font-weight:500; }
`;

// â”€â”€â”€ Componente: Badge de tempo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BadgeTempo({ nivel }) {
  const t = TEMPO_MEDIO[nivel] || TEMPO_MEDIO.MÃ©dio;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"5px", padding:"4px 10px", background:"var(--panel)", border:`1px solid ${t.cor}33`, borderRadius:"7px" }}>
      <span style={{ fontSize:"11px" }}>â±</span>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:t.cor, fontWeight:600 }}>~{t.m} min</span>
      <span style={{ color:"var(--muted)", fontSize:"10px" }}>Â· {t.desc}</span>
    </div>
  );
}

// â”€â”€â”€ Componente: CartÃ£o de questÃ£o â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CartaoQuestao({ q, idx, total, resp, onResp, rev, onRev }) {
  const nc = NIVEL_COR[q.nivel] || NIVEL_COR.MÃ©dio;
  const dc = COR_DISC[q.area] || COR_DISC.Geografia;
  return (
    <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", overflow:"hidden", marginBottom:"20px" }}>
      {/* Header */}
      <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--panel)", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px" }}>
            {String(idx+1).padStart(2,"0")}
          </div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"14px" }}>
              QuestÃ£o {idx+1} <span style={{ color:"var(--muted)", fontWeight:400, fontSize:"13px" }}>de {total}</span>
            </div>
            <div style={{ fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", marginTop:"1px" }}>{q.tema}</div>
            {q.competencia && <div style={{ fontSize:"10px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", marginTop:"2px", maxWidth:"320px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{q.competencia}</div>}
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap" }}>
          <span className="pill" style={{ background:dc.bg, color:dc.text, border:`1px solid ${dc.border}` }}>{q.area}</span>
          <span className="pill" style={{ background:nc.bg, color:nc.text, border:`1px solid ${nc.border}` }}>{q.nivel}</span>
          <BadgeTempo nivel={q.nivel} />
        </div>
      </div>

      {/* Corpo */}
      <div style={{ padding:"20px" }}>
        {/* Texto base */}
        <div style={{ background:"var(--card)", borderLeft:"3px solid var(--accent)", borderRadius:"0 10px 10px 0", padding:"16px 18px", fontSize:"14px", lineHeight:"1.85", color:"#c0c0e0", fontStyle:"italic", marginBottom:"6px" }}>
          {q.textoBase}
        </div>
        <div style={{ textAlign:"right", fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", marginBottom:"18px" }}>{q.fonte}</div>

        {/* Recurso Visual */}
        {q.recursoVisual && q.recursoVisual.descricao && (
          <div style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"14px 16px", background:"rgba(255,209,102,.07)", border:"1.5px dashed #ffd16688", borderRadius:"10px", marginBottom:"18px" }}>
            <span style={{ fontSize:"22px", flexShrink:0 }}>
              {q.recursoVisual.tipo === "mapa" ? "ðŸ—º" : q.recursoVisual.tipo === "grÃ¡fico" ? "ðŸ“Š" : q.recursoVisual.tipo === "tabela" ? "ðŸ“‹" : q.recursoVisual.tipo === "charge" ? "ðŸŽ¨" : q.recursoVisual.tipo === "fotografia" ? "ðŸ“·" : "ðŸ“Œ"}
            </span>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"#ffd166", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"4px" }}>
                {q.recursoVisual.tipo} sugerido
              </div>
              <div style={{ fontSize:"13px", color:"#e0d090", lineHeight:1.6, marginBottom:"6px" }}>
                {q.recursoVisual.descricao}
              </div>
              {q.recursoVisual.fonteRecurso && (
                <div style={{ fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>
                  ðŸ“Ž Fonte: {q.recursoVisual.fonteRecurso}
                </div>
              )}
            </div>
          </div>
        )}

        <p style={{ fontSize:"15px", fontWeight:600, lineHeight:1.6, marginBottom:"18px", color:"var(--text)" }}>{q.comando}</p>

        {/* Alternativas */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"18px" }}>
          {q.opcoes.map(op => {
            const sel = resp === op.letra, ok = rev && op.correta, err = rev && sel && !op.correta;
            return (
              <button key={op.letra} className={`opt-btn ${sel?"sel":""} ${ok?"ok":""} ${err?"err":""}`} onClick={() => !rev && onResp(op.letra)} disabled={rev}>
                <span style={{ minWidth:"26px", height:"26px", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", background:ok?"#43e8a0":err?"#ff6584":sel?"#6c63ff":"var(--border)", color:(ok||err||sel)?"#0d0d12":"var(--muted)", flexShrink:0 }}>{op.letra}</span>
                <div style={{ flex:1 }}>
                  <span>{op.texto}</span>
                  {rev && <div style={{ marginTop:"5px", fontSize:"12px", color:op.correta?"#43e8a0":"var(--muted)", fontStyle:"italic" }}>{op.correta?"âœ“ Correta â€” ":"âœ— "}{op.explicacao}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* AÃ§Ã£o */}
        {!rev
          ? <button className="btn-ghost" onClick={onRev} disabled={!resp} style={{ opacity:resp?1:.45, padding:"8px 18px", fontSize:"13px" }}>{resp?"Ver gabarito":"Selecione uma alternativa"}</button>
          : <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", background:resp===q.gabarito?"rgba(67,232,160,.08)":"rgba(255,101,132,.08)", border:`1px solid ${resp===q.gabarito?"#43e8a0":"#ff6584"}`, borderRadius:"9px", fontSize:"13px" }}>
              <span style={{ fontSize:"18px" }}>{resp===q.gabarito?"ðŸŽ¯":"ðŸ“š"}</span>
              <span>{resp===q.gabarito?"Resposta correta!":`Incorreta. Gabarito: ${q.gabarito}`}</span>
              <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"2px" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"var(--accent)", fontWeight:600 }}>{q.habilidade?.slice(0,2)}</span>
                {q.eixo && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"var(--muted)" }}>Eixo {q.eixo}</span>}
              </div>
            </div>
        }
      </div>
    </div>
  );
}

// â”€â”€â”€ Prompt de anÃ¡lise de estilo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PROMPT_ANALISE = `Analise este simulado ENEM de CiÃªncias Humanas e extraia as caracterÃ­sticas de estilo.
Responda SOMENTE com JSON vÃ¡lido, sem markdown:
{
  "disciplinas": ["lista das disciplinas identificadas"],
  "habilidades": ["cÃ³digos das habilidades ENEM usadas, ex: H8, H15"],
  "tiposTexto": ["tipos de texto-base: excerto literÃ¡rio, dado estatÃ­stico, mapa, charge, etc."],
  "padraoComandos": "descriÃ§Ã£o do padrÃ£o dos verbos e estrutura dos comandos",
  "complexidadeDistratores": "descriÃ§Ã£o de como os distratores sÃ£o construÃ­dos",
  "temas": ["temas e subtemas recorrentes"],
  "observacoesEstilo": "observaÃ§Ãµes gerais sobre o estilo editorial, tom, extensÃ£o dos textos-base"
}`;

// â”€â”€â”€ App Principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  // Config
  const [modo, setModo]           = useState("avulsa"); // "avulsa" | "simulado"
  const [qtdSimulado, setQtd]     = useState(10);
  const [disciplina, setDisc]     = useState("Sociologia");
  const [niveis, setNiveis]       = useState(["FÃ¡cil"]);
  const [tipoItem, setTipo]       = useState("InterpretaÃ§Ã£o de texto");
  const [tema, setTema]           = useState("");

  // QuestÃµes
  const [questoes, setQuestoes]   = useState([]);
  const [respostas, setResps]     = useState({});
  const [revelados, setRevs]      = useState({});
  const [loading, setLoading]     = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [downloadFeito, setDownloadFeito] = useState(false);
  const [erro, setErro]           = useState("");

  // Estado importador
  const [arquivoImport, setArquivo]     = useState(null); // { nome, tipo, conteudo }
  const [analise, setAnalise]           = useState(null); // resultado da anÃ¡lise do Claude
  const [loadingImport, setLoadImport]  = useState(false);
  const [erroImport, setErroImport]     = useState("");
  const [qtdImport, setQtdImport]       = useState(5);
  const [questoesImport, setQuestoesImport] = useState([]);
  const [downloadFeitoImport, setDownloadFeitoImport] = useState(false);
  const fileInputRef                    = useRef(null);

  // Efeito CSS
  useEffect(() => {
    const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  function toggleNivel(n) {
    setNiveis(prev => {
      if (prev.includes(n)) return prev.length === 1 ? prev : prev.filter(x => x !== n);
      return [...prev, n];
    });
  }

  const totalR = Object.keys(revelados).length;
  const totalA = Object.entries(revelados).filter(([i]) => respostas[i] === questoes[+i]?.gabarito).length;
  const prog   = questoes.length > 0 ? (totalR / questoes.length) * 100 : 0;
  const tempoT = questoes.reduce((a, q) => a + (TEMPO_MEDIO[q.nivel]?.m || 3), 0);

  // â”€â”€ loadScript: carrega lib via CDN e resolve sÃ³ quando window[name] existir â”€â”€
  function loadScript(src, windowKey) {
    return new Promise((resolve, reject) => {
      if (window[windowKey]) { resolve(window[windowKey]); return; }
      const sc = document.createElement("script");
      sc.src = src;
      sc.onload = () => {
        // Aguarda atÃ© o objeto estar disponÃ­vel (algumas libs registram async)
        let tries = 0;
        const check = setInterval(() => {
          if (window[windowKey]) { clearInterval(check); resolve(window[windowKey]); }
          else if (++tries > 40) { clearInterval(check); reject(new Error(`${windowKey} nÃ£o carregou`)); }
        }, 100);
      };
      sc.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
      document.head.appendChild(sc);
    });
  }

  // â”€â”€ Exportar PDF via servidor â”€â”€
  async function exportarPDF(qs, nomeArq) {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questoes: qs }),
    });
    if (!res.ok) throw new Error("Falha ao gerar PDF");
    const html = await res.text();
    const win = window.open("", "_blank");
    if (!win) throw new Error("Popup bloqueado â€” permita popups para este site");
    win.document.write(html);
    win.document.close();
  }

  // â”€â”€ Exportar DOCX via servidor â”€â”€
  async function exportarDOCX(qs, nomeArq) {
    const res = await fetch("/api/docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questoes: qs }),
    });
    if (!res.ok) throw new Error("Falha ao gerar Word");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = nomeArq + ".docx"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // â”€â”€ Exportar PDF via jsPDF (legado, nÃ£o chamado) â”€â”€
  async function exportarPDF_legacy(qs, nomeArq) {
    await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "jspdf"
    );
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"mm", format:"a4" });
    const mL=18, mR=18, mT=20, pw=210-mL-mR;
    let y = mT;

    const linha = (txt="") => {
      doc.setDrawColor(220,218,240);
      doc.line(mL, y, 210-mR, y);
      y += 5;
    };

    const bloco = (txt, size, bold=false, color=[30,30,60], indent=0) => {
      if (!txt) return;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setTextColor(...color);
      const linhas = doc.splitTextToSize(String(txt), pw - indent);
      linhas.forEach(l => {
        if (y > 272) { doc.addPage(); y = mT; }
        doc.text(l, mL + indent, y);
        y += size * 0.42;
      });
      y += 1.5;
    };

    // CabeÃ§alho
    doc.setFillColor(108, 99, 255);
    doc.rect(0, 0, 210, 13, "F");
    doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.setTextColor(255,255,255);
    doc.text("HUMANIZANDO  Â·  AGENTE ELABORADOR ENEM  Â·  CIÃŠNCIAS HUMANAS", mL, 8.5);
    y = mT + 4;

    qs.forEach((q, i) => {
      if (i > 0) { linha(); y += 2; }
      const hab = q.habilidade?.match(/H\d+/)?.[0] || "";
      bloco(`Q${i+1}  Â·  ${(q.nivel||"").toUpperCase()}  Â·  ${hab}`, 8, false, [120,100,220]);
      if (q.tema) bloco(q.tema, 8, false, [110,110,160]);
      y += 1;
      bloco(q.textoBase, 10, false, [45,45,75], 5);
      bloco(q.fonte, 8, false, [130,130,170], 5);
      y += 2;
      bloco(q.comando, 10.5, true, [20,20,50]);
      y += 1;
      (q.opcoes||[]).forEach(op => {
        bloco(`${op.letra})  ${op.texto}`, 10, false, [30,30,60], 3);
      });
    });

    // Gabarito numa pÃ¡gina nova
    doc.addPage(); y = mT;
    bloco("GABARITO", 14, true, [108,99,255]);
    y += 3;
    qs.forEach((q, idx) => {
      const hab = q.habilidade?.match(/H\d+/)?.[0] || "";
      bloco(`${idx+1}.   ${q.gabarito}       ${hab}`, 11, false, [30,30,60]);
    });

    doc.save(nomeArq + ".pdf");
  }

  // (exportarDOCX movida para server-side)
  // â”€â”€ Leitura de arquivo â”€â”€
  async function lerArquivo(file) {
    setErroImport(""); setAnalise(null); setArquivo(null);
    const nome = file.name;
    const tipo = nome.endsWith(".pdf") ? "pdf" : "docx";

    if (tipo === "pdf") {
      // PDF: envia como base64 para a API Claude (suporte nativo)
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      setArquivo({ nome, tipo, base64 });
    } else {
      // DOCX: extrai texto com mammoth (carrega sob demanda)
      const arrayBuffer = await file.arrayBuffer();
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
          "mammoth"
        );
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        setArquivo({ nome, tipo, texto: result.value });
      } catch(e) {
        setErroImport("NÃ£o foi possÃ­vel carregar o leitor de Word. Verifique sua conexÃ£o.");
      }
    }
  }

  // â”€â”€ AnÃ¡lise do simulado importado â”€â”€
  async function analisarSimulado() {
    if (!arquivoImport) return;
    setLoadImport(true); setErroImport(""); setAnalise(null);

    try {
      let messages;

      if (arquivoImport.tipo === "pdf") {
        messages = [{
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "base64", media_type: "application/pdf", data: arquivoImport.base64 }
            },
            {
              type: "text",
              text: PROMPT_ANALISE
            }
          ]
        }];
      } else {
        messages = [{
          role: "user",
          content: PROMPT_ANALISE + "\n\n=== CONTEÃšDO DO SIMULADO ===\n" + arquivoImport.texto
        }];
      }

      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, messages })
      });
      const data = await res.json();
      const txt = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
      setAnalise(parsed);
    } catch(e) {
      setErroImport("NÃ£o foi possÃ­vel analisar o arquivo. Verifique se Ã© um PDF ou Word legÃ­vel.");
      console.error(e);
    } finally {
      setLoadImport(false);
    }
  }

  // â”€â”€ Download TXT â”€â”€
  function downloadTXT(qs) {
    const lines = qs.map(q => {
      const alts = (q.opcoes||[]).map(o => o.letra + ") " + o.texto).join("\n");
      return "QUESTÃƒO " + q.numero + "\n" + (q.textoBase||"") + "\n" + (q.fonte||"") + "\n\n" + (q.comando||"") + "\n\n" + alts + "\n\nGabarito: " + q.gabarito + "\n" + "â”€".repeat(48);
    });
    const txt = lines.join("\n\n");
    const b = new Blob([txt], {type:"text/plain;charset=utf-8"});
    const u = URL.createObjectURL(b);
    const a = document.createElement("a"); a.href=u; a.download="simulado-enem.txt"; a.click();
    URL.revokeObjectURL(u);
  }

  // â”€â”€ Gerar questÃµes (avulsa ou simulado) em lotes de 3 â”€â”€
  async function gerarQuestoes() {
    setErro(""); setLoading(true); setLoadingMsg(""); setQuestoes([]); setResps({}); setRevs({}); setDownloadFeito(false);
    const isSimulado = modo === "simulado";
    const qtd = isSimulado ? qtdSimulado : 1;
    let qs = [];
    const LOTE = isSimulado ? 3 : 1;
    const totalLotes = Math.ceil(qtd / LOTE);
    try {
      for (let lote = 0; lote < totalLotes; lote++) {
        const offset = lote * LOTE;
        const qtdLote = Math.min(LOTE, qtd - offset);
        setLoadingMsg("Gerando questÃµes " + (offset+1) + (qtdLote > 1 ? "â€“" + (offset+qtdLote) : "") + " de " + qtd + "...");
        const res = await fetch("/api/gerar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            messages: [{ role: "user", content: buildPrompt({ disciplina, niveis, tipoItem, tema, qtd: qtdLote, offset }) }],
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        const txt = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
        const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
        qs.push(...parsed.questoes);
      }
      qs = qs.map((q, i) => ({ ...q, numero: i+1, area: disciplina }));
    } catch(e) {
      setErro("Erro ao gerar questÃµes: " + e.message);
      setLoadingMsg(""); setLoading(false); return;
    }

    if (!isSimulado) {
      setQuestoes(qs); setLoadingMsg(""); setLoading(false); return;
    }

    setQuestoes(qs);
    const nomeArq = "simulado-enem-" + new Date().toISOString().slice(0,10);
    const errosExport = [];
    try { setLoadingMsg("Gerando PDF..."); await exportarPDF(qs, nomeArq); } catch(e) { errosExport.push("PDF"); }
    try { setLoadingMsg("Gerando Word..."); await exportarDOCX(qs, nomeArq); } catch(e) { errosExport.push("Word"); }
    setLoadingMsg(""); setLoading(false); setDownloadFeito(true);
    if (errosExport.length > 0) setErro("NÃ£o foi possÃ­vel gerar automaticamente: " + errosExport.join(", ") + ". Use os botÃµes abaixo.");
  }

  // â”€â”€ Gerar questÃµes no estilo do simulado importado (em lotes de 3) â”€â”€
  async function gerarNoEstilo() {
    if (!analise) return;
    setErro(""); setLoading(true); setQuestoes([]); setResps({}); setRevs({});

    const disc = analise.disciplinas?.[0] || "Geografia";
    const letras = ["A","B","C","D","E"];
    const nivelCiclo = ["FÃ¡cil","MÃ©dio","DifÃ­cil"];
    const LOTE = 3; // mÃ¡ximo por chamada para nÃ£o estourar timeout
    const totalLotes = Math.ceil(qtdImport / LOTE);
    const todasQuestoes = [];

    function buildPromptLote(offset, qtdLote) {
      const gabs = Array.from({ length: qtdLote }, (_, i) => letras[(offset + i) % 5]);
      const niveis = Array.from({ length: qtdLote }, (_, i) => nivelCiclo[(offset + i) % 3]);
      const lista = niveis.map((n, i) => "Q" + (i+1) + ": " + n + " â€” gabarito: " + gabs[i]).join("\n");
      return "VocÃª Ã© elaborador ENEM. Gere EXATAMENTE " + qtdLote + " questÃ£o(Ãµes) novas no estilo abaixo.\n\n" +
        "DISCIPLINAS: " + analise.disciplinas?.join(", ") + "\n" +
        "HABILIDADES: " + analise.habilidades?.join(", ") + "\n" +
        "TIPOS DE TEXTO: " + analise.tiposTexto?.join(", ") + "\n" +
        "COMANDOS: " + analise.padraoComandos + "\n" +
        "DISTRATORES: " + analise.complexidadeDistratores + "\n" +
        "TEMAS: " + analise.temas?.join(", ") + "\n" +
        "ESTILO: " + analise.observacoesEstilo + "\n\n" +
        "DISTRIBUIÃ‡ÃƒO:\n" + lista + "\n\n" +
        "REGRAS: texto-base necessÃ¡rio, sem 'segundo o texto', alternativas paralelas (6-20 palavras), distratores distintos, fonte real com ano, gabarito exato da lista.\n\n" +
        "RECURSO VISUAL: quando necessÃ¡rio, preencha recursoVisual com tipo, descricao e fonteRecurso (URL/publicaÃ§Ã£o real onde encontrar). Se nÃ£o houver, use null.\n\n" +
        "Responda SOMENTE JSON vÃ¡lido sem markdown:\n" +
        '{"questoes":[{"tema":"","nivel":"FÃ¡cil|MÃ©dio|DifÃ­cil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|grÃ¡fico|tabela|charge|fotografia|infogrÃ¡fico","descricao":"","fonteRecurso":""},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}';
    }

    try {
      for (let lote = 0; lote < totalLotes; lote++) {
        const offset = lote * LOTE;
        const qtdLote = Math.min(LOTE, qtdImport - offset);
        setLoadingMsg("Gerando questÃµes " + (offset+1) + "â€“" + (offset+qtdLote) + " de " + qtdImport + "...");

        const res = await fetch("/api/gerar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            messages: [{ role: "user", content: buildPromptLote(offset, qtdLote) }]
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        const txt = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
        const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
        todasQuestoes.push(...parsed.questoes);
      }

      const qs = todasQuestoes.map((q, i) => ({ ...q, numero: i+1, area: disc }));
      setQuestoes(qs);
      setQuestoesImport(qs);
      setLoadingMsg("");
      setDownloadFeitoImport(true);

      // Tentar download automÃ¡tico
      const nomeArq = "simulado-enem-" + new Date().toISOString().slice(0,10);
      try { await exportarPDF(qs, nomeArq); } catch(e) { console.warn("PDF:", e.message); }
      try { await exportarDOCX(qs, nomeArq); } catch(e) { console.warn("DOCX:", e.message); }

    } catch(e) {
      setErro("Erro ao gerar questÃµes: " + e.message);
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  // â”€â”€ Render â”€â”€
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>

      {/* â”€â”€ Header â”€â”€ */}
      <header style={{ background:"var(--surface)", borderBottom:"1px solid var(--border)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"60px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
          <div style={{ width:"36px", height:"36px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px", color:"#fff", letterSpacing:"-1px" }}>CH</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"var(--text)", letterSpacing:"-0.3px" }}>Humanizando</div>
            <div style={{ fontSize:"10px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", letterSpacing:"1.5px" }}>AGENTE ELABORADOR ENEM</div>
          </div>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"var(--muted)", letterSpacing:"2px" }}>CIÃŠNCIAS HUMANAS Â· ENEM</div>
      </header>

      {/* â”€â”€ ConteÃºdo â”€â”€ */}
      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"32px 24px" }}>

        {/* â”€â”€ Tabs â”€â”€ */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"28px", borderBottom:"1px solid var(--border)", paddingBottom:"0" }}>
          <button className={`tab-btn ${modo==="avulsa"?"active":""}`} onClick={() => { setModo("avulsa"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="avulsa"?"2px solid var(--accent)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"15px" }}>âœ¦</span> QuestÃ£o avulsa
          </button>
          <button className={`tab-btn ${modo==="simulado"?"active":""}`} onClick={() => { setModo("simulado"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="simulado"?"2px solid var(--accent)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"13px" }}>âŠž</span> Modo Simulado
          </button>
          <button className={`tab-btn ${modo==="importar"?"active":""}`} onClick={() => { setModo("importar"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="importar"?"2px solid var(--accent4)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"13px" }}>â¬†</span> Importar Simulado
          </button>
          {modo === "simulado" && (
            <div style={{ marginLeft:"8px", display:"flex", alignItems:"center", gap:"6px" }}>
              {[5,10,15].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)" } : {}}>
                  {n} questÃµes
                </button>
              ))}
            </div>
          )}
        </div>

        {/* â”€â”€ Painel Importar â”€â”€ */}
        {modo === "importar" && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#ffd166,#ffaa00)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px", color:"#0d0d12" }}>â¬†</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Importar simulado de referÃªncia</div>
                <div style={{ fontSize:"12px", color:"var(--muted)", marginTop:"2px" }}>PDF ou Word (.docx) â€” o agente analisa o estilo e gera novas questÃµes na mesma linha</div>
              </div>
            </div>

            {/* Drop zone */}
            {!arquivoImport ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor="#ffd166"; e.currentTarget.style.background="rgba(255,209,102,.06)"; }}
                onDragLeave={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.background="transparent"; }}
                onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.background="transparent"; const f=e.dataTransfer.files[0]; if(f) lerArquivo(f); }}
                style={{ border:"2px dashed var(--border2)", borderRadius:"12px", padding:"48px 24px", textAlign:"center", cursor:"pointer", transition:"all .2s" }}
              >
                <div style={{ fontSize:"36px", marginBottom:"12px" }}>ðŸ“„</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"15px", marginBottom:"6px" }}>Arraste o arquivo aqui</div>
                <div style={{ fontSize:"13px", color:"var(--muted)", marginBottom:"16px" }}>ou clique para selecionar</div>
                <div style={{ display:"flex", justifyContent:"center", gap:"8px" }}>
                  <span className="pill" style={{ background:"rgba(255,101,132,.1)", color:"#ff6584", border:"1px solid #ff658433" }}>PDF</span>
                  <span className="pill" style={{ background:"rgba(108,99,255,.1)", color:"#a09cff", border:"1px solid #6c63ff33" }}>Word .docx</span>
                </div>
                <input ref={fileInputRef} type="file" accept=".pdf,.docx" style={{ display:"none" }}
                  onChange={e => { const f=e.target.files[0]; if(f) lerArquivo(f); e.target.value=""; }} />
              </div>
            ) : (
              <div>
                {/* Arquivo carregado */}
                <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", background:"var(--panel)", border:"1.5px solid var(--border2)", borderRadius:"10px", marginBottom:"20px" }}>
                  <span style={{ fontSize:"22px" }}>{arquivoImport.tipo==="pdf"?"ðŸ“•":"ðŸ“˜"}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:"14px" }}>{arquivoImport.nome}</div>
                    <div style={{ fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>{arquivoImport.tipo.toUpperCase()} Â· pronto para anÃ¡lise</div>
                  </div>
                  <button className="btn-ghost" style={{ fontSize:"12px" }} onClick={() => { setArquivo(null); setAnalise(null); setErroImport(""); }}>âœ• Remover</button>
                </div>

                {/* Resultado da anÃ¡lise */}
                {analise && (
                  <div className="fade-up" style={{ background:"var(--panel)", border:"1.5px solid #ffd16644", borderRadius:"12px", padding:"18px", marginBottom:"20px" }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"#ffd166", letterSpacing:"2px", marginBottom:"14px" }}>ANÃLISE DO ESTILO</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", fontSize:"13px" }}>
                      <div>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>DISCIPLINAS</div>
                        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                          {analise.disciplinas?.map(d => <span key={d} className="pill" style={{ background:COR_DISC[d]?.bg||"var(--card)", color:COR_DISC[d]?.text||"var(--label)", border:`1px solid ${COR_DISC[d]?.border||"var(--border)"}` }}>{d}</span>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>HABILIDADES</div>
                        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                          {analise.habilidades?.map(h => <span key={h} className="pill" style={{ background:"rgba(108,99,255,.1)", color:"#a09cff", border:"1px solid #6c63ff33" }}>{h}</span>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>TIPOS DE TEXTO</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.tiposTexto?.join(", ")}</div>
                      </div>
                      <div>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>TEMAS</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.temas?.join(", ")}</div>
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>PADRÃƒO DOS COMANDOS</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.padraoComandos}</div>
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>ESTILO GERAL</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.observacoesEstilo}</div>
                      </div>
                    </div>

                    {/* Qtd + Gerar */}
                    <div style={{ marginTop:"20px", paddingTop:"16px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
                      <div style={{ color:"var(--muted)", fontSize:"13px" }}>Gerar</div>
                      {[3,5,10,15].map(n => (
                        <button key={n} className="chip" onClick={() => setQtdImport(n)}
                          style={qtdImport===n ? { borderColor:"#ffd166", background:"rgba(255,209,102,.15)", color:"#ffd166" } : {}}>
                          {n} questÃµes
                        </button>
                      ))}
                      {!downloadFeitoImport && (
                        <button className="btn-gerar" onClick={gerarNoEstilo} disabled={loading}
                          style={{ marginLeft:"auto", background:"linear-gradient(135deg,#ffd166,#ffaa00)", color:"#0d0d12" }}>
                          {loading ? <><span className="spin" style={{ display:"inline-block" }}>âŸ³</span> {loadingMsg || "Gerando..."}</>
                            : <><span>âœ¦</span> Gerar no mesmo estilo</>}
                        </button>
                      )}
                    </div>

                    {/* Painel de download pÃ³s-geraÃ§Ã£o */}
                    {downloadFeitoImport && (
                      <div className="fade-up" style={{ marginTop:"20px", padding:"20px", background:"var(--panel)", border:"1.5px solid #43e8a044", borderRadius:"12px", textAlign:"center" }}>
                        <div style={{ fontSize:"36px", marginBottom:"10px" }}>âœ…</div>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", marginBottom:"6px" }}>
                          {questoesImport.length} questÃµes geradas no estilo do seu simulado!
                        </div>
                        <div style={{ fontSize:"12px", color:"var(--muted)", marginBottom:"18px" }}>
                          Downloads automÃ¡ticos disparados. Se nÃ£o apareceram, use os botÃµes abaixo:
                        </div>
                        <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap", marginBottom:"14px" }}>
                          <button className="btn-gerar"
                            style={{ fontSize:"13px", padding:"10px 18px", background:"linear-gradient(135deg,#ff6584,#cc4466)" }}
                            onClick={async () => {
                              const nome = "simulado-enem-" + new Date().toISOString().slice(0,10);
                              try { await exportarPDF(questoesImport, nome); } catch(e) { alert("PDF: " + e.message); }
                            }}>
                            â¬‡ Baixar PDF
                          </button>
                          <button className="btn-gerar"
                            style={{ fontSize:"13px", padding:"10px 18px", background:"linear-gradient(135deg,#43e8a0,#22aa70)", color:"#0d0d12" }}
                            onClick={async () => {
                              const nome = "simulado-enem-" + new Date().toISOString().slice(0,10);
                              try { await exportarDOCX(questoesImport, nome); } catch(e) { alert("Word: " + e.message); }
                            }}>
                            â¬‡ Baixar Word
                          </button>
                          <button className="btn-ghost" style={{ fontSize:"13px", padding:"10px 16px" }}
                            onClick={() => downloadTXT(questoesImport)}>
                            â¬‡ TXT
                          </button>
                        </div>
                        <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
                          <button className="btn-ghost" onClick={() => { setDownloadFeitoImport(false); setQuestoesImport([]); }}>
                            â†º Gerar novo simulado
                          </button>
                          <button className="btn-ghost" onClick={() => setModo("avulsa")} style={{ color:"var(--accent)" }}>
                            ðŸ‘ Ver questÃµes na tela
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Erro importaÃ§Ã£o */}
                {erroImport && <div style={{ padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", marginBottom:"16px" }}>{erroImport}</div>}

                {/* BotÃ£o analisar */}
                {!analise && !loadingImport && (
                  <button className="btn-gerar" onClick={analisarSimulado}
                    style={{ background:"linear-gradient(135deg,#ffd166,#ffaa00)", color:"#0d0d12" }}>
                    <span>ðŸ”</span> Analisar estilo do simulado
                  </button>
                )}
                {loadingImport && (
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", color:"var(--muted)", fontSize:"13px" }}>
                    <span className="spin" style={{ display:"inline-block", fontSize:"18px" }}>âŸ³</span>
                    Analisando o simulado...
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* â”€â”€ FormulÃ¡rio â€” apenas questÃ£o avulsa â”€â”€ */}
        {modo === "avulsa" && (
          <div style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }} className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px" }}>01</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Configure a questÃ£o</div>
            </div>

            {/* Ãrea + NÃ­vel */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"28px", marginBottom:"24px" }}>
              <div>
                <div className="field-label">Ãrea</div>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {DISCIPLINAS.map(d => {
                    const c = COR_DISC[d]; const ativo = disciplina === d;
                    return (
                      <button key={d} className="chip" onClick={() => setDisc(d)}
                        style={ativo ? { borderColor:c.border, background:c.bg, color:c.text } : {}}>
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="field-label">NÃ­vel</div>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {NIVEIS.map(n => {
                    const c = NIVEL_COR[n]; const ativo = niveis.includes(n);
                    return (
                      <button key={n} className="chip" onClick={() => toggleNivel(n)}
                        style={ativo ? { borderColor:c.border, background:c.bg, color:c.text, fontWeight:600 } : {}}>
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tipo de Item */}
            <div style={{ marginBottom:"22px" }}>
              <div className="field-label">Tipo de Item</div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {TIPOS_ITEM.map(t => (
                  <button key={t} className="chip" onClick={() => setTipo(t)}
                    style={tipoItem===t ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)" } : {}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tema */}
            <div style={{ marginBottom:"26px" }}>
              <div className="field-label">Tema / Contexto <span>â€” descreva o assunto que deve embasar a questÃ£o</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)} placeholder="Ex: desmatamento na AmazÃ´nia, transiÃ§Ã£o energÃ©tica, filosofia estoica..." rows={3} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584" }}>{erro}</div>}

            <button className="btn-gerar" onClick={gerarQuestoes} disabled={loading}>
              {loading
                ? <><span className="spin" style={{ display:"inline-block", fontSize:"16px" }}>âŸ³</span> Gerando...</>
                : <><span style={{ fontSize:"16px" }}>âœ¦</span> Gerar questÃ£o</>
              }
            </button>
          </div>
        )}

        {/* â”€â”€ Modo Simulado â€” painel direto â”€â”€ */}
        {modo === "simulado" && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"36px 28px", marginBottom:"28px", textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"16px" }}>âŠž</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"22px", marginBottom:"8px" }}>
              Gerar simulado completo
            </div>
            <div style={{ fontSize:"14px", color:"var(--muted)", marginBottom:"28px" }}>
              DistribuiÃ§Ã£o automÃ¡tica: 1/3 FÃ¡cil Â· 1/3 MÃ©dio Â· 1/3 DifÃ­cil<br/>
              Habilidades e disciplinas variadas Â· Gabaritos equilibrados
            </div>

            {/* Qtd */}
            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"28px" }}>
              {[5,10,15].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={{ padding:"10px 22px", fontSize:"14px", ...(qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)", fontWeight:600 } : {}) }}>
                  {n} questÃµes
                </button>
              ))}
            </div>

            {/* Tema opcional */}
            <div style={{ maxWidth:"480px", margin:"0 auto 28px", textAlign:"left" }}>
              <div className="field-label" style={{ marginBottom:"8px" }}>Tema <span>â€” opcional, deixe em branco para sortear</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)}
                placeholder="Ex: globalizaÃ§Ã£o, movimentos sociais, filosofia polÃ­tica..." rows={2} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", textAlign:"left", maxWidth:"480px", margin:"0 auto 16px" }}>{erro}</div>}

            {downloadFeito ? (
              <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
                <div style={{ fontSize:"48px" }}>âœ…</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px" }}>
                  Simulado gerado!
                </div>
                <div style={{ fontSize:"13px", color:"var(--muted)", marginBottom:"4px" }}>
                  PDF e Word baixados automaticamente. Se nÃ£o apareceram, use os botÃµes abaixo:
                </div>

                {/* BotÃµes de download manual â€” sempre funcionam */}
                <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center" }}>
                  <button className="btn-gerar" style={{ fontSize:"13px", padding:"11px 20px", background:"linear-gradient(135deg,#ff6584,#cc4466)" }}
                    onClick={async () => { try { await exportarPDF(questoes, `simulado-enem-${new Date().toISOString().slice(0,10)}`); } catch(e) { alert("PDF falhou: " + e.message); } }}>
                    â¬‡ Baixar PDF
                  </button>
                  <button className="btn-gerar" style={{ fontSize:"13px", padding:"11px 20px", background:"linear-gradient(135deg,#43e8a0,#22aa70)", color:"#0d0d12" }}
                    onClick={async () => { try { await exportarDOCX(questoes, `simulado-enem-${new Date().toISOString().slice(0,10)}`); } catch(e) { alert("Word falhou: " + e.message); } }}>
                    â¬‡ Baixar Word
                  </button>
                  <button className="btn-ghost" style={{ fontSize:"13px", padding:"11px 18px" }}
                    onClick={() => { downloadTXT(questoes); }}>
                    â¬‡ TXT
                  </button>
                </div>

                {erro && <div style={{ padding:"8px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"12px", color:"#ff6584", maxWidth:"440px" }}>{erro}</div>}

                <button className="btn-ghost" style={{ marginTop:"8px" }} onClick={() => { setDownloadFeito(false); setTema(""); setErro(""); setQuestoes([]); }}>
                  â†º Gerar outro simulado
                </button>
              </div>
            ) : (
              <button className="btn-gerar" onClick={gerarQuestoes} disabled={loading}
                style={{ margin:"0 auto", fontSize:"16px", padding:"16px 36px" }}>
                {loading
                  ? <><span className="spin" style={{ display:"inline-block", fontSize:"16px" }}>âŸ³</span> {loadingMsg || "Gerando questÃµes..."}</>
                  : <><span style={{ fontSize:"18px" }}>âŠž</span> Gerar simulado ({qtdSimulado} questÃµes)</>
                }
              </button>
            )}
          </div>
        )}

        {/* â”€â”€ Barra de progresso â”€â”€ */}
        {questoes.length > 0 && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"14px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px", fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>
                <span>PROGRESSO</span>
                <span>{totalR}/{questoes.length} respondidas Â· {totalA} acertos Â· ~{tempoT} min estimados</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{ width:`${prog}%` }} /></div>
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
              <button className="btn-ghost" onClick={() => downloadTXT(questoes)}>â¬‡ TXT</button>
              <button className="btn-ghost" onClick={() => {
                const b=new Blob([JSON.stringify({questoes},null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="simulado-enem.json";a.click();URL.revokeObjectURL(u);
              }}>â¬‡ JSON</button>
            </div>
          </div>
        )}

        {/* â”€â”€ QuestÃµes â”€â”€ */}
        {questoes.map((q, i) => (
          <CartaoQuestao key={i} q={q} idx={i} total={questoes.length}
            resp={respostas[i]} onResp={l => setResps(r => ({...r,[i]:l}))}
            rev={!!revelados[i]} onRev={() => setRevs(r => ({...r,[i]:true}))} />
        ))}

        {/* â”€â”€ Resultado final â”€â”€ */}
        {questoes.length > 0 && totalR === questoes.length && (
          <div className="fade-up" style={{ background:"var(--surface)", border:`2px solid ${totalA/questoes.length>=0.7?"#43e8a0":"#ffd166"}`, borderRadius:"16px", padding:"36px", textAlign:"center", marginBottom:"20px" }}>
            <div style={{ fontSize:"52px", marginBottom:"14px" }}>{totalA/questoes.length>=0.7?"ðŸ†":totalA/questoes.length>=0.5?"ðŸ“š":"ðŸ’ª"}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"26px", fontWeight:800, marginBottom:"8px" }}>{totalA} de {questoes.length} corretas</div>
            <div style={{ fontSize:"14px", color:"var(--muted)", marginBottom:"24px" }}>{Math.round((totalA/questoes.length)*100)}% de aproveitamento</div>
            <button className="btn-gerar" onClick={gerarQuestoes} style={{ margin:"0 auto" }}>
              <span>âœ¦</span> Gerar novo simulado
            </button>
          </div>
        )}

        {/* â”€â”€ Loading state â”€â”€ */}
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 20px", gap:"16px" }}>
            <div style={{ width:"42px", height:"42px", border:"3px solid var(--border)", borderTop:"3px solid var(--accent)", borderRadius:"50%" }} className="spin" />
            <div style={{ color:"var(--muted)", fontFamily:"'DM Mono',monospace", fontSize:"12px", letterSpacing:"1px" }}>GERANDO VIA IA...</div>
          </div>
        )}

      </main>
    </div>
  );
}
