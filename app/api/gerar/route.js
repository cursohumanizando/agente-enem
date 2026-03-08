xport const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();

    // ForÃ§ar max_tokens alto para garantir que questÃµes longas nÃ£o sejam cortadas
    const payload = {
      ...body,
      max_tokens: 16000,
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: { message: error.message } }, { status: 500 });
  }
}
