import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

if (!process.env.ANTHROPIC_API_KEY?.trim()) {
  console.error('ANTHROPIC_API_KEY is not set. Add it to server/.env before starting.');
  process.exit(1);
}

const app = express();
app.use(cors({ origin: /^http:\/\/localhost(:\d+)?$/ }));
app.use(express.json({ limit: '1mb' }));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';

app.post('/api/chat', async (req, res) => {
  const { system, messages } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }
  if (system !== undefined && typeof system !== 'string') {
    return res.status(400).json({ error: 'system must be a string' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    system,
    messages,
  });

  // Stop billing for tokens the client will never see if it disconnects.
  req.on('close', () => stream.abort());

  stream.on('text', (text) => {
    res.write(
      `data: ${JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text } })}\n\n`
    );
  });

  stream.on('finalMessage', () => {
    res.write('data: [DONE]\n\n');
    res.end();
  });

  stream.on('error', (err) => {
    if (req.destroyed) return;
    console.error('Anthropic stream error:', err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`Workshop server running on http://localhost:${PORT}`));
