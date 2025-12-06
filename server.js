const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

let lastWhale = "WHALE ALERT $42.7M BTC to Binance (3 min ago)";

// YOUR REAL BOT TOKEN
const BOT_TOKEN = "8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w";

// Store paid users (Telegram chat IDs)
const PREMIUM_USERS = new Set();

// SEND PUSH TO ALL PREMIUM USERS
async function sendPush(text) {
  for (const chatId of PREMIUM_USERS) {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
    } catch(e) {}
  }
}

// Fake whale every 30 sec (replace with real API later)
setInterval(async () => {
  const fakeUsd = (Math.random() * 40 + 10).toFixed(1);
  lastWhale = `WHALE ALERT $${fakeUsd}M BTC ? unknown wallet just now`;
  sendPush(lastWhale); // ? PUSHES TO ALL PAID USERS INSTANTLY
}, 30000);

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', async (req, res) => {
  const userId = req.query.id || "0";
  const isPremium = PREMIUM_USERS.has(userId);

  // Live price (your working code)
  let price = 91426, change = "+0.92";
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
    if (r.ok) { const j = await r.json(); price = Math.round(j.bitcoin.usd); change = j.bitcoin.usd_24h_change.toFixed(2); }
  } catch(e) {}

  const priceStr = "$" + price.toLocaleString("en-US");
  const color = change >= 0 ? "#0f0" : "#f66";

  res.write("<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Crypto Alpha Pro</title>");
  res.write("<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}.blur{filter:blur(12px);pointer-events:none}.btn{background:#0f0;color:#000;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:15px auto;width:90%;max-width:500px}</style>");
  res.write("<script src='https://js.stripe.com/v3/'></script></head><body>");
  res.write("<h1>CRYPTO ALPHA PRO</h1>");
  res.write(`<div class="p">${priceStr}</div>`);
  res.write(`<div style="font-size:2em;color:${color}">24h ${change >= 0 ? "+" : ""}${change}%</div>`);
  res.write("<canvas id='c'></canvas>");
  res.write(`<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em${isPremium?'':' class=\"blur\"'}">${lastWhale}</div>`);
  res.write("<div style='font-size:1.7em;color:#0f9'>AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>");
  if (!isPremium) {
    res.write("<div class='btn' onclick=\"location.href='https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot'\">Pay with Crypto (USDT/BTC/TON)</div>");
    res.write("<div class='btn' onclick=\"stripe.redirectToCheckout({lineItems:[{price:'prod_TYMpSYYnpnP7EI',quantity:1}],mode:'subscription',successUrl:location.href+'?id=777000',cancelUrl:location.href})\">Pay with Card / PayPal / Apple Pay</div>");
  } else {
    res.write("<div style='color:#0f9;font-size:2em'>PREMIUM ACTIVE — Push alerts ON</div>");
  }
  res.write("<script>const stripe=Stripe('pk_live_51SZvppGrBtr1rroCdgmOZhNQJJyBFGbYUM3XoflqogoL7ujZU122Dj77skxfOXKewdo3vF8C7a92WmDoshPBXt8100QUAxED7q');</script>");
  res.write("<script>const c=document.getElementById('c'),x=c.getContext('2d');c.width=600;c.height=280;x.fillStyle='#000';x.fillRect(0,0,600,280);x.strokeStyle='#0f0';x.lineWidth=8;x.beginPath();x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();x.fillStyle='rgba(0,255,0,0.3)';x.fill();</script>");
  res.write("</body></html>");
  res.end();
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
