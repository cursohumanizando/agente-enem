"use client";
import { useState, useEffect, useRef } from "react";

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

// ─── Matriz de Referência Oficial ENEM — Ciências Humanas e suas Tecnologias ──
// Fonte: INEP/MEC — H1 a H30 distribuídas por competência de área
// A matriz é compartilhada por todas as 4 disciplinas; filtramos por afinidade temática.

const HABILIDADES_TODAS = [
  // Competência 1 — Identidades e cultura
  { id:"H1",  texto:"H1 — Interpretar historicamente e/ou geograficamente fontes documentais acerca de aspectos da cultura.", disciplinas:["História","Sociologia","Filosofia"] },
  { id:"H2",  texto:"H2 — Analisar a produção da memória pelas sociedades humanas.", disciplinas:["História","Sociologia","Filosofia"] },
  { id:"H3",  texto:"H3 — Associar as manifestações culturais do presente aos seus processos históricos.", disciplinas:["História","Sociologia"] },
  { id:"H4",  texto:"H4 — Comparar pontos de vista expressos em diferentes fontes sobre determinado aspecto da cultura.", disciplinas:["História","Filosofia","Sociologia"] },
  { id:"H5",  texto:"H5 — Identificar as manifestações ou representações da diversidade do patrimônio cultural e artístico em diferentes sociedades.", disciplinas:["História","Sociologia"] },
  // Competência 2 — Espaços geográficos e poder
  { id:"H6",  texto:"H6 — Interpretar diferentes representações gráficas e cartográficas dos espaços geográficos.", disciplinas:["Geografia"] },
  { id:"H7",  texto:"H7 — Identificar os significados histórico-geográficos das relações de poder entre as nações.", disciplinas:["Geografia","História"] },
  { id:"H8",  texto:"H8 — Analisar a ação dos estados nacionais no que se refere à dinâmica dos fluxos populacionais e no enfrentamento de problemas de ordem econômico-social.", disciplinas:["Geografia","História","Sociologia"] },
  { id:"H9",  texto:"H9 — Comparar o significado histórico-geográfico das organizações políticas e socioeconômicas em escala local, regional ou mundial.", disciplinas:["Geografia","História"] },
  { id:"H10", texto:"H10 — Reconhecer a dinâmica da organização dos movimentos sociais e a importância da participação da coletividade na transformação da realidade histórico-geográfica.", disciplinas:["Sociologia","História","Geografia"] },
  // Competência 3 — Instituições sociais, políticas e econômicas
  { id:"H11", texto:"H11 — Identificar registros de práticas de grupos sociais no tempo e no espaço.", disciplinas:["História","Sociologia"] },
  { id:"H12", texto:"H12 — Analisar o papel da justiça como instituição na organização das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H13", texto:"H13 — Analisar a atuação dos movimentos sociais que contribuíram para mudanças ou rupturas em processos de disputa pelo poder.", disciplinas:["História","Sociologia"] },
  { id:"H14", texto:"H14 — Comparar diferentes pontos de vista, presentes em textos analíticos e interpretativos, sobre situação ou fatos de natureza histórico-geográfica acerca das instituições sociais, políticas e econômicas.", disciplinas:["História","Filosofia","Sociologia"] },
  { id:"H15", texto:"H15 — Avaliar criticamente conflitos culturais, sociais, políticos, econômicos ou ambientais ao longo da história.", disciplinas:["História","Sociologia","Filosofia"] },
  // Competência 4 — Técnica, tecnologia e produção
  { id:"H16", texto:"H16 — Identificar registros sobre o papel das técnicas e tecnologias na organização do trabalho e/ou da vida social.", disciplinas:["Sociologia","História","Geografia"] },
  { id:"H17", texto:"H17 — Analisar fatores que explicam o impacto das novas tecnologias no processo de territorialização da produção.", disciplinas:["Geografia","Sociologia"] },
  { id:"H18", texto:"H18 — Analisar diferentes processos de produção ou circulação de riquezas e suas implicações sócio-espaciais.", disciplinas:["Geografia","Sociologia","História"] },
  { id:"H19", texto:"H19 — Reconhecer as transformações técnicas e tecnológicas que determinam as várias formas de uso e apropriação dos espaços rural e urbano.", disciplinas:["Geografia","Sociologia"] },
  { id:"H20", texto:"H20 — Selecionar argumentos favoráveis ou contrários às modificações impostas pelas novas tecnologias à vida social e ao mundo do trabalho.", disciplinas:["Filosofia","Sociologia"] },
  // Competência 5 — Cidadania e democracia
  { id:"H21", texto:"H21 — Identificar o papel dos meios de comunicação na construção da vida social.", disciplinas:["Sociologia","Filosofia"] },
  { id:"H22", texto:"H22 — Analisar as lutas sociais e conquistas obtidas no que se refere às mudanças nas legislações ou nas políticas públicas.", disciplinas:["História","Sociologia"] },
  { id:"H23", texto:"H23 — Analisar a importância dos valores éticos na estruturação política das sociedades.", disciplinas:["Filosofia","Sociologia"] },
  { id:"H24", texto:"H24 — Relacionar cidadania e democracia na organização das sociedades.", disciplinas:["Filosofia","Sociologia","História"] },
  { id:"H25", texto:"H25 — Identificar estratégias que promovam formas de inclusão social.", disciplinas:["Sociologia","História"] },
  // Competência 6 — Sociedade, natureza e ambiente
  { id:"H26", texto:"H26 — Identificar em fontes diversas o processo de ocupação dos meios físicos e as relações da vida humana com a paisagem.", disciplinas:["Geografia"] },
  { id:"H27", texto:"H27 — Analisar de maneira crítica as interações da sociedade com o meio físico, levando em consideração aspectos históricos e/ou geográficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H28", texto:"H28 — Relacionar o uso das tecnologias com os impactos sócio-ambientais em diferentes contextos histórico-geográficos.", disciplinas:["Geografia","Sociologia"] },
  { id:"H29", texto:"H29 — Reconhecer a função dos recursos naturais na produção do espaço geográfico, relacionando-os com as mudanças provocadas pelas ações humanas.", disciplinas:["Geografia"] },
  { id:"H30", texto:"H30 — Avaliar as relações entre preservação e degradação da vida no planeta nas diferentes escalas.", disciplinas:["Geografia","Sociologia","História"] },
];

