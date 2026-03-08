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
        ${q.recursoVisual && q.recursoVisual.descricao ? `
        <div class="recurso-visual">
          <div class="recurso-icone">${
            q.recursoVisual.tipo === 'mapa' ? 'ðŸ—º' :
            q.recursoVisual.tipo === 'grÃ¡fico' ? 'ðŸ“Š' :
            q.recursoVisual.tipo === 'tabela' ? 'ðŸ“‹' :
            q.recursoVisual.tipo === 'charge' ? 'ðŸŽ¨' :
            q.recursoVisual.tipo === 'fotografia' ? 'ðŸ“·' : 'ðŸ“Œ'
          } ${(q.recursoVisual.tipo || '').toUpperCase()} SUGERIDO</div>
          <div class="recurso-desc">${q.recursoVisual.descricao}</div>
          ${q.recursoVisual.fonteRecurso ? `<div class="recurso-fonte">ðŸ“Ž Fonte: ${q.recursoVisual.fonteRecurso}</div>` : ''}
        </div>` : ''}
        <div class="comando">${q.comando || ''}</div>
        <div class="opcoes">${opcoesHTML}</div>

        <div class="gabarito-comentado">
          <div class="gab-header">
            <span class="gab-titulo">Gabarito Comentado</span>
            <span class="gab-letra">Gabarito: ${q.gabarito}</span>
          </div>

          ${q.opcoes.filter(op => op.correta).map(op => `
            <div class="gab-correta">
              <div class="gab-badge gab-badge-ok">${op.letra}</div>
              <div class="gab-body">
                <div class="gab-tag-ok">âœ“ Alternativa Correta</div>
                <div class="gab-texto">${op.explicacao || 'Esta alternativa responde diretamente ao que o comando solicita.'}</div>
              </div>
            </div>
          `).join('')}

          ${q.opcoes.filter(op => !op.correta).map(op => `
            <div class="gab-distrator">
              <div class="gab-badge gab-badge-err">${op.letra}</div>
              <div class="gab-body">
                <div class="gab-tag-err">âœ— Distrator</div>
                <div class="gab-texto">${op.explicacao || 'Alternativa incorreta.'}</div>
              </div>
            </div>
          `).join('')}

          ${q.habilidade ? `<div class="gab-habilidade">ðŸŽ¯ ${q.habilidade}</div>` : ''}
        </div>
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
  .fonte { font-size: 11px; color: #9090b0; text-align: right; margin-bottom: 10px; font-family: monospace; }
  .gabarito-comentado { margin-top: 18px; border-top: 1.5px solid #e0e0f0; padding-top: 16px; }
  .gab-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .gab-titulo { font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6c63ff; }
  .gab-letra { font-family: monospace; font-size: 11px; font-weight: 700; background: #e8f8f0; color: #228855; padding: 3px 10px; border-radius: 5px; border: 1px solid #aaddcc; }
  .gab-correta { display: flex; gap: 10px; padding: 12px; background: #f0faf5; border: 1.5px solid #aadecc; border-radius: 8px; margin-bottom: 8px; }
  .gab-distrator { display: flex; gap: 10px; padding: 10px 12px; background: #fff5f7; border: 1px solid #f0c0cc; border-radius: 8px; margin-bottom: 6px; }
  .gab-badge { width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: monospace; font-weight: 700; font-size: 12px; flex-shrink: 0; }
  .gab-badge-ok { background: #43c88a; color: white; }
  .gab-badge-err { background: #f0c0c8; color: #cc3355; }
  .gab-body { flex: 1; }
  .gab-tag-ok { font-size: 9px; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; color: #228855; margin-bottom: 4px; font-weight: 700; }
  .gab-tag-err { font-size: 9px; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; color: #cc3355; margin-bottom: 3px; font-weight: 700; }
  .gab-texto { font-size: 12px; color: #2a2a4a; line-height: 1.6; }
  .gab-habilidade { margin-top: 10px; padding: 8px 12px; background: #f0efff; border: 1px solid #cccaff; border-radius: 6px; font-size: 11px; color: #5550aa; font-family: monospace; line-height: 1.5; }
  .recurso-visual { border: 1.5px dashed #c8a820; background: #fefae8; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; }
  .recurso-icone { font-size: 10px; font-family: monospace; color: #8a6800; letter-spacing: 2px; font-weight: 700; margin-bottom: 5px; }
  .recurso-desc { font-size: 12px; color: #4a3800; line-height: 1.6; margin-bottom: 4px; }
  .recurso-fonte { font-size: 10px; color: #8a8060; font-family: monospace; }
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
