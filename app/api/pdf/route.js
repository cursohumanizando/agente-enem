export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { questoes } = await request.json();

    // Gera HTML que o browser pode imprimir como PDF
    const html = buildHTML(questoes);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function buildHTML(questoes) {
  const questoesHTML = questoes.map((q, i) => {
    const opcoesHTML = (q.opcoes || []).map(op => `
      <div class="opcao">
        <span class="letra">${op.letra}</span>
        <span>${op.texto}</span>
      </div>
    `).join('');

    return `
      <div class="questao ${i > 0 ? 'page-break' : ''}">
        <div class="questao-header">
          <div class="numero">QuestÃ£o ${i + 1}</div>
          <div class="tags">
            <span class="tag area">${q.area || ''}</span>
            <span class="tag nivel nivel-${(q.nivel || '').toLowerCase().replace('Ã­','i').replace('Ã©','e')}">${q.nivel || ''}</span>
            <span class="tag hab">${(q.habilidade || '').match(/H\d+/)?.[0] || ''}</span>
          </div>
        </div>
        <div class="tema">${q.tema || ''}</div>
        <div class="texto-base">${(q.textoBase || '').replace(/\n/g, '<br>')}</div>
        <div class="fonte">${q.fonte || ''}</div>
        <div class="comando">${q.comando || ''}</div>
        <div class="opcoes">${opcoesHTML}</div>
      </div>
    `;
  }).join('');

  const gabarito = questoes.map((q, i) =>
    `<span class="gab-item"><strong>${i + 1}.</strong> ${q.gabarito}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Simulado ENEM Â· Humanizando</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Georgia', serif; color: #1a1a2e; background: #fff; padding: 0; }
  
  .capa {
    background: linear-gradient(135deg, #6c63ff, #9c63ff);
    color: white;
    padding: 40px 48px 32px;
    margin-bottom: 32px;
  }
  .capa-titulo { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; margin-bottom: 8px; font-family: monospace; }
  .capa-nome { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
  .capa-sub { font-size: 14px; opacity: 0.85; }
  .capa-info { display: flex; gap: 24px; margin-top: 20px; font-size: 12px; opacity: 0.9; }

  .questao { padding: 28px 48px; border-bottom: 1px solid #e8e8f0; }
  .questao:last-of-type { border-bottom: none; }
  
  .questao-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .numero { font-size: 13px; font-weight: 700; color: #6c63ff; font-family: monospace; letter-spacing: 1px; }
  .tags { display: flex; gap: 6px; }
  .tag { padding: 3px 10px; border-radius: 99px; font-size: 10px; font-family: monospace; font-weight: 600; }
  .tag.area { background: rgba(108,99,255,.12); color: #6c63ff; }
  .tag.nivel { background: rgba(67,232,160,.15); color: #1a7a50; }
  .tag.nivel-dificil { background: rgba(255,101,132,.12); color: #c0335a; }
  .tag.nivel-medio { background: rgba(255,209,102,.18); color: #8a6800; }
  .tag.hab { background: #f0f0fa; color: #6060a0; }

  .tema { font-size: 11px; color: #8080b0; font-family: monospace; margin-bottom: 14px; }
  
  .texto-base {
    border-left: 3px solid #6c63ff;
    padding: 14px 18px;
    background: #f8f8fe;
    font-size: 13px;
    line-height: 1.85;
    font-style: italic;
    color: #2a2a4a;
    margin-bottom: 6px;
    border-radius: 0 8px 8px 0;
  }
  .fonte { font-size: 11px; color: #9090b0; text-align: right; margin-bottom: 16px; font-family: monospace; }
  .comando { font-size: 14px; font-weight: 600; line-height: 1.6; margin-bottom: 16px; color: #1a1a2e; }
  
  .opcoes { display: flex; flex-direction: column; gap: 8px; }
  .opcao { display: flex; gap: 12px; align-items: flex-start; font-size: 13px; line-height: 1.6; }
  .letra { min-width: 24px; height: 24px; border-radius: 5px; background: #f0f0fa; color: #6060a0; font-weight: 700; font-family: monospace; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 1px; }

  .gabarito-section {
    margin: 0;
    padding: 28px 48px;
    background: #f8f8fe;
    border-top: 2px solid #6c63ff;
  }
  .gabarito-titulo { font-size: 13px; font-weight: 700; color: #6c63ff; font-family: monospace; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
  .gabarito-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .gab-item { font-size: 13px; min-width: 60px; }

  @media print {
    .questao { page-break-inside: avoid; }
    .page-break { page-break-before: auto; }
  }
</style>
</head>
<body>

<div class="capa">
  <div class="capa-titulo">Humanizando Â· Agente Elaborador ENEM</div>
  <div class="capa-nome">Simulado â€” CiÃªncias Humanas</div>
  <div class="capa-sub">CiÃªncias Humanas e suas Tecnologias Â· PadrÃ£o ENEM</div>
  <div class="capa-info">
    <span>ðŸ“‹ ${questoes.length} questÃµes</span>
    <span>ðŸ“… ${new Date().toLocaleDateString('pt-BR')}</span>
  </div>
</div>

${questoesHTML}

<div class="gabarito-section">
  <div class="gabarito-titulo">Gabarito</div>
  <div class="gabarito-grid">${gabarito}</div>
</div>

<script>
  window.onload = function() { window.print(); }
</script>
</body>
</html>`;
}