// Indexado por disciplina para o dropdown
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

// ─── Prompt builder ───────────────────────────────────────────────────────────
function buildDistribuicao(qtd, niveisSel) {
  const sel = ["Fácil","Médio","Difícil"].filter(n => niveisSel.includes(n));
  const base = Math.floor(qtd / sel.length);
  let resto = qtd % sel.length;
  const dist = [];
  sel.forEach(n => { const q = base + (resto-- > 0 ? 1 : 0); for (let i=0;i<q;i++) dist.push(n); });
  return dist;
}

// Eixos cognitivos oficiais ENEM (comuns a todas as áreas)
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
  const lista = dist.map((n, i) => "Q"+(i+1)+": "+n+" — disciplina: "+listaDisc[i]+" — tipo: "+listaTipo[i]+" — gabarito: "+gabs[i]).join("\n");
  // Apenas os códigos para reduzir tokens
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
    "🟢 FÁCIL — COMPREENSÃO: verbo evidencia/demonstra/caracteriza, texto 5–7 linhas, distratores óbvios.\n" +
    "🟡 MÉDIO — ANÁLISE: verbo permite reconhecer/contribui para, texto 7–10 linhas, distratores plausíveis.\n" +
    "🔴 DIFÍCIL — SÍNTESE: verbo permite inferir/revela a tensão entre, texto 10–12 linhas ou dois textos, distratores sofisticados.\n\n" +
    "═══ REGRAS OBRIGATÓRIAS ═══\n" +
    "1. Texto-base suficiente e necessário\n" +
    "2. PROIBIDO: \"segundo o texto\" / \"de acordo com o texto\" / \"com base no texto\"\n" +
    "3. Alternativas nominais paralelas, 6–20 palavras\n" +
    "4. Distratores com desvios distintos: generalização indevida | redução indevida | inversão de causalidade | deslocamento temporal | confusão conceitual | relação parcial\n" +
    "5. Fonte real com autor e ano\n" +
    "6. Gabarito EXATAMENTE a letra indicada na lista\n" +
    "7. Campo \"habilidade\" com código oficial (ex: H8) e enunciado completo\n" +
    "8. RECURSO VISUAL: quando o tipo for \"Leitura de dados / gráfico\" ou o tema envolver dados espaciais/estatísticos, preencha recursoVisual com tipo, descricao e fonteRecurso (URL real). Caso contrário, use null.\n\n" +
    'Responda SOMENTE JSON válido sem markdown:\n{"questoes":[{"tema":"","nivel":"Fácil|Médio|Difícil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|gráfico|tabela|charge|fotografia|infográfico","descricao":"","fonteRecurso":""},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}';
}


