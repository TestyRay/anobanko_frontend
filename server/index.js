import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const saleBotUrl =
  process.env.SALEBOT_TG_CALLBACK_URL ||
  'https://chatter.salebot.pro/api/80ad1cd7a6abb881e200652404f0491d/tg_callback';

app.use(express.json({ limit: '1mb' }));

app.post('/api/tg-callback', async (req, res) => {
  try {
    const response = await fetch(saleBotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error('Salebot proxy error:', error);
    res.status(502).json({ error: 'Failed to reach Salebot' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
