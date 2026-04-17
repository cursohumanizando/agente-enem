"use client";
import React, { useState, useEffect, useRef } from "react";

// ─── Dados ────────────────────────────────────────────────────────────────────
const DISCIPLINAS = ["Geografia", "História", "Filosofia", "Sociologia"];
const NIVEIS = ["Fácil", "Médio", "Difícil"];
const TIPOS_ITEM = [
  "Interpretação de texto",
  "Leitura de dados / gráfico",
  "Aplicação de conceito",
  "Análise de processo histórico/geográfico",
  "Atualidade contextualizada",
  "Dois textos em diálogo",
];

const HABILIDADES_TODAS = [
  { id:"H1",  texto:"H1 — Interpretar historicamente e/ou geograficamente fontes documentais acerca de aspectos da cultura.", disciplinas:["História","Sociologia","Filosofia"] },
  { id:"H2",  texto:"H2 — Analisar a produção da memória pelas sociedades humanas.", disciplinas:["História","Sociologia","Filosofia"] },
  { id:"H3",  texto:"H3 — Associar as manifestações culturais do presente aos seus processos históricos.", disciplinas:["História","Sociologia"] },
  { id:"H4",  texto:"H4 — Comparar pontos de vista expressos em diferentes fontes sobre determinado aspecto da cultura.", disciplinas:["História","Filosofia","Sociologia"] },
  { id:"H5",  texto:"H5 — Identificar as manifestações ou representações da diversidade do patrimônio cultural e artístico em diferentes sociedades.", disciplinas:["História","Sociologia"] },
  { id:"H6",  texto:"H6 — Interpretar diferentes representações gráficas e cartográficas dos espaços geográficos.", disciplinas:["Geografia"] },
  { id:"H7",  texto:"H7 — Identificar os significados histórico-geográficos das relações de poder entre as nações.", disciplinas:["Geografia","História"] },
  { id:"H8",  texto:"H8 — Analisar a ação dos estados nacionais no que se refere à dinâmica dos fluxos populacionais e no enfrentamento de problemas de ordem econômico-social.", disciplinas:["Geografia","História","Sociologia"] },
  { id:"H9",  texto:"H9 — Comparar o significado histórico-geográfico das organizações políticas e socioeconômicas em escala local, regional ou mundial.", disciplinas:["Geografia","História"] },
  { id:"H10", texto:"H10 — Reconhecer a dinâmica da organização dos movimentos sociais e a importância da participação da coletividade na transformação da realidade histórico-geográfica.", disciplinas:["Sociologia","História","Geografia"] },
  { id:"H11", texto:"H11 — Identificar registros de práticas de grupos sociais no tempo e no espaço.", disciplinas:["História","Sociologia"] },
  { id:"H12", texto:"H12 — Analisar o papel da justiça como instituição na organização das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H13", texto:"H13 — Analisar a atuação dos movimentos sociais que contribuíram para mudanças ou rupturas em processos de disputa pelo poder.", disciplinas:["História","Sociologia"] },
  { id:"H14", texto:"H14 — Comparar diferentes pontos de vista, presentes em textos analíticos e interpretativos, sobre situação ou fatos de natureza histórico-geográfica acerca das instituições sociais, políticas e econômicas.", disciplinas:["História","Filosofia","Sociologia"] },
  { id:"H15", texto:"H15 — Avaliar criticamente conflitos culturais, sociais, políticos, econômicos ou ambientais ao longo da história.", disciplinas:["História","Sociologia","Filosofia"] },
  { id:"H16", texto:"H16 — Identificar registros sobre o papel das técnicas e tecnologias na organização do trabalho e/ou da vida social.", disciplinas:["Sociologia","História","Geografia"] },
  { id:"H17", texto:"H17 — Analisar fatores que explicam o impacto das novas tecnologias no processo de territorialização da produção.", disciplinas:["Geografia","Sociologia"] },
  { id:"H18", texto:"H18 — Analisar diferentes processos de produção ou circulação de riquezas e suas implicações sócio-espaciais.", disciplinas:["Geografia","Sociologia","História"] },
  { id:"H19", texto:"H19 — Reconhecer as transformações técnicas e tecnológicas que determinam as várias formas de uso e apropriação dos espaços rural e urbano.", disciplinas:["Geografia","Sociologia"] },
  { id:"H20", texto:"H20 — Selecionar argumentos favoráveis ou contrários às modificações impostas pelas novas tecnologias à vida social e ao mundo do trabalho.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H21", texto:"H21 — Identificar o papel dos meios de comunicação na construção da vida social.", disciplinas:["Sociologia","Filosofia"] },
  { id:"H22", texto:"H22 — Analisar as lutas sociais e conquistas obtidas no que se refere às mudanças nas legislações ou nas políticas públicas.", disciplinas:["História","Sociologia"] },
  { id:"H23", texto:"H23 — Analisar a importância dos valores éticos na estruturação política das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H24", texto:"H24 — Relacionar cidadania e democracia na organização das sociedades.", disciplinas:["Filosofia","Sociologia","História"] },
  { id:"H25", texto:"H25 — Identificar estratégias que promovam formas de inclusão social.", disciplinas:["Sociologia","História"] },
  { id:"H26", texto:"H26 — Identificar em fontes diversas o processo de ocupação dos meios físicos e as relações da vida humana com a paisagem.", disciplinas:["Geografia"] },
  { id:"H27", texto:"H27 — Analisar de maneira crítica as interações da sociedade com o meio físico, levando em consideração aspectos históricos e/ou geográficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H28", texto:"H28 — Relacionar o uso das tecnologias com os impactos sócio-ambientais em diferentes contextos histórico-geográficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H29", texto:"H29 — Reconhecer a função dos recursos naturais na produção do espaço geográfico, relacionando-os com as mudanças provocadas pelas ações humanas.", disciplinas:["Geografia"] },
  { id:"H30", texto:"H30 — Avaliar as relações entre preservação e degradação da vida no planeta nas diferentes escalas.", disciplinas:["Geografia","Sociologia","História"] },
];

const HABILIDADES = {
  Geografia:  HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Geografia")).map(h => h.texto),
  História:   HABILIDADES_TODAS.filter(h => h.disciplinas.includes("História")).map(h => h.texto),
  Filosofia:  HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Filosofia")).map(h => h.texto),
  Sociologia: HABILIDADES_TODAS.filter(h => h.disciplinas.includes("Sociologia")).map(h => h.texto),
};

const COR_DISC = {
  Geografia:  { bg: "rgba(67,232,160,.12)",  border: "#43e8a0", text: "#43e8a0", active: "#43e8a0" },
  História:   { bg: "rgba(255,101,132,.12)", border: "#ff6584", text: "#ff6584", active: "#ff6584" },
  Filosofia:  { bg: "rgba(108,99,255,.15)",  border: "#6c63ff", text: "#a09cff", active: "#a09cff" },
  Sociologia: { bg: "rgba(255,209,102,.12)", border: "#ffd166", text: "#ffd166", active: "#ffd166" },
};

const NIVEL_COR = {
  Fácil:   { bg: "rgba(67,232,160,.18)",  border: "#43e8a0", text: "#43e8a0" },
  Médio:   { bg: "rgba(255,209,102,.18)", border: "#ffd166", text: "#ffd166" },
  Difícil: { bg: "rgba(255,101,132,.18)", border: "#ff6584", text: "#ff6584" },
};

const TEMPO_MEDIO = {
  Fácil:   { m: 2, desc: "Leitura direta",      cor: "#43e8a0" },
  Médio:   { m: 3, desc: "Análise necessária",   cor: "#ffd166" },
  Difícil: { m: 5, desc: "Raciocínio complexo",  cor: "#ff6584" },
};