// ─── CSS Global ───────────────────────────────────────────────────────────────
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

// ─── Componente: Badge de tempo ───────────────────────────────────────────────
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

// ─── Componente: Cartão de questão ────────────────────────────────────────────
function CartaoQuestao({ q, idx, total, resp, onResp, rev, onRev }) {
  const nc = NIVEL_COR[q.nivel] || NIVEL_COR.Médio;
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
              {q.recursoVisual.tipo === "mapa" ? "🗺" : q.recursoVisual.tipo === "gráfico" ? "📊" : q.recursoVisual.tipo === "tabela" ? "📋" : q.recursoVisual.tipo === "charge" ? "🎨" : q.recursoVisual.tipo === "fotografia" ? "📷" : "📌"}
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
                  📎 Fonte: {q.recursoVisual.fonteRecurso}
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
                  {rev && <div style={{ marginTop:"5px", fontSize:"12px", color:op.correta?"#43e8a0":"var(--muted)", fontStyle:"italic" }}>{op.correta?"✓ Correta — ":"✗ "}{op.explicacao}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Ação — resposta interativa */}
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

        {/* Gabarito Comentado — sempre visível */}
        <div style={{ marginTop:"20px", borderTop:"1px solid var(--border)", paddingTop:"18px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
            <div style={{ width:"6px", height:"20px", background:"linear-gradient(180deg,#6c63ff,#43e8a0)", borderRadius:"3px" }} />
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"13px", letterSpacing:"1px", textTransform:"uppercase", color:"var(--label)" }}>
              Gabarito Comentado
            </span>
            <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"3px 10px", background:"rgba(67,232,160,.12)", border:"1px solid #43e8a044", borderRadius:"6px", color:"#43e8a0" }}>
              Gabarito: {q.gabarito}
            </span>
          </div>

          {/* Justificativa da correta */}
          {q.opcoes.filter(op => op.correta).map(op => (
            <div key={op.letra} style={{ display:"flex", gap:"12px", padding:"14px 16px", background:"rgba(67,232,160,.06)", border:"1.5px solid #43e8a033", borderRadius:"10px", marginBottom:"10px" }}>
              <div style={{ flexShrink:0, width:"28px", height:"28px", borderRadius:"7px", background:"#43e8a0", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", color:"#0d0d12" }}>
                {op.letra}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"11px", fontFamily:"'DM Mono',monospace", color:"#43e8a0", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px" }}>
                  ✓ Alternativa Correta
                </div>
                <div style={{ fontSize:"13px", color:"#c0e8d0", lineHeight:1.7 }}>
                  {op.explicacao || "Esta alternativa está correta pois responde diretamente ao que o comando solicita."}
                </div>
              </div>
            </div>
          ))}

          {/* Distratores */}
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {q.opcoes.filter(op => !op.correta).map(op => (
              <div key={op.letra} style={{ display:"flex", gap:"12px", padding:"12px 16px", background:"rgba(255,101,132,.04)", border:"1px solid #ff658422", borderRadius:"10px" }}>
                <div style={{ flexShrink:0, width:"28px", height:"28px", borderRadius:"7px", background:"rgba(255,101,132,.15)", border:"1px solid #ff658444", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"13px", color:"#ff6584" }}>
                  {op.letra}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"11px", fontFamily:"'DM Mono',monospace", color:"#ff8099", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"4px" }}>
                    ✗ Distrator
                  </div>
                  <div style={{ fontSize:"13px", color:"#b0a0a8", lineHeight:1.65 }}>
                    {op.explicacao || "Alternativa incorreta."}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Habilidade */}
          {q.habilidade && (
            <div style={{ marginTop:"12px", padding:"10px 14px", background:"rgba(108,99,255,.07)", border:"1px solid #6c63ff33", borderRadius:"8px", fontSize:"12px", color:"var(--label)", fontFamily:"'DM Mono',monospace", lineHeight:1.6 }}>
              🎯 {q.habilidade}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Prompt de análise de estilo ─────────────────────────────────────────────
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

// ─── App Principal ────────────────────────────────────────────────────────────
export default function App() {
  // Config
  const [modo, setModo]           = useState("avulsa"); // "avulsa" | "simulado"
  const [qtdSimulado, setQtd]     = useState(10);
  const [disciplinas, setDiscs]   = useState(["Sociologia"]);
  const [niveis, setNiveis]       = useState(["Fácil"]);
  const [tipos, setTipos]         = useState(["Interpretação de texto"]);
  const [tema, setTema]           = useState("");

  // Questões
  const [questoes, setQuestoes]   = useState([]);
  const [respostas, setResps]     = useState({});
  const [revelados, setRevs]      = useState({});
  const [loading, setLoading]     = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [downloadFeito, setDownloadFeito] = useState(false);
  const [erro, setErro]           = useState("");

  // Estado importador
  const [arquivoImport, setArquivo]     = useState(null); // { nome, tipo, conteudo }
  const [analise, setAnalise]           = useState(null); // resultado da análise do Claude
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

  // ── loadScript: carrega lib via CDN e resolve só quando window[name] existir ──
  function loadScript(src, windowKey) {
    return new Promise((resolve, reject) => {
      if (window[windowKey]) { resolve(window[windowKey]); return; }
      const sc = document.createElement("script");
      sc.src = src;
      sc.onload = () => {
        // Aguarda até o objeto estar disponível (algumas libs registram async)
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

  // ── Exportar PDF via servidor ──
  async function exportarPDF(qs, nomeArq) {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questoes: qs }),
    });
    if (!res.ok) throw new Error("Falha ao gerar PDF");
    const html = await res.text();
    const win = window.open("", "_blank");
    if (!win) throw new Error("Popup bloqueado — permita popups para este site");
    win.document.write(html);
    win.document.close();
  }

  // ── Exportar DOCX via servidor ──
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

  // ── Exportar PDF via jsPDF (legado, não chamado) ──
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

    // Cabeçalho
    doc.setFillColor(108, 99, 255);
    doc.rect(0, 0, 210, 13, "F");
    doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.setTextColor(255,255,255);
    doc.text("HUMANIZANDO  ·  AGENTE ELABORADOR ENEM  ·  CIÊNCIAS HUMANAS", mL, 8.5);
    y = mT + 4;

    qs.forEach((q, i) => {
      if (i > 0) { linha(); y += 2; }
      const hab = q.habilidade?.match(/H\d+/)?.[0] || "";
      bloco(`Q${i+1}  ·  ${(q.nivel||"").toUpperCase()}  ·  ${hab}`, 8, false, [120,100,220]);
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

    // Gabarito numa página nova
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
  // ── Leitura de arquivo ──
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
        setErroImport("Não foi possível carregar o leitor de Word. Verifique sua conexão.");
      }
    }
  }

  // ── Análise do simulado importado ──
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

  // ── Download TXT ──
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

  // ── Gerar questões (avulsa ou simulado) em lotes de 3 ──
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
      setQuestoes(qs); setLoadingMsg(""); setLoading(false); return;
    }

    setQuestoes(qs);
    const nomeArq = "simulado-enem-" + new Date().toISOString().slice(0,10);
    const errosExport = [];
    try { setLoadingMsg("Gerando PDF..."); await exportarPDF(qs, nomeArq); } catch(e) { errosExport.push("PDF"); }
    try { setLoadingMsg("Gerando Word..."); await exportarDOCX(qs, nomeArq); } catch(e) { errosExport.push("Word"); }
    setLoadingMsg(""); setLoading(false); setDownloadFeito(true);
    if (errosExport.length > 0) setErro("Não foi possível gerar automaticamente: " + errosExport.join(", ") + ". Use os botões abaixo.");
  }

  // ── Gerar questões no estilo do simulado importado (em lotes de 3) ──
  async function gerarNoEstilo() {
    if (!analise) return;
    setErro(""); setLoading(true); setQuestoes([]); setResps({}); setRevs({});

    const disc = analise.disciplinas?.[0] || "Geografia";
    const letras = ["A","B","C","D","E"];
    const nivelCiclo = ["Fácil","Médio","Difícil"];
    const LOTE = 3; // máximo por chamada para não estourar timeout
    const totalLotes = Math.ceil(qtdImport / LOTE);
    const todasQuestoes = [];

    function buildPromptLote(offset, qtdLote) {
      const gabs = Array.from({ length: qtdLote }, (_, i) => letras[(offset + i) % 5]);
      const niveis = Array.from({ length: qtdLote }, (_, i) => nivelCiclo[(offset + i) % 3]);
      const lista = niveis.map((n, i) => "Q" + (i+1) + ": " + n + " — gabarito: " + gabs[i]).join("\n");
      return "Você é elaborador ENEM. Gere EXATAMENTE " + qtdLote + " questão(ões) novas no estilo abaixo.\n\n" +
        "DISCIPLINAS: " + analise.disciplinas?.join(", ") + "\n" +
        "HABILIDADES: " + analise.habilidades?.join(", ") + "\n" +
        "TIPOS DE TEXTO: " + analise.tiposTexto?.join(", ") + "\n" +
        "COMANDOS: " + analise.padraoComandos + "\n" +
        "DISTRATORES: " + analise.complexidadeDistratores + "\n" +
        "TEMAS: " + analise.temas?.join(", ") + "\n" +
        "ESTILO: " + analise.observacoesEstilo + "\n\n" +
        "DISTRIBUIÇÃO:\n" + lista + "\n\n" +
        "REGRAS: texto-base necessário, sem 'segundo o texto', alternativas paralelas (6-20 palavras), distratores distintos, fonte real com ano, gabarito exato da lista.\n\n" +
        "RECURSO VISUAL: quando necessário, preencha recursoVisual com tipo, descricao e fonteRecurso (URL/publicação real onde encontrar). Se não houver, use null.\n\n" +
        "Responda SOMENTE JSON válido sem markdown:\n" +
        '{"questoes":[{"tema":"","nivel":"Fácil|Médio|Difícil","textoBase":"","fonte":"","comando":"","recursoVisual":{"tipo":"mapa|gráfico|tabela|charge|fotografia|infográfico","descricao":"","fonteRecurso":""},"opcoes":[{"letra":"A","texto":"","correta":false,"explicacao":""},{"letra":"B","texto":"","correta":false,"explicacao":""},{"letra":"C","texto":"","correta":false,"explicacao":""},{"letra":"D","texto":"","correta":false,"explicacao":""},{"letra":"E","texto":"","correta":false,"explicacao":""}],"gabarito":"","habilidade":"","competencia":"","eixo":""}]}';
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
      setQuestoes(qs);
      setQuestoesImport(qs);
      setLoadingMsg("");
      setDownloadFeitoImport(true);
      setModo("avulsa"); // mostrar questões automaticamente

    } catch(e) {
      setErro("Erro ao gerar questões: " + e.message);
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  // ── Render ──
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>

      {/* ── Header ── */}
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

      {/* ── Conteúdo ── */}
      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"32px 24px" }}>

        {/* ── Tabs ── */}
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
              {[5,10,15].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)" } : {}}>
                  {n} questões
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Painel Importar ── */}
        {modo === "importar" && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#ffd166,#ffaa00)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px", color:"#0d0d12" }}>⬆</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Importar simulado de referência</div>
                <div style={{ fontSize:"12px", color:"var(--muted)", marginTop:"2px" }}>PDF ou Word (.docx) — o agente analisa o estilo e gera novas questões na mesma linha</div>
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
                {/* Arquivo carregado */}
                <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", background:"var(--panel)", border:"1.5px solid var(--border2)", borderRadius:"10px", marginBottom:"20px" }}>
                  <span style={{ fontSize:"22px" }}>{arquivoImport.tipo==="pdf"?"📕":"📘"}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:"14px" }}>{arquivoImport.nome}</div>
                    <div style={{ fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>{arquivoImport.tipo.toUpperCase()} · pronto para análise</div>
                  </div>
                  <button className="btn-ghost" style={{ fontSize:"12px" }} onClick={() => { setArquivo(null); setAnalise(null); setErroImport(""); }}>✕ Remover</button>
                </div>

                {/* Resultado da análise */}
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

                    {/* Qtd + Gerar */}
                    <div style={{ marginTop:"20px", paddingTop:"16px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
                      <div style={{ color:"var(--muted)", fontSize:"13px" }}>Gerar</div>
                      {[3,5,10,15].map(n => (
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

                    {/* Painel de download pós-geração */}
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
                              try { await exportarPDF(questoesImport, nome); } catch(e) { alert("PDF: " + e.message); }
                            }}>
                            ⬇ Baixar PDF
                          </button>
                          <button className="btn-gerar"
                            style={{ fontSize:"13px", padding:"10px 18px", background:"linear-gradient(135deg,#43e8a0,#22aa70)", color:"#0d0d12" }}
                            onClick={async () => {
                              const nome = "simulado-enem-" + new Date().toISOString().slice(0,10);
                              try { await exportarDOCX(questoesImport, nome); } catch(e) { alert("Word: " + e.message); }
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

                {/* Erro importação */}
                {erroImport && <div style={{ padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", marginBottom:"16px" }}>{erroImport}</div>}

                {/* Botão analisar */}
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

        {/* ── Formulário — apenas questão avulsa ── */}
        {modo === "avulsa" && (
          <div style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"28px", marginBottom:"28px" }} className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#6c63ff,#9c63ff)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"12px" }}>01</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"17px" }}>Configure a questão</div>
            </div>

            {/* Área + Nível */}
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

            {/* Tipo de Item */}
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

            {/* Tema */}
            <div style={{ marginBottom:"26px" }}>
              <div className="field-label">Tema / Contexto <span>— descreva o assunto que deve embasar a questão</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)} placeholder="Ex: desmatamento na Amazônia, transição energética, filosofia estoica..." rows={3} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584" }}>{erro}</div>}

            <button className="btn-gerar" onClick={gerarQuestoes} disabled={loading}>
              {loading
                ? <><span className="spin" style={{ display:"inline-block", fontSize:"16px" }}>⟳</span> Gerando...</>
                : <><span style={{ fontSize:"16px" }}>✦</span> Gerar questão</>
              }
            </button>
          </div>
        )}

        {/* ── Modo Simulado — painel direto ── */}
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

            {/* Qtd */}
            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"28px" }}>
              {[5,10,15].map(n => (
                <button key={n} className="chip" onClick={() => setQtd(n)}
                  style={{ padding:"10px 22px", fontSize:"14px", ...(qtdSimulado===n ? { borderColor:"var(--accent)", background:"rgba(108,99,255,.15)", color:"var(--accent)", fontWeight:600 } : {}) }}>
                  {n} questões
                </button>
              ))}
            </div>

            {/* Tema opcional */}
            <div style={{ maxWidth:"480px", margin:"0 auto 28px", textAlign:"left" }}>
              <div className="field-label" style={{ marginBottom:"8px" }}>Tema <span>— opcional, deixe em branco para sortear</span></div>
              <textarea className="textarea" value={tema} onChange={e => setTema(e.target.value)}
                placeholder="Ex: globalização, movimentos sociais, filosofia política..." rows={2} />
            </div>

            {erro && <div style={{ marginBottom:"16px", padding:"10px 14px", background:"rgba(255,101,132,.1)", border:"1px solid #ff658466", borderRadius:"8px", fontSize:"13px", color:"#ff6584", textAlign:"left", maxWidth:"480px", margin:"0 auto 16px" }}>{erro}</div>}

            {downloadFeito ? (
              <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
                <div style={{ fontSize:"48px" }}>✅</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"18px" }}>
                  Simulado gerado!
                </div>
                <div style={{ fontSize:"13px", color:"var(--muted)", marginBottom:"4px" }}>
                  PDF e Word baixados automaticamente. Se não apareceram, use os botões abaixo:
                </div>

                {/* Botões de download manual — sempre funcionam */}
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

        {/* ── Banner de download pós-importar ── */}
        {downloadFeitoImport && questoesImport.length > 0 && (
          <div className="fade-up" style={{ background:"rgba(255,209,102,.07)", border:"1.5px solid #ffd16655", borderRadius:"12px", padding:"14px 20px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
            <span style={{ fontSize:"18px" }}>✅</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"14px", flex:1 }}>
              {questoesImport.length} questões geradas no estilo do simulado importado
            </span>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px", background:"rgba(255,101,132,.15)", color:"#ff6584", border:"1px solid #ff658444" }}
                onClick={async () => { const n="simulado-enem-"+new Date().toISOString().slice(0,10); try{await exportarPDF(questoesImport,n);}catch(e){alert("PDF: "+e.message);} }}>
                ⬇ PDF
              </button>
              <button className="btn-ghost" style={{ fontSize:"12px", padding:"7px 14px", background:"rgba(67,232,160,.15)", color:"#43e8a0", border:"1px solid #43e8a044" }}
                onClick={async () => { const n="simulado-enem-"+new Date().toISOString().slice(0,10); try{await exportarDOCX(questoesImport,n);}catch(e){alert("Word: "+e.message);} }}>
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

        {/* ── Barra de progresso ── */}
        {questoes.length > 0 && (
          <div className="fade-up" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"14px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px", fontSize:"11px", color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>
                <span>PROGRESSO</span>
                <span>{totalR}/{questoes.length} respondidas · {totalA} acertos · ~{tempoT} min estimados</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{ width:`${prog}%` }} /></div>
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
              <button className="btn-ghost" onClick={() => downloadTXT(questoes)}>⬇ TXT</button>
              <button className="btn-ghost" onClick={() => {
                const b=new Blob([JSON.stringify({questoes},null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="simulado-enem.json";a.click();URL.revokeObjectURL(u);
              }}>⬇ JSON</button>
            </div>
          </div>
        )}

        {/* ── Questões ── */}
        {questoes.map((q, i) => (
          <CartaoQuestao key={i} q={q} idx={i} total={questoes.length}
            resp={respostas[i]} onResp={l => setResps(r => ({...r,[i]:l}))}
            rev={!!revelados[i]} onRev={() => setRevs(r => ({...r,[i]:true}))} />
        ))}

        {/* ── Resultado final ── */}
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

        {/* ── Loading state ── */}
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
