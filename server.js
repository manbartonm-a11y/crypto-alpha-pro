const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', async (req, res) => {
  let price = 89600, change = "-2.84";
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
    if (r.ok) {
      const j = await r.json();
      price = Math.round(j.bitcoin.usd);
      change = j.bitcoin.usd_24h_change.toFixed(2);
    }
  } catch(e) {}

  const priceStr = "$" + price.toLocaleString("en-US");
  const color = change >= 0 ? "#0f0" : "#f66";

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crypto Alpha Pro</title>
<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}.blur{filter:blur(12px);pointer-events:none}.btn{background:#0f0;color:#000;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:15px auto;width:90%;max-width:500px}</style>
<script src="https://js.stripe.com/v3/"></script></head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${priceStr}</div>
<div style="font-size:2em;color:${color}">24h ${change>=0?"+":""}${change}%</div>
<canvas id="c"></canvas>
<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em class="blur">WHALE ALERT $42.7M BTC to Binance (3 min ago)</div>
<div style="font-size:1.7em;color:#0f9">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>
<div class="btn" onclick="location.href='https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot'">Pay with Crypto (USDT/BTC/TON)</div>
<div class="btn" onclick="stripe.redirectToCheckout({lineItems:[{price:'price_1SbG5OGrBtr1rroCCRGpjsyz',quantity:1}],mode:'subscription',successUrl:location.href+'?id=777000',cancelUrl:location.href})">Pay with Card / PayPal / Apple Pay</div>
<script>const stripe=Stripe('pk_live_51SZvppGrBtr1rroCdgmOZhNQJJyBFGbYUM3XoflqogoL7ujZU122Dj77skxfOXKewdo3vF8C7a92WmDoshPBXt8100QUAxED7q');</script>
<script>const c=document.getElementById("c"),x=c.getContext("2d");c.width=600;c.height=280;x.fillStyle="#000";x.fillRect(0,0,600,280);x.strokeStyle="#0f0";x.lineWidth=8;x.beginPath();x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();x.fillStyle="rgba(0,255,0,0.3)";x.fill();</script>
</body></html>`;

  res.send(html);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
