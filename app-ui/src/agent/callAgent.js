// Direct browser → Anthropic API (educational use, user's own key).
// For a shared-key deployment, replace the fetch URL with a /api/ai proxy
// endpoint and remove the anthropic-dangerous-direct-browser-access header.
// That's the pattern used in Composer's Compass (app-ui/src/agent/callAgent.js).

export async function callAgent({ system, messages, onChunk, signal }) {
  const apiKey = localStorage.getItem('workshop:api-key');
  if (!apiKey) throw new Error('No API key set. Add your Anthropic API key in settings.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      stream: true,
      system,
      messages,
    }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `API error ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6).trim();
      if (json === '[DONE]') return;
      try {
        const event = JSON.parse(json);
        if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
          onChunk(event.delta.text);
        }
      } catch {}
    }
  }
}