function buildDistribuicao(qtd, niveisSel) {
  const sel = ["Fácil","Médio","Difícil"].filter(n => niveisSel.includes(n));
  const base = Math.floor(qtd / sel.length);
  let resto = qtd % sel.length;
  const dist = [];
  sel.forEach(n => { const q = base + (resto-- > 0 ? 1 : 0); for (let i=0;i<q;i++) dist.push(n); });
  return dist;
}

const EIXOS_COGNITIVOS = {
  DL: "I. Dominar linguagens (DL)",
  CF: "II. Compreender fenômenos (CF)",
  SP: "III. Enfrentar situações-problema (SP)",
  CA: "IV. Construir argumentação (CA)",
  EP: "V. Elaborar propostas (EP)",
};

function buildPrompt({ disciplina, niveis, tipoItem, tema, qtd, offset = 0 }) {
  const discArr = Array.isArray(disciplina) ? disciplina : [disciplina];
  const tipoArr = Array.isArray(tipoItem) ? tipoItem : [tipoItem];
  const dist = buildDistribuicao(qtd, niveis);
  const letras = ["A","B","C","D","E"];
  const gabs = Array.from({ length: qtd }, (_, i) => letras[(i + offset) % 5]);
  const listaDisc = dist.map((n, i) => discArr[i % discArr.length]);
  const listaTipo = dist.map((n, i) => tipoArr[i % tipoArr.length]);
  const lista = dist.map((n, i) => {
    const temRecurso = listaTipo[i] === "Leitura de dados / gráfico" || i % 3 === 1;
    return "Q"+(i+1)+": "+n+" — disciplina: "+listaDisc[i]+" — tipo: "+listaTipo[i]+" — gabarito: "+gabs[i]+(temRecurso ? " — INCLUIR RECURSO VISUAL OBRIGATÓRIO" : "");
  }).join("\n");
  const habCodigos = discArr.map(d => {
    const hs = (HABILIDADES[d]||[]).map(h => h.match(/H\d+/)?.[0]).filter(Boolean);
    return d+": "+hs.join(", ");
  }).join(" | ");

  return "Você é elaborador ENEM especialista em Ciências Humanas.\n\n" +
    "ESPECIFICAÇÃO:\n" +
    "Disciplinas: "+discArr.join(", ")+"\n" +
    "Tipos de item: "+tipoArr.join(", ")+"\n" +
    "Tema: "+(tema || "livre")+"\n" +
    "Quantidade: "+qtd+" questão(ões)\n\n" +
    "HABILIDADES (use os códigos H1-H30 da Matriz ENEM): "+habCodigos+"\n\n" +
    "═══ DISTRIBUIÇÃO OBRIGATÓRIA ═══\n"+lista+"\n\n" +
    "IMPORTANTE: para cada questão, use a disciplina e o tipo especificados na linha acima.\n\n" +
    "═══ CRITÉRIOS COGNITIVOS POR NÍVEL ═══\n" +
    "🟢 FÁCIL — Texto 5–7 linhas, distratores óbvios. O comando termina em artigo/preposição.\n" +
    "🟡 MÉDIO — Texto 7–10 linhas, distratores plausíveis. Pode usar dois textos.\n" +
    "🔴 DIFÍCIL — Texto 10–12 linhas ou dois textos, distratores sofisticados.\n\n" +
    "═══ REGRA ABSOLUTA — FORMATO DO COMANDO ═══\n" +
    "ATENÇÃO: esta é a regra mais importante. Leia com atenção antes de gerar qualquer questão.\n\n" +
    "O comando do ENEM NÃO é uma pergunta completa. É uma FRASE NOMINAL INCOMPLETA que o candidato\n" +
    "completa ao escolher a alternativa correta. A frase termina em artigo (a/o/as/os), preposição\n" +
    "(de/da/do/para/pelo/pela/por) ou conjunção — nunca com ponto final após um verbo conjugado.\n\n" +
    "EXEMPLOS REAIS DO ENEM 2025 (copie esta estrutura):\n" +
    "• \"A [ação] descrita no texto origina-se da\"  → candidato completa com a causa\n" +
    "• \"A crítica do texto evidencia uma dinâmica socioespacial marcada pela\"\n" +
    "• \"A [elemento] mencionada no texto justificava-se pelo(a)\"\n" +
    "• \"Os argumentos do texto sustentam que [tema] porque os considera como\"\n" +
    "• \"O texto indica o seguinte aspecto de [tema] como ferramenta\"\n" +
    "• \"A [mudança] descrita provocou a diminuição da\"\n" +
    "• \"No excerto encontra-se a base da teoria [tema] representada pela\"\n" +
    "• \"A [ação] dos [sujeito] teve como consequência imediata o(a)\"\n" +
    "• \"Para [sujeito], a mudança de [elemento] é uma estratégia política para\"\n" +
    "• \"De acordo com o texto, a [variação/denominação] foi determinada pelo(a)\"\n" +
    "• \"No contexto de [período], o autor propõe uma reflexão acerca de [tema], restringindo-a ao\"\n" +
    "• \"Conforme o texto, [evento] era alcançado por meio das\"\n" +
    "• \"No que se refere a [tema], o texto indica uma contradição derivada do seguinte aspecto:\"\n" +
    "• \"A dispersão espacial do problema representado é explicada pela seguinte característica:\"\n" +
    "• \"Publicados em períodos diferentes, os textos apresentam\"  (para Texto I + II)\n\n" +
    "PERGUNTA DIRETA: permitida apenas 1 a cada 5 questões. Exemplos reais:\n" +
    "• \"Qual condição favoreceu o cenário produtivo exposto na figura?\"\n" +
    "• \"Qual é o efeito econômico do problema ambiental apresentado no texto?\"\n\n" +
    "ABSOLUTAMENTE PROIBIDO:\n" +
    "✗ Verbos no imperativo: Identifique / Analise / Compare / Explique / Aponte / Descreva\n" +
    "✗ Frases que terminam com verbo conjugado + ponto: \"...evidencia que o capitalismo avançou.\"\n" +
    "✗ Expressões: segundo o texto / de acordo com o texto / com base no texto / com base na imagem\n\n" +
    "═══ REGRAS OBRIGATÓRIAS ═══\n" +
    "1. GEOGRAFIA: diferencie SEMPRE entre Humana (urbanização, migração, geopolítica, demografia,\n" +
    "   globalização, desigualdades) e Física (clima, biomas, relevo, hidrografia, impactos ambientais).\n" +
    "   Habilidades: H6/H26/H29 = física | H7/H8/H9/H17/H18/H19 = humana. Distribua equilibradamente.\n" +
    "2. Texto-base suficiente e necessário (5–12 linhas conforme nível).\n" +
    "3. Alternativas nominais paralelas, 6–20 palavras, sem verbos conjugados.\n" +
    "4. Distratores com desvios distintos: generalização | redução | inversão de causalidade | deslocamento temporal | confusão conceitual\n" +
    "5. Fonte real com autor e ano.\n" +
    "6. Gabarito EXATAMENTE a letra indicada na lista.\n" +
    "7. Campo \"habilidade\" com código oficial (ex: H8) e enunciado completo.\n" +
    "8. RECURSO VISUAL: pelo menos 1 a cada 3 questões deve ter recursoVisual (tipo, descricao detalhada,\n" +
    "   fonteRecurso com URL real). Questões com recurso visual podem ter textoBase vazio — a imagem é o suporte.\n" +
    "9. DOIS TEXTOS: pelo menos 1 a cada 4 questões (Médio/Difícil) deve usar Texto I + Texto II.\n" +
    "   Formato no textoBase: \"TEXTO I\\n[texto]\\n\\nTEXTO II\\n[texto]\".\n" +
    "   Comando: \"Publicados em períodos diferentes, os textos apresentam\" / \"Os textos I e II demonstram\"\n\n" +
    'Responda SOMENTE JSON válido sem markdown:\n{"questoes":[{"tema":"","nivel":"Fácil|Médio|Difícil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|gráfico|tabela|charge|fotografia|infográfico","descricao":"","fonteRecurso":""},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}';
}

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
  .tab-btn { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:10px; border:none; background:transparent; color:var(--muted); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:all .18s; }
  .tab-btn.active { background:var(--panel); color:var(--text); border:1.5px solid var(--border2); }
  .tab-btn:not(.active):hover { color:var(--label); }
  .chip { padding:7px 16px; border-radius:8px; border:1.5px solid var(--border); background:transparent; color:var(--muted); font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; transition:all .15s; white-space:nowrap; }
  .chip:hover { border-color:var(--border2); color:var(--label); }
  .opt-btn { width:100%; display:flex; align-items:flex-start; gap:12px; padding:13px 16px; background:var(--card); border:1.5px solid var(--border); border-radius:10px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; text-align:left; cursor:pointer; transition:all .18s; line-height:1.55; }
  .opt-btn:hover:not(:disabled) { border-color:#6c63ff88; background:rgba(108,99,255,.07); }
  .opt-btn.sel { border-color:var(--accent); background:rgba(108,99,255,.12); }
  .opt-btn.ok { border-color:var(--accent3); background:rgba(67,232,160,.1); }
  .opt-btn.err { border-color:var(--accent2); background:rgba(255,101,132,.1); }
  .opt-btn:disabled { cursor:default; }
  .sel-native { width:100%; background:var(--panel); border:1.5px solid var(--border); border-radius:10px; padding:12px 16px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; cursor:pointer; appearance:none; -webkit-appearance:none; transition:border-color .18s; }
  .sel-native:focus { border-color:var(--accent); }
  .sel-native option { background:#1a1a26; }
  .textarea { width:100%; background:var(--panel); border:1.5px solid var(--border); border-radius:10px; padding:14px 16px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; resize:vertical; min-height:100px; transition:border-color .18s; }
  .textarea:focus { border-color:var(--accent); }
  .texto-suporte { text-align: justify !important; hyphens: auto; -webkit-hyphens: auto; text-align-last: left; }
  .textarea::placeholder { color:var(--muted); }
  .btn-gerar { display:flex; align-items:center; gap:10px; padding:14px 28px; background:linear-gradient(135deg,#6c63ff,#9c63ff); border:none; border-radius:12px; color:#fff; font-family:'Syne',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all .2s; }
  .btn-gerar:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(108,99,255,.45); }
  .btn-gerar:disabled { opacity:.5; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn-ghost { background:transparent; border:1.5px solid var(--border); border-radius:8px; color:var(--label); font-family:'DM Sans',sans-serif; font-size:12px; padding:6px 12px; cursor:pointer; transition:all .15s; }
  .btn-ghost:hover { border-color:var(--accent); color:var(--accent); }
  .field-label { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:2px; color:var(--label); text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .field-label span { color:var(--muted); font-size:10px; letter-spacing:0; text-transform:none; font-family:'DM Sans',sans-serif; }
  .prog-bar { height:3px; background:var(--border); border-radius:3px; overflow:hidden; }
  .prog-fill { height:100%; background:linear-gradient(90deg,var(--accent),var(--accent3)); border-radius:3px; transition:width .5s ease; }
  .pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:999px; font-size:11px; font-family:'DM Mono',monospace; font-weight:500; }
`;

function BadgeTempo({ nivel }) {
  const t = TEMPO_MEDIO[nivel] || TEMPO_MEDIO.Médio;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"5px", padding:"4px 10px", background:"var(--panel)", border:`1px solid ${t.cor}33`, borderRadius:"7px" }}>
      <span style={{ fontSize:"11px" }}>⏱</span>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:t.cor, fontWeight:600 }}>~{t.m} min</span>
      <span style={{ color:"var(--muted)", fontSize:"10px" }}>· {t.desc}</span>
    </div>
  );
}

// ── CORREÇÃO: wikiImgs agora recebido como prop ──
function CartaoQuestao({ q, idx, total, wikiImgs, resp, onResp, rev, onRev }) {
  const [gabAberto, setGabAberto] = React.useState(false);
  const nc = NIVEL_COR[q.nivel] || NIVEL_COR.Médio;
  const dc = COR_DISC[q.area] || COR_DISC.Geografia;
  return (
    <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", overflow:"hidden", marginBottom:"20px" }}>
      <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--panel)", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px" }}>
            {String(idx+1).padStart(2,"0")}
          </div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"14px" }}>
              Questão {idx+1} <span style={{ color:"var(--muted)", fontWeight:400, fontSize:"13px" }}>de {total}</span>
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

      <div style={{ padding:"20px" }}>
        {(() => {
          const texto = q.textoBase || '';
          const wimg = wikiImgs[q.numero];
          const temImagem = q.recursoVisual?.descricao && wimg;
          const temDoisTextos = texto.includes('TEXTO II');
          const usaLabels = temDoisTextos || (texto.trim() && temImagem);

          const sTexto = { background:"var(--card)", borderLeft:"3px solid var(--accent)", borderRadius:"0 10px 10px 0", padding:"16px 18px", fontSize:"14px", lineHeight:"1.85", color:"#c0c0e0", fontStyle:"italic", marginBottom:"4px" };
          const sLabel = { fontSize:"11px", fontWeight:"700", color:"var(--accent)", fontFamily:"'DM Mono',monospace", letterSpacing:"1.5px", marginBottom:"6px" };
          const sFonte = { textAlign:"right", fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", marginBottom:"16px" };
          const sImg = { padding:"14px 16px", background:"rgba(255,209,102,.07)", border:"1.5px dashed #ffd16688", borderRadius:"10px", marginBottom:"18px" };
          const icones = { mapa:"🗺", "gráfico":"📊", tabela:"📋", charge:"🎨", fotografia:"📷" };

          const BlocoImagem = ({ label }) => wimg ? (
            <div style={sImg}>
              {label && <div style={sLabel}>{label}</div>}
              <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"10px" }}>
                <span style={{ fontSize:"18px" }}>{icones[q.recursoVisual.tipo] || "📌"}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"#ffd166", letterSpacing:"2px", textTransform:"uppercase" }}>{q.recursoVisual.tipo}</span>
              </div>
              <img src={wimg.dataUrl} alt="recurso visual" style={{ width:"100%", maxHeight:"420px", objectFit:"contain", borderRadius:"8px", display:"block" }} />
              {wimg.credito && <div style={{ marginTop:"8px", fontSize:"10px", color:"rgba(255,209,102,0.6)", fontFamily:"'DM Mono',monospace", lineHeight:1.4, textAlign:"right" }}>Fonte: {wimg.credito}</div>}
            </div>
          ) : null;

          // Caso 1: TEXTO I + TEXTO II no textoBase
          if (temDoisTextos) {
            const blocos = texto.split(/\n{1,2}(?=TEXTO II)/);
            const t1 = (blocos[0] || '').replace(/^TEXTO I\s*\n?/, '').trim();
            const t2 = (blocos[1] || '').replace(/^TEXTO II\s*\n?/, '').trim();
            return (
              <>
                <div style={{ marginBottom:"18px" }}>
                  <div style={sLabel}>TEXTO I</div>
                  <div style={sTexto} className="texto-suporte">{t1}</div>
                  {q.fonteTextoI && <div style={sFonte}>{q.fonteTextoI}</div>}
                </div>
                <div style={{ marginBottom:"18px" }}>
                  <div style={sLabel}>TEXTO II</div>
                  <div style={sTexto} className="texto-suporte">{t2}</div>
                  {q.fonteTextoII && <div style={sFonte}>{q.fonteTextoII}</div>}
                </div>
                {temImagem && <BlocoImagem label={null} />}
              </>
            );
          }

          // Caso 2: texto + imagem → TEXTO I / TEXTO II
          if (texto.trim() && temImagem) {
            return (
              <>
                <div style={{ marginBottom:"18px" }}>
                  <div style={sLabel}>TEXTO I</div>
                  <div style={sTexto} className="texto-suporte">{texto}</div>
                  {q.fonte && <div style={sFonte}>{q.fonte}</div>}
                </div>
                <BlocoImagem label="TEXTO II" />
              </>
            );
          }

          // Caso 3: só texto
          if (texto.trim()) {
            return (
              <>
                <div style={sTexto} className="texto-suporte">{texto}</div>
                {q.fonte && <div style={sFonte}>{q.fonte}</div>}
              </>
            );
          }

          // Caso 4: só imagem
          return temImagem ? <BlocoImagem label={null} /> : null;
        })()}

        <p style={{ fontSize:"15px", fontWeight:600, lineHeight:1.6, marginBottom:"18px", color:"var(--text)" }}>{q.comando}</p>

        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"18px" }}>
          {q.opcoes.map(op => {
            const sel = resp === op.letra, ok = rev && op.correta, err = rev && sel && !op.correta;
            return (
              <button key={op.letra} className={`opt-btn ${sel?"sel":""} ${ok?"ok":""} ${err?"err":""}`} onClick={() => !rev && onResp(op.letra)} disabled={rev}>
                <span style={{ minWidth:"26px", height:"26px", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", background:ok?"#43e8a0":err?"#ff6584":sel?"#6c63ff":"var(--border)", color:(ok||err||sel)?"#0d0d12":"var(--muted)", flexShrink:0 }}>{op.letra}</span>
                <div style={{ flex:1 }}>
                  <span>{op.texto}</span>
                  {rev && <div style={{ marginTop:"5px", fontSize:"12px", color:op.correta?"#43e8a0":"var(--muted)", fontStyle:"italic" }}>{op.correta?"✓ Correta — ":"✗ "}{op.explicacao}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {!rev
          ? <button className="btn-ghost" onClick={onRev} disabled={!resp} style={{ opacity:resp?1:.45, padding:"8px 18px", fontSize:"13px" }}>{resp?"Verificar resposta":"Selecione uma alternativa"}</button>
          : <div style={{ marginBottom:"4px", display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", background:resp===q.gabarito?"rgba(67,232,160,.08)":"rgba(255,101,132,.08)", border:`1px solid ${resp===q.gabarito?"#43e8a0":"#ff6584"}`, borderRadius:"9px", fontSize:"13px" }}>
              <span style={{ fontSize:"18px" }}>{resp===q.gabarito?"🎯":"📚"}</span>
              <span>{resp===q.gabarito?"Resposta correta!":`Incorreta. Gabarito: ${q.gabarito}`}</span>
              <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"2px" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"var(--accent)", fontWeight:600 }}>{q.habilidade?.slice(0,2)}</span>
                {q.eixo && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"var(--muted)" }}>Eixo {q.eixo}</span>}
              </div>
            </div>
        }

        <div style={{ marginTop:"16px", borderTop:"1px solid var(--border)", paddingTop:"14px" }}>
          <button onClick={() => setGabAberto(g => !g)}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:"8px", background:"none", border:"none", cursor:"pointer", padding:"4px 0", marginBottom: gabAberto ? "14px" : "0" }}>
            <div style={{ width:"6px", height:"20px", background:"linear-gradient(180deg,#6c63ff,#43e8a0)", borderRadius:"3px", flexShrink:0 }} />
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"13px", letterSpacing:"1px", textTransform:"uppercase", color:"var(--label)" }}>
              Gabarito Comentado
            </span>
            <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"3px 10px", background:"rgba(67,232,160,.12)", border:"1px solid #43e8a044", borderRadius:"6px", color:"#43e8a0" }}>
              {q.gabarito}
            </span>
            <span style={{ fontSize:"12px", color:"var(--muted)", marginLeft:"6px" }}>{gabAberto ? "▲" : "▼"}</span>
          </button>

          {gabAberto && (
            <div className="fade-up">
              {(q.opcoes||[]).filter(op => op.correta).map(op => (
                <div key={op.letra} style={{ display:"flex", gap:"12px", padding:"14px 16px", background:"rgba(67,232,160,.06)", border:"1.5px solid #43e8a033", borderRadius:"10px", marginBottom:"8px" }}>
                  <div style={{ flexShrink:0, width:"28px", height:"28px", borderRadius:"7px", background:"#43e8a0", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", color:"#0d0d12" }}>
                    {op.letra}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"11px", fontFamily:"'DM Mono',monospace", color:"#43e8a0", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px" }}>✓ Alternativa Correta</div>
                    <div style={{ fontSize:"13px", color:"#c0e8d0", lineHeight:1.7, wordBreak:"break-word" }}>
                      {op.explicacao || "Esta alternativa responde diretamente ao que o comando solicita."}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {(q.opcoes||[]).filter(op => !op.correta).map(op => (
                  <div key={op.letra} style={{ display:"flex", gap:"12px", padding:"11px 14px", background:"rgba(255,101,132,.04)", border:"1px solid #ff658422", borderRadius:"10px" }}>
                    <div style={{ flexShrink:0, width:"28px", height:"28px", borderRadius:"7px", background:"rgba(255,101,132,.15)", border:"1px solid #ff658444", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", color:"#ff6584" }}>
                      {op.letra}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"11px", fontFamily:"'DM Mono',monospace", color:"#ff8099", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"3px" }}>✗ Distrator</div>
                      <div style={{ fontSize:"13px", color:"#b0a0a8", lineHeight:1.6, wordBreak:"break-word" }}>
                        {op.explicacao || "Alternativa incorreta."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {q.habilidade && (
                <div style={{ marginTop:"10px", padding:"10px 14px", background:"rgba(108,99,255,.07)", border:"1px solid #6c63ff33", borderRadius:"8px", fontSize:"12px", color:"var(--label)", fontFamily:"'DM Mono',monospace", lineHeight:1.6, wordBreak:"break-word" }}>
                  🎯 {q.habilidade}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const PROMPT_ANALISE = `Analise este simulado ENEM de Ciências Humanas e extraia as características de estilo.
Responda SOMENTE com JSON válido, sem markdown:
{
  "disciplinas": ["lista das disciplinas identificadas"],
  "habilidades": ["códigos das habilidades ENEM usadas, ex: H8, H15"],
  "tiposTexto": ["tipos de texto-base: excerto literário, dado estatístico, mapa, charge, etc."],
  "padraoComandos": "descrição do padrão dos verbos e estrutura dos comandos",
  "complexidadeDistratores": "descrição de como os distratores são construídos",
  "temas": ["temas e subtemas recorrentes"],
  "observacoesEstilo": "observações gerais sobre o estilo editorial, tom, extensão dos textos-base"
}`;

export default function App() {
  const [modo, setModo]           = useState("avulsa");
  const [qtdSimulado, setQtd]     = useState(10);
  const [disciplinas, setDiscs]   = useState([]);
  const [niveis, setNiveis]       = useState(["Fácil"]);
  const [tipos, setTipos]         = useState(["Interpretação de texto"]);
  const [tema, setTema]           = useState("");

  const [questoes, setQuestoes]   = useState([]);
  const [respostas, setResps]     = useState({});
  const [revelados, setRevs]      = useState({});
  const [loading, setLoading]     = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [downloadFeito, setDownloadFeito] = useState(false);
  const [erro, setErro]           = useState("");

  const [wikiImgs, setWikiImgs] = useState({});

  const [arquivoImport, setArquivo]     = useState(null);
  const [analise, setAnalise]           = useState(null);
  const [loadingImport, setLoadImport]  = useState(false);
  const [erroImport, setErroImport]     = useState("");
  const [qtdImport, setQtdImport]       = useState(5);
  const [questoesImport, setQuestoesImport] = useState([]);
  const [downloadFeitoImport, setDownloadFeitoImport] = useState(false);
  const fileInputRef                    = useRef(null);
  const imgsImportRef                   = useRef({});

  useEffect(() => {
    const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  function toggleNivel(n) {
    setNiveis(prev => prev.includes(n) ? (prev.length === 1 ? prev : prev.filter(x => x !== n)) : [...prev, n]);
  }
  function toggleDisc(d) {
    setDiscs(prev => prev.includes(d) ? (prev.length === 1 ? prev : prev.filter(x => x !== d)) : [...prev, d]);
  }
  function toggleTipo(t) {
    setTipos(prev => prev.includes(t) ? (prev.length === 1 ? prev : prev.filter(x => x !== t)) : [...prev, t]);
  }

  const totalR = Object.keys(revelados).length;
  const totalA = Object.entries(revelados).filter(([i]) => respostas[i] === questoes[+i]?.gabarito).length;
  const prog   = questoes.length > 0 ? (totalR / questoes.length) * 100 : 0;
  const tempoT = questoes.reduce((a, q) => a + (TEMPO_MEDIO[q.nivel]?.m || 3), 0);

  function loadScript(src, windowKey) {
    return new Promise((resolve, reject) => {
      if (window[windowKey]) { resolve(window[windowKey]); return; }
      const sc = document.createElement("script");
      sc.src = src;
      sc.onload = () => {
        let tries = 0;
        const check = setInterval(() => {
          if (window[windowKey]) { clearInterval(check); resolve(window[windowKey]); }
          else if (++tries > 40) { clearInterval(check); reject(new Error(`${windowKey} não carregou`)); }
        }, 100);
      };
      sc.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
      document.head.appendChild(sc);
    });
  }

  async function buscarImagensWikimedia(qs) {
    const imgs = {};
    const comVisual = qs.filter(q => q.recursoVisual?.descricao);
    if (comVisual.length === 0) return imgs;

    setLoadingMsg("Buscando imagens no Wikimedia Commons...");

    await Promise.all(comVisual.map(async (q) => {
      try {
        const res = await fetch("/api/wikimedia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descricao: q.recursoVisual.descricao,
            tipo: q.recursoVisual.tipo,
            tema: q.tema || "",
          }),
        });
        const data = await res.json();
        if (data.found) {
          imgs[q.numero] = data;
        }
      } catch (_) {}
    }));

    return imgs;
  }

  async function exportarPDF(qs, nomeArq, imgsOverride) {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questoes: qs, wikiImgs: imgsOverride || wikiImgs }),
    });
    if (!res.ok) throw new Error("Falha ao gerar PDF");
    const html = await res.text();
    const win = window.open("", "_blank");
    if (!win) throw new Error("Popup bloqueado — permita popups para este site");
    win.document.write(html);
    win.document.close();
  }

  async function exportarDOCX(qs, nomeArq, imgsOverride) {
    const res = await fetch("/api/docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questoes: qs, wikiImgs: imgsOverride || wikiImgs }),
    });
    if (!res.ok) throw new Error("Falha ao gerar Word");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = nomeArq + ".docx"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function lerArquivo(file) {
    setErroImport(""); setAnalise(null); setArquivo(null);
    const nome = file.name;
    const tipo = nome.endsWith(".pdf") ? "pdf" : "docx";

    if (tipo === "pdf") {
      setLoadImport(true);
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "pdfjsLib");
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let textoTotal = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          textoTotal += content.items.map(item => item.str).join(" ") + "\n";
        }
        if (!textoTotal.trim()) throw new Error("PDF sem texto selecionável. Use um PDF com texto, não escaneado.");
        setArquivo({ nome, tipo: "docx", texto: textoTotal });
      } catch(e) {
        setErroImport("Erro ao ler PDF: " + e.message);
      } finally {
        setLoadImport(false);
      }
      return;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
          "mammoth"
        );
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        setArquivo({ nome, tipo, texto: result.value });
      } catch(e) {
        setErroImport("Não foi possível carregar o leitor de Word. Verifique sua conexão.");
      }
    }
  }

  async function analisarSimulado() {
    if (!arquivoImport) return;
    setLoadImport(true); setErroImport(""); setAnalise(null);

    try {
      let messages;

      if (arquivoImport.tipo === "pdf") {
        messages = [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: arquivoImport.base64 } },
            { type: "text", text: PROMPT_ANALISE }
          ]
        }];
      } else {
        messages = [{
          role: "user",
          content: PROMPT_ANALISE + "\n\n=== CONTEÚDO DO SIMULADO ===\n" + arquivoImport.texto
        }];
      }

      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, messages })
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const txt = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
      if (!txt) throw new Error("Resposta vazia da API.");
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
      setAnalise(parsed);
    } catch(e) {
      setErroImport("Erro: " + e.message);
      console.error(e);
    } finally {
      setLoadImport(false);
    }
  }

  function downloadTXT(qs) {
    const lines = qs.map(q => {
      const alts = (q.opcoes||[]).map(o => o.letra + ") " + o.texto).join("\n");
      const correta = (q.opcoes||[]).find(o => o.correta);
      const distratores = (q.opcoes||[]).filter(o => !o.correta);
      const gabComentado = [
        "┌─ GABARITO COMENTADO " + "─".repeat(26) + "┐",
        "  Gabarito: " + q.gabarito,
        "",
        "  ✓ ALTERNATIVA CORRETA — " + (correta?.letra || q.gabarito),
        "  " + (correta?.explicacao || "Responde diretamente ao que o comando solicita."),
        "",
        "  ✗ DISTRATORES:",
        ...distratores.map(o => "  " + o.letra + ") " + (o.explicacao || "Alternativa incorreta.")),
        "",
        q.habilidade ? "  🎯 " + q.habilidade : "",
        "└" + "─".repeat(48) + "┘",
      ].filter(l => l !== undefined).join("\n");

      return "QUESTÃO " + q.numero + "\n" +
        (q.textoBase||"") + "\n" +
        (q.fonte||"") + "\n\n" +
        (q.comando||"") + "\n\n" +
        alts + "\n\n" +
        gabComentado + "\n" +
        "═".repeat(48);
    });
    const txt = lines.join("\n\n");
    const b = new Blob([txt], {type:"text/plain;charset=utf-8"});
    const u = URL.createObjectURL(b);
    const a = document.createElement("a"); a.href=u; a.download="simulado-enem.txt"; a.click();
    URL.revokeObjectURL(u);
  }

  async function gerarQuestoes() {
    setErro(""); setLoading(true); setLoadingMsg(""); setQuestoes([]); setResps({}); setRevs({}); setDownloadFeito(false);
    const isSimulado = modo === "simulado";
    const qtd = isSimulado ? qtdSimulado : 1;
    let qs = [];
    const LOTE = 1;
    const totalLotes = Math.ceil(qtd / LOTE);
    try {
      for (let lote = 0; lote < totalLotes; lote++) {
        const offset = lote * LOTE;
        const qtdLote = Math.min(LOTE, qtd - offset);
        setLoadingMsg("Gerando questões " + (offset+1) + (qtdLote > 1 ? "–" + (offset+qtdLote) : "") + " de " + qtd + "...");
        const res = await fetch("/api/gerar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            messages: [{ role: "user", content: buildPrompt({ disciplina: disciplinas, niveis, tipoItem: tipos, tema, qtd: qtdLote, offset }) }],
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        const txt = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
        const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
        qs.push(...parsed.questoes);
      }
      qs = qs.map((q, i) => ({ ...q, numero: i+1, area: q.area || disciplinas[0] }));
    } catch(e) {
      setErro("Erro ao gerar questões: " + e.message);
      setLoadingMsg(""); setLoading(false); return;
    }

    if (!isSimulado) {
      const imgsA = await buscarImagensWikimedia(qs);
      setWikiImgs(imgsA);
      setQuestoes(qs); setLoadingMsg(""); setLoading(false); return;
    }

    const imgsB = await buscarImagensWikimedia(qs);
    setWikiImgs(imgsB);
    setQuestoes(qs);
    const nomeArq = "simulado-enem-" + new Date().toISOString().slice(0,10);
    const errosExport = [];
    try { setLoadingMsg("Gerando PDF..."); await exportarPDF(qs, nomeArq); } catch(e) { errosExport.push("PDF"); }
    try { setLoadingMsg("Gerando Word..."); await exportarDOCX(qs, nomeArq); } catch(e) { errosExport.push("Word"); }
    setLoadingMsg(""); setLoading(false); setDownloadFeito(true);
    if (errosExport.length > 0) setErro("Não foi possível gerar automaticamente: " + errosExport.join(", ") + ". Use os botões abaixo.");
  }

  async function gerarNoEstilo() {
    if (!analise) return;
    setErro(""); setLoading(true); setQuestoes([]); setResps({}); setRevs({});

    const disc = analise.disciplinas?.[0] || "Geografia";
    const letras = ["A","B","C","D","E"];
    const nivelCiclo = ["Fácil","Médio","Difícil"];
    const LOTE = 1;
    const totalLotes = Math.ceil(qtdImport / LOTE);
    const todasQuestoes = [];

    function buildPromptLote(offset, qtdLote) {
      const gabs = Array.from({ length: qtdLote }, (_, i) => letras[(offset + i) % 5]);
      const niveis = Array.from({ length: qtdLote }, (_, i) => nivelCiclo[(offset + i) % 3]);
      const temasList = analise.temas || [];
      const temasDisponiveis = temasList.length > 0
        ? Array.from({ length: qtdLote }, (_, i) => temasList[(offset + i) % temasList.length])
        : [];
      const lista = niveis.map((n, i) => "Q" + (i+1) + ": " + n + " — tema: " + (temasDisponiveis[i] || "livre") + " — gabarito: " + gabs[i]).join("\n");
      return "Você é elaborador ENEM. Gere EXATAMENTE " + qtdLote + " questão(ões) novas no estilo abaixo.\n\n" +
        "DISCIPLINAS: " + analise.disciplinas?.join(", ") + "\n" +
        "HABILIDADES: " + analise.habilidades?.join(", ") + "\n" +
        "TIPOS DE TEXTO: " + analise.tiposTexto?.join(", ") + "\n" +
        "COMANDOS: " + analise.padraoComandos + "\n" +
        "DISTRATORES: " + analise.complexidadeDistratores + "\n" +
        "ESTILO: " + analise.observacoesEstilo + "\n\n" +
        "DISTRIBUIÇÃO (siga exatamente — cada questão deve ter tema DIFERENTE das demais):\n" + lista + "\n\n" +
        "REGRAS:\n" +
        "1. Cada questão deve abordar o tema especificado — NÃO repita temas\n" +
        "2. GEOGRAFIA: diferencie SEMPRE entre Humana e Física. Distribua equilibradamente.\n" +
        "3. Texto-base suficiente e necessário (5–12 linhas conforme nível).\n" +
        "4. FORMATO DO COMANDO: frase nominal incompleta terminando em artigo ou preposição.\n" +
        "5. Alternativas nominais paralelas, 6–20 palavras, sem verbos conjugados.\n" +
        "6. Distratores com desvios distintos.\n" +
        "7. Fonte real com autor e ano.\n" +
        "8. Gabarito EXATAMENTE a letra da lista.\n" +
        "9. Campo 'explicacao' de cada opção: 1–2 frases.\n" +
        "10. RECURSO VISUAL OBRIGATÓRIO: pelo menos 1 a cada 3 questões DEVE ter recursoVisual preenchido.\n" +
        "    Preencha: tipo (mapa|gráfico|tabela|charge|fotografia|infográfico), descricao detalhada em português, fonteRecurso com URL real.\n" +
        "    Questões com recurso visual podem ter textoBase vazio — a imagem é o suporte.\n" +
        "11. DOIS TEXTOS: pelo menos 1 a cada 4 questões (Médio/Difícil).\n\n" +
        "Responda SOMENTE JSON válido sem markdown:\n" +
        '{"questoes":[{"tema":"","nivel":"Fácil|Médio|Difícil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|gráfico|tabela|charge|fotografia|infográfico","descricao":"descrição detalhada","fonteRecurso":"URL real"},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}';
    }

    try {
      for (let lote = 0; lote < totalLotes; lote++) {
        const offset = lote * LOTE;
        const qtdLote = Math.min(LOTE, qtdImport - offset);
        setLoadingMsg("Gerando questões " + (offset+1) + "–" + (offset+qtdLote) + " de " + qtdImport + "...");

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
      const imgs3 = await buscarImagensWikimedia(qs);
      setWikiImgs(imgs3);
      setQuestoes(qs);
      setQuestoesImport(qs);
      setLoadingMsg("");
      setDownloadFeitoImport(true);
      setModo("avulsa");
      // Guarda imgs3 no ref para uso imediato nos botões de export
      imgsImportRef.current = imgs3;

    } catch(e) {
      setErro("Erro ao gerar questões: " + e.message);
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>

      <header style={{ background:"var(--surface)", borderBottom:"1px solid var(--border)", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"60px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
          <div style={{ width:"36px", height:"36px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"13px", color:"#fff", letterSpacing:"-1px" }}>CH</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"var(--text)", letterSpacing:"-0.3px" }}>Humanizando</div>
            <div style={{ fontSize:"10px", color:"var(--muted)", fontFamily:"'DM Mono',monospace", letterSpacing:"1.5px" }}>AGENTE ELABORADOR ENEM</div>
          </div>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"var(--muted)", letterSpacing:"2px" }}>CIÊNCIAS HUMANAS · ENEM</div>
      </header>

      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"32px 24px" }}>

        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"28px", borderBottom:"1px solid var(--border)", paddingBottom:"0" }}>
          <button className={`tab-btn ${modo==="avulsa"?"active":""}`} onClick={() => { setModo("avulsa"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="avulsa"?"2px solid var(--accent)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"15px" }}>✦</span> Questão avulsa
          </button>
          <button className={`tab-btn ${modo==="simulado"?"active":""}`} onClick={() => { setModo("simulado"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="simulado"?"2px solid var(--accent)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"13px" }}>⊞</span> Modo Simulado
          </button>
          <button className={`tab-btn ${modo==="importar"?"active":""}`} onClick={() => { setModo("importar"); setDownloadFeito(false); }} style={{ marginBottom:"-1px", borderBottom:modo==="importar"?"2px solid var(--accent4)":"2px solid transparent", borderRadius:"10px 10px 0 0" }}>
            <span style={{ fontSize:"13px" }}>⬆</span> Importar Simulado
          </button>
          {modo === "simulado" && (
            <div style={{ marginLeft:"8px", display:"flex", alignItems:"center", gap:"6px" }}>
              {[5,10,15,45].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)" } : {}}>
                  {n} questões
                </button>
              ))}
            </div>
          )}
        </div>

        {modo === "importar" && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#ffd166,#ffaa00)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px", color:"#0d0d12" }}>⬆</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Importar simulado de referência</div>
                <div style={{ fontSize:"12px", color:"var(--muted)", marginTop:"2px" }}>PDF ou Word (.docx) — o agente analisa o estilo e gera novas questões na mesma linha</div>
              </div>
            </div>

            {!arquivoImport ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor="#ffd166"; e.currentTarget.style.background="rgba(255,209,102,.06)"; }}
                onDragLeave={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.background="transparent"; }}
                onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.background="transparent"; const f=e.dataTransfer.files[0]; if(f) lerArquivo(f); }}
                style={{ border:"2px dashed var(--border2)", borderRadius:"12px", padding:"48px 24px", textAlign:"center", cursor:"pointer", transition:"all .2s" }}
              >
                <div style={{ fontSize:"36px", marginBottom:"12px" }}>📄</div>
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
                <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", background:"var(--panel)", border:"1.5px solid var(--border2)", borderRadius:"10px", marginBottom:"20px" }}>
                  <span style={{ fontSize:"22px" }}>{arquivoImport.tipo==="pdf"?"📕":"📘"}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:"14px" }}>{arquivoImport.nome}</div>
                    <div style={{ fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>{arquivoImport.tipo.toUpperCase()} · pronto para análise</div>
                  </div>
                  <button className="btn-ghost" style={{ fontSize:"12px" }} onClick={() => { setArquivo(null); setAnalise(null); setErroImport(""); }}>✕ Remover</button>
                </div>

                {analise && (
                  <div className="fade-up" style={{ background:"var(--panel)", border:"1.5px solid #ffd16644", borderRadius:"12px", padding:"18px", marginBottom:"20px" }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"#ffd166", letterSpacing:"2px", marginBottom:"14px" }}>ANÁLISE DO ESTILO</div>
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
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>PADRÃO DOS COMANDOS</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.padraoComandos}</div>
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <div style={{ color:"var(--muted)", fontSize:"11px", marginBottom:"4px" }}>ESTILO GERAL</div>
                        <div style={{ color:"var(--text)", lineHeight:1.5 }}>{analise.observacoesEstilo}</div>
                      </div>
                    </div>

                    <div style={{ marginTop:"20px", paddingTop:"16px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
                      <div style={{ color:"var(--muted)", fontSize:"13px" }}>Gerar</div>
                      {[3,5,10,15,45].map(n => (
                        <button key={n} className="chip" onClick={() => setQtdImport(n)}
                          style={qtdImport===n ? { borderColor:"#ffd166", background:"rgba(255,209,102,.15)", color:"#ffd166" } : {}}>
                          {n} questões
                        </button>
                      ))}
                      {!downloadFeitoImport && (
                        <button className="btn-gerar" onClick={gerarNoEstilo} disabled={loading}
                          style={{ marginLeft:"auto", background:"linear-gradient(135deg,#ffd166,#ffaa00)", color:"#0d0d12" }}>
                          {loading ? <><span className="spin" style={{ display:"inline-block" }}>⟳</span> {loadingMsg || "Gerando..."}</>
                            : <><span>✦</span> Gerar no mesmo estilo</>}
                        </button>
                      )}
                    </div>

                    {downloadFeitoImport && (
                      <div className="fade-up" style={{ marginTop:"20px", padding:"20px", background:"var(--panel)", border:"1.5px solid #43e8a044", borderRadius:"12px", textAlign:"center" }}>
                        <div style={{ fontSize:"36px", marginBottom:"10px" }}>✅</div>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", marginBottom:"6px" }}>
                          {questoesImport.length} questões geradas no estilo do seu simulado!
                        </div>
                        <div style={{ fontSize:"12px", color:"var(--muted)", marginBottom:"18px" }}>
                          Downloads automáticos disparados. Se não apareceram, use os botões abaixo:
                        </div>
                        <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap", marginBottom:"14px" }}>
                          <button className="btn-gerar"
                            style={{ fontSize:"13px", padding:"10px 18px", background:"linear-gradient(135deg,#ff6584,#cc4466)" }}
                            onClick={async () => {
                              const nome = "simulado-enem-" + new Date().toISOString().slice(0,10);
                              try { await exportarPDF(questoesImport, nome, imgsImportRef.current); } catch(e) { alert("PDF: " + e.message); }
                            }}>
                            ⬇ Baixar PDF
                          </button>
                          <button className="btn-gerar"
                            style={{ fontSize:"13px", padding:"10px 18px", background:"linear-gradient(135deg,#43e8a0,#22aa70)", color:"#0d0d12" }}
                            onClick={async () => {
                              const nome = "simulado-enem-" + new Date().toISOString().slice(0,10);
                              try { await exportarDOCX(questoesImport, nome, imgsImportRef.current); } catch(e) { alert("Word: " + e.message); }
                            }}>
                            ⬇ Baixar Word
                          </button>
                          <button className="btn-ghost" style={{ fontSize:"13px", padding:"10px 16px" }}
                            onClick={() => downloadTXT(questoesImport)}>
                            ⬇ TXT
                          </button>
                        </div>
                        <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
                          <button className="btn-ghost" onClick={() => { setDownloadFeitoImport(false); setQuestoesImport([]); }}>
                            ↺ Gerar novo simulado
                          </button>
                          <button className="btn-ghost" onClick={() => setModo("avulsa")} style={{ color:"var(--accent)" }}>
                            👁 Ver questões na tela
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {erroImport && <div style={{ padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", marginBottom:"16px" }}>{erroImport}</div>}

                {!analise && !loadingImport && (
                  <button className="btn-gerar" onClick={analisarSimulado}
                    style={{ background:"linear-gradient(135deg,#ffd166,#ffaa00)", color:"#0d0d12" }}>
                    <span>🔍</span> Analisar estilo do simulado
                  </button>
                )}
                {loadingImport && (
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", color:"var(--muted)", fontSize:"13px" }}>
                    <span className="spin" style={{ display:"inline-block", fontSize:"18px" }}>⟳</span>
                    Analisando o simulado...
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {modo === "avulsa" && (
          <div style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }} className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px" }}>01</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Configure a questão</div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"28px", marginBottom:"24px" }}>
              <div>
                <div className="field-label">Área</div>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {DISCIPLINAS.map(d => {
                    const c = COR_DISC[d]; const ativo = disciplinas.includes(d);
                    return (
                      <button key={d} className="chip" onClick={() => toggleDisc(d)}
                        style={ativo ? { borderColor:c.border, background:c.bg, color:c.text } : {}}>
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="field-label">Nível</div>
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

            <div style={{ marginBottom:"22px" }}>
              <div className="field-label">Tipo de Item</div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {TIPOS_ITEM.map(t => (
                  <button key={t} className="chip" onClick={() => toggleTipo(t)}
                    style={tipos.includes(t) ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)" } : {}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"26px" }}>
              <div className="field-label">Tema / Contexto <span>— descreva o assunto que deve embasar a questão</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)} placeholder="Ex: desmatamento na Amazônia, transição energética, filosofia estoica..." rows={3} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584" }}>{erro}</div>}

            <div style={{ display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap" }}>
              <button className="btn-gerar" onClick={gerarQuestoes} disabled={loading || disciplinas.length === 0}>
                {loading
                  ? <><span className="spin" style={{ display:"inline-block", fontSize:"16px" }}>⟳</span> Gerando...</>
                  : <><span style={{ fontSize:"16px" }}>✦</span> Gerar questão</>
                }
              </button>
              {questoes.length > 0 && !loading && modo === "avulsa" && (
                <button className="btn-ghost" style={{ padding:"14px 20px", fontSize:"14px" }}
                  onClick={() => { setQuestoes([]); setResps({}); setRevs({}); setErro(""); setWikiImgs({}); }}>
                  ↺ Nova questão
                </button>
              )}
            </div>
            {disciplinas.length === 0 && (
              <div style={{ marginTop:"10px", fontSize:"12px", color:"var(--muted)" }}>
                ← Selecione ao menos uma área para gerar
              </div>
            )}
          </div>
        )}

        {modo === "simulado" && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"36px 28px", marginBottom:"28px", textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"16px" }}>⊞</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"22px", marginBottom:"8px" }}>
              Gerar simulado completo
            </div>
            <div style={{ fontSize:"14px", color:"var(--muted)", marginBottom:"28px" }}>
              Distribuição automática: 1/3 Fácil · 1/3 Médio · 1/3 Difícil<br/>
              Habilidades e disciplinas variadas · Gabaritos equilibrados
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"28px" }}>
              {[5,10,15,45].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={{ padding:"10px 22px", fontSize:"14px", ...(qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)", fontWeight:600 } : {}) }}>
                  {n} questões
                </button>
              ))}
            </div>

            <div style={{ maxWidth:"480px", margin:"0 auto 28px", textAlign:"left" }}>
              <div className="field-label" style={{ marginBottom:"8px" }}>Tema <span>— opcional, deixe em branco para sortear</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)}
                placeholder="Ex: globalização, movimentos sociais, filosofia política..." rows={2} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", textAlign:"left", maxWidth:"480px", margin:"0 auto 16px" }}>{erro}</div>}

            {downloadFeito ? (
              <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
                <div style={{ fontSize:"48px" }}>✅</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px" }}>Simulado gerado!</div>
                <div style={{ fontSize:"13px", color:"var(--muted)", marginBottom:"4px" }}>
                  PDF e Word baixados automaticamente. Se não apareceram, use os botões abaixo:
                </div>
                <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center" }}>
                  <button className="btn-gerar" style={{ fontSize:"13px", padding:"11px 20px", background:"linear-gradient(135deg,#ff6584,#cc4466)" }}
                    onClick={async () => { try { await exportarPDF(questoes, `simulado-enem-${new Date().toISOString().slice(0,10)}`); } catch(e) { alert("PDF falhou: " + e.message); } }}>
                    ⬇ Baixar PDF
                  </button>
                  <button className="btn-gerar" style={{ fontSize:"13px", padding:"11px 20px", background:"linear-gradient(135deg,#43e8a0,#22aa70)", color:"#0d0d12" }}
                    onClick={async () => { try { await exportarDOCX(questoes, `simulado-enem-${new Date().toISOString().slice(0,10)}`); } catch(e) { alert("Word falhou: " + e.message); } }}>
                    ⬇ Baixar Word
                  </button>
                  <button className="btn-ghost" style={{ fontSize:"13px", padding:"11px 18px" }}
                    onClick={() => { downloadTXT(questoes); }}>
                    ⬇ TXT
                  </button>
                </div>
                {erro && <div style={{ padding:"8px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"12px", color:"#ff6584", maxWidth:"440px" }}>{erro}</div>}
                <button className="btn-ghost" style={{ marginTop:"8px" }} onClick={() => { setDownloadFeito(false); setTema(""); setErro(""); setQuestoes([]); }}>
                  ↺ Gerar outro simulado
                </button>
              </div>
            ) : (
              <button className="btn-gerar" onClick={gerarQuestoes} disabled={loading}
                style={{ margin:"0 auto", fontSize:"16px", padding:"16px 36px" }}>
                {loading
                  ? <><span className="spin" style={{ display:"inline-block", fontSize:"16px" }}>⟳</span> {loadingMsg || "Gerando questões..."}</>
                  : <><span style={{ fontSize:"18px" }}>⊞</span> Gerar simulado ({qtdSimulado} questões)</>
                }
              </button>
            )}
          </div>
        )}

        {downloadFeitoImport && questoesImport.length > 0 && (
          <div className="fade-up" style={{ background:"rgba(255,209,102,.07)", border:"1.5px solid #ffd16655", borderRadius:"12px", padding:"14px 20px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
            <span style={{ fontSize:"18px" }}>✅</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"14px", flex:1 }}>
              {questoesImport.length} questões geradas no estilo do simulado importado
            </span>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px", background:"rgba(255,101,132,.15)", color:"#ff6584", border:"1px solid #ff658444" }}
                onClick={async () => { const n="simulado-enem-"+new Date().toISOString().slice(0,10); try{await exportarPDF(questoesImport,n,imgsImportRef.current);}catch(e){alert("PDF: "+e.message);} }}>
                ⬇ PDF
              </button>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px", background:"rgba(67,232,160,.15)", color:"#43e8a0", border:"1px solid #43e8a044" }}
                onClick={async () => { const n="simulado-enem-"+new Date().toISOString().slice(0,10); try{await exportarDOCX(questoesImport,n,imgsImportRef.current);}catch(e){alert("Word: "+e.message);} }}>
                ⬇ Word
              </button>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px" }}
                onClick={() => downloadTXT(questoesImport)}>
                ⬇ TXT
              </button>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px" }}
                onClick={() => { setDownloadFeitoImport(false); setQuestoesImport([]); setQuestoes([]); setModo("importar"); }}>
                ↺ Novo
              </button>
            </div>
          </div>
        )}

        {questoes.length > 0 && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"14px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px", fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>
                <span>PROGRESSO</span>
                <span>{totalR}/{questoes.length} respondidas · {totalA} acertos · ~{tempoT} min estimados</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{ width:`${prog}%` }} /></div>
            </div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              <button className="btn-ghost"
                style={{ background:"rgba(255,101,132,.12)", color:"#ff6584", border:"1px solid #ff658444" }}
                onClick={async () => {
                  const nome = "questao-enem-" + new Date().toISOString().slice(0,10);
                  try { await exportarPDF(questoes, nome); } catch(e) { alert("PDF: " + e.message); }
                }}>⬇ PDF</button>
              <button className="btn-ghost"
                style={{ background:"rgba(67,232,160,.12)", color:"#43e8a0", border:"1px solid #43e8a044" }}
                onClick={async () => {
                  const nome = "questao-enem-" + new Date().toISOString().slice(0,10);
                  try { await exportarDOCX(questoes, nome); } catch(e) { alert("Word: " + e.message); }
                }}>⬇ Word</button>
              <button className="btn-ghost" onClick={() => downloadTXT(questoes)}>⬇ TXT</button>
              <button className="btn-ghost" onClick={() => {
                const b=new Blob([JSON.stringify({questoes},null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="questao-enem.json";a.click();URL.revokeObjectURL(u);
              }}>⬇ JSON</button>
            </div>
          </div>
        )}

        {/* ── CORREÇÃO: wikiImgs passado como prop ── */}
        {questoes.map((q, i) => (
          <CartaoQuestao key={i} q={q} idx={i} total={questoes.length}
            wikiImgs={wikiImgs}
            resp={respostas[i]} onResp={l => setResps(r => ({...r,[i]:l}))}
            rev={!!revelados[i]} onRev={() => setRevs(r => ({...r,[i]:true}))} />
        ))}

        {questoes.length > 0 && totalR === questoes.length && (
          <div className="fade-up" style={{ background:"var(--surface)", border:`2px solid ${totalA/questoes.length>=0.7?"#43e8a0":"#ffd166"}`, borderRadius:"16px", padding:"36px", textAlign:"center", marginBottom:"20px" }}>
            <div style={{ fontSize:"52px", marginBottom:"14px" }}>{totalA/questoes.length>=0.7?"🏆":totalA/questoes.length>=0.5?"📚":"💪"}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"26px", fontWeight:800, marginBottom:"8px" }}>{totalA} de {questoes.length} corretas</div>
            <div style={{ fontSize:"14px", color:"var(--muted)", marginBottom:"24px" }}>{Math.round((totalA/questoes.length)*100)}% de aproveitamento</div>
            <button className="btn-gerar" onClick={gerarQuestoes} style={{ margin:"0 auto" }}>
              <span>✦</span> Gerar novo simulado
            </button>
          </div>
        )}

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
