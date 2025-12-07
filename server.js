const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

let lastWhale = 'WHALE ALERT .7M BTC to Binance (3 min ago)';

// YOUR BOT TOKEN
const BOT_TOKEN = '8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w';

// YOUR STRIPE KEYS
const STRIPE_PK = 'pk_live_51SZvppGrBtr1rroCdgmOZhNQJJyBFGbYUM3XoflqogoL7ujZU122Dj77skxfOXKewdo3vF8C7a92WmDoshPBXt8100QUAxED7q';
const PRICE_ID = 'price_1SbG5OGrBtr1rroCCRGpjsyz';

// Store paid users
const PREMIUM_USERS = new Set();

// PUSH TO PREMIUM USERS
async function sendPush(text) {
  for (const chatId of PREMIUM_USERS) {
    try {
      await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(text));
    } catch(e) {}
  }
}

// REAL WHALES (BitQuery free — no key)
setInterval(async () => {
  try {
    const query = '{bitcoin(network: bitcoin){transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "100000000"}) {amount receiver {address} block {timestamp {time}} } } }';
    const r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      const j = await r.json();
      const t = j.data?.bitcoin?.transfers?.[0];
      if (t) {
        const btc = (t.amount / 1e8).toFixed(1);
        lastWhale = 'WHALE ALERT ' + btc + ' BTC (~$' + Math.round(btc * 89600).toLocaleString() + 'M) just now';
        sendPush(lastWhale);
      }
    }
  } catch(e) {}
}, 30000);

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', async (req, res) => {
  const userId = req.query.id || "0";
  const isPremium = PREMIUM_USERS.has(userId);

  let price = 89600, change = "-2.84";
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true", {timeout: 5000, headers: {'User-Agent': 'CryptoAlphaPro'}});
    if (r.ok) { const j = await r.json(); price = Math.round(j.bitcoin.usd); change = j.bitcoin.usd_24h_change.toFixed(2); }
  } catch(e) {}

  const priceStr = "$" + price.toLocaleString("en-US");
  const color = change >= 0 ? "#0f0" : "#f66";

  res.write("<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Crypto Alpha Pro</title>");
  res.write("<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}.blur{filter:blur(12px);pointer-events:none}.btn{background:#0f0;color:#000;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:15px auto;width:90%;max-width:500px}</style>");
  res.write("<script src='https://js.stripe.com/v3/'></script></head><body>");
  res.write("<h1>CRYPTO ALPHA PRO</h1>");
  res.write("<div class='p'>" + priceStr + "</div>");
  res.write("<div style='font-size:2em;color:" + color + "'>24h " + (change >= 0 ? "+" : "") + change + "%</div>");
  res.write("<canvas id='c'></canvas>");
  res.write("<div style='background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em" + (isPremium ? "" : " class='blur'") + "'>" + lastWhale + "</div>");
  res.write("<div style='font-size:1.7em;color:#0f9'>AI TRACKER Next pump in 4h 21m • Target: ,000+</div>");
  if (!isPremium) {
    res.write("<div class='btn' onclick=\"location.href='https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot'\">Pay with Crypto (USDT/BTC/TON)</div>");
    res.write("<div class='btn' onclick=\"stripe.redirectToCheckout({lineItems:[{price:'" + PRICE_ID + "',quantity:1}],mode:'subscription',successUrl:location.href+'?id=777000',cancelUrl:location.href})\" >Pay with Card / PayPal / Apple Pay</div>");
  } else {
    res.write("<div style='color:#0f9;font-size:2em'>PREMIUM ACTIVE</div>");
  }
  res.write("<script>const stripe=Stripe('" + STRIPE_PK + "');</script>");
  res.write("<script>const c=document.getElementById('c'),x=c.getContext('2d');c.width=600;c.height=280;x.fillStyle='#000';x.fillRect(0,0,600,280);x.strokeStyle='#0f0';x.lineWidth=8;x.beginPath();x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();x.fillStyle='rgba(0,255,0,0.3)';x.fill();</script>");
  res.write("</body></html>");
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
