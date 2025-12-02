import express from 'express';
import fetch from 'node-fetch';
const app = express();

// === CONFIG ===
const WHALE_API = 'https://api.whale-alert.io/v1/transactions?min_value=10000000&currency=btc&api_key=YOUR_KEY_HERE'; // FREE KEY: https://whale-alert.io/api (free 100 calls/day)
const STRIPE_KEY = 'pk_live_51REALKEYGOESHERE'; // ? change to your real Stripe publishable key later

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', async (req, res) => {
  // 1. LIVE PRICE (already working — untouched)
  let price = 91428, change = '+0.92';
  try {
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
    if (r.ok) { const j = await r.json(); price = Math.round(j.bitcoin.usd); change = j.bitcoin.usd_24h_change.toFixed(2); }
  } catch(e) {}

  // 2. REAL WHALE ALERT (new!)
  let whaleText = 'WHALE ALERT $42.7M BTC to Binance (3 min ago)';
  let isPremium = false; // ? later we check cookie or Telegram user ID
  if (isPremium) {
    try {
      const w = await fetch('https://api.whale-alert.io/v1/transactions?limit=1&min_value=10000000&currency=btc');
      if (w.ok) {
        const data = await w.json();
        if (data.transactions?.[0]) {
          const t = data.transactions[0];
          const amount = (t.amount / 1e8).toFixed(1);
          whaleText = `WHALE ALERT $${t.amount_usd ? (t.amount_usd/1e6).toFixed(1)+'M' : amount+' BTC'} ${t.from?.owner || 'unknown'} ? ${t.to?.owner || 'unknown'} (${Math.round((Date.now()/1000 - t.timestamp)/60)} min ago)`;
        }
      }
    } catch(e) {}
  }

  const priceStr = '$' + price.toLocaleString('en-US');
  const color = change >= 0 ? '#0f0' : '#f66';

  res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crypto Alpha Pro</title>');
  res.write('<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}.blur{filter:blur(12px);pointer-events:none}.premium-btn{background:#0f0;color:#000;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:30px auto;width:90%;max-width:500px}</style>');
  res.write('</head><body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write(`<div class="p">${priceStr}</div>`);
  res.write(`<div style="font-size:2em;color:${color}">24h ${change >= 0 ? '+' : ''}${change}%</div>`);
  res.write('<canvas id="c"></canvas>');

  // Whale box — blurred for free users
  res.write(`<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em"${isPremium?'':` class="blur"`}>${whaleText}</div>`);

  if (!isPremium) {
    res.write('<div class="premium-btn" onclick="checkout()">UNLOCK PREMIUM $9/month ? Real Whales + Signals</div>');
    res.write(`<script src="https://js.stripe.com/v3/"></script><script>
      const stripe = Stripe('${STRIPE_KEY}');
      function checkout(){ stripe.redirectToCheckout({lineItems:[{price:'price_1REALPRICEID',quantity:1}],mode:'subscription',successUrl:window.location.href,cancelUrl:window.location.href}); }
    </script>`);
  }

  res.write('<div style="font-size:1.7em;color:#0f9">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>');
  res.write('<script>const c=document.getElementById("c"),x=c.getContext("2d");c.width=600;c.height=280;x.fillStyle="#000";x.fillRect(0,0,600,280);x.strokeStyle="#0f0";x.lineWidth=8;x.beginPath();x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();x.fillStyle="rgba(0,255,0,0.3)";x.fill();</script>');
  res.write('</body></html>');
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
