// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// ----- CORS (allow any origin in dev) -----
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ----- Serve static frontend (public folder) -----
app.use(express.static(path.join(__dirname, 'public')));

// ----- Health check -----
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ----- News endpoint -----
const NEWS_API_KEY = process.env.NEWSDATA_API_KEY;
app.get('/news', async (req, res) => {
  const { coin = 'bitcoin', page = '' } = req.query;
  const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(coin)}&language=en${page ? `&page=${page}` : ''}`;
  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.json(data);
  } catch (e) {
    console.error('News error:', e);
    res.status(500).json({ error: 'News fetch failed' });
  }
});

// ----- Price endpoint (CoinGecko) -----
app.get('/price', async (req, res) => {
  const { coin = 'bitcoin' } = req.query;
  const idMap = {
    bitcoin: 'bitcoin', btc: 'bitcoin',
    ethereum: 'ethereum', eth: 'ethereum',
    // add more if you want
  };
  const id = idMap[coin.toLowerCase()] || coin.toLowerCase();

  try {
    const apiRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
    const data = await apiRes.json();
    const price = data[id]?.usd ?? null;
    res.json({ coin: id, price: price ?? 'N/A' });
  } catch (e) {
    console.error('Price error:', e);
    res.status(500).json({ error: 'Price fetch failed' });
  }
});

// ----- Start -----
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));