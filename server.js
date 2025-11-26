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

  price = "$" + Number(price).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
  color = parseFloat(change) >= 0 ? "#0f0" : "#f66";
  if (parseFloat(change) >= 0) change = "+" + change;

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px;overflow-x:hidden}
h1{color:#0ff;font-size:3em}
.p{font-size:6.5em;color:#0ff;margin:5px}
canvas{display:block;width:96vw;max-width:750px;height:420px;margin:40px auto;border:12px solid #0f0;border-radius:40px;background:#000;
       box-shadow:0 0 80px #0f0, 0 0 120px #0f0, inset 0 0 100px #0f0}
.box{background:#001a00;padding:25px;border:6px solid #0f0;border-radius:35px;margin:25px auto;max-width:700px;font-size:1.9em;box-shadow:0 0 40px #0f0}
.btn{background:#0f0;color:#000;padding:28px 90px;border-radius:80px;font-size:2.6em;font-weight:bold;text-decoration:none;display:inline-block;margin:45px;box-shadow:0 0 60px #0f0}
</style>
</head>
<body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${price}</div>
<div style="font-size:3.5em;color:${color}">24h ${change}%</div>

<canvas id="c"></canvas>

<div class="box">WHALE ALERT ? $42.7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER ? Next pump in 4h 21m • Confidence: 89% • Target: $112,000+</div>
<div class="box">WALLET TRACKER ? 7 whales bought 842 BTC in last 6h</div>

<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM ? $9/month</a>

<div style="font-size:2.3em;color:#0ff;margin:70px">Next leg up loading...</div>

<script>
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 750;
canvas.height = 420;

ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 750, 420);
ctx.strokeStyle = "#0f0"; ctx.lineWidth = 20; ctx.shadowBlur = 60; ctx.shadowColor = "#0f0";
ctx.beginPath(); ctx.moveTo(80, 380);
const yPoints = [380, 340, 300, 320, 260, 200, 150, 100, 70, 45, 25, 15];
yPoints.forEach((y, i) => ctx.lineTo(80 + i * 58, y));
ctx.stroke();
ctx.lineTo(720, 420); ctx.lineTo(80, 420);
ctx.fillStyle = "rgba(0, 255, 0, 0.55)"; ctx.fill();
</script>
</body></html>`);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
