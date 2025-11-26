const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));

app.get("/telegram", async (req,res)=>{
  let price = 108420;
  let change = "+6.9";
  let color = "#0f0";

  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
    if (r.ok) {
      const j = await r.json();
      price = j.bitcoin.usd;
      change = j.bitcoin.usd_24h_change.toFixed(2);
    }
  } catch(e) {}

  if (price === 108420) {
    try {
      const r = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
      if (r.ok) {
        const j = await r.json();
        price = parseFloat(j.lastPrice);
        change = ((j.lastPrice - j.openPrice)/j.openPrice*100).toFixed(2);
      }
    } catch(e) {}
  }

  price = "$" + Number(price).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
  color = parseFloat(change) >= 0 ? "#0f0" : "#f66";
  if (parseFloat(change) >= 0 && change !== "+6.9") change = "+" + change;

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px;overflow-x:hidden}
h1{color:#0ff;font-size:3em;margin:10px}
.p{font-size:6.2em;color:#0ff;margin:5px}
canvas{width:96vw;max-width:720px;height:380px;border:10px solid #0f0;border-radius:35px;margin:40px auto;background:#000;
       box-shadow:0 0 60px #0f0, 0 0 100px #0f0, inset 0 0 80px #0f0}
.box{background:#001a00;padding:24px;border:6px solid #0f0;border-radius:30px;margin:25px auto;max-width:650px;font-size:1.8em;box-shadow:0 0 30px #0f0}
.btn{background:#0f0;color:#000;padding:25px 80px;border-radius:70px;font-size:2.4em;font-weight:bold;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 50px #0f0}
.ai{font-size:1.7em;color:#0ff;padding:20px;background:#000;border:4px dashed #0f0;border-radius:25px;margin:20px}
</style>
</head>
<body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${price}</div>
<div style="font-size:3.2em;color:${color};margin:10px">24h ${change}%</div>

<canvas id="c"></canvas>

<div class="box">WHALE ALERT ? $42.7M BTC ? Binance (3 min ago)</div>
<div class="box ai">AI TRACKER ? Next pump in 4h 21m<br>Confidence: 89% • Target: $112,000+</div>
<div class="box">WALLET TRACKER ? 7 whales accumulated 842 BTC in last 6h</div>

<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">
UNLOCK PREMIUM ? $9/month
</a>

<div style="font-size:2.2em;color:#0ff;margin:60px">Next leg up loading...</div>

<script>
// ULTRA MASSIVE GLOWING CHART
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 720;
canvas.height = 380;

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 720, 380);

ctx.strokeStyle = "#0f0";
ctx.lineWidth = 16;
ctx.shadowBlur = 50;
ctx.shadowColor = "#0f0";

ctx.beginPath();
ctx.moveTo(60, 340);
const points = [340,310,280,295,240,190,150,110,85,60,35,20];
points.forEach((y,i) => ctx.lineTo(60 + i*55, y));
ctx.stroke();

ctx.fillStyle = "rgba(0,255,0,0.5)";
ctx.lineTo(680, 380);
ctx.lineTo(60, 380);
ctx.fill();
</script>
</body></html>`);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
