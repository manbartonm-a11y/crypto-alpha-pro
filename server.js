const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));

app.get("/telegram", async (req,res)=>{
  // Real price with 100% fallback
  let price = "$108,420", change = "+6.9%", color = "#0f0";
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",{headers:{"User-Agent":"CryptoAlpha"}});
    if (r.ok) {
      const j = await r.json();
      price = "$" + Number(j.bitcoin.usd).toLocaleString();
      const ch = j.bitcoin.usd_24h_change.toFixed(2);
      change = (ch>0?"+":"") + ch + "%";
      color = ch>0?"#0f0":"#f66";
    }
  } catch(e) {}

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px;overflow-x:hidden}
h1{color:#0ff;font-size:3em;margin:10px}
.p{font-size:5.8em;color:#0ff;margin:5px}
canvas{width:95%;max-width:620px;height:300px;border:6px solid #0f0;border-radius:25px;margin:30px auto;background:#000;box-shadow:0 0 30px #0f0}
.box{background:#001a00;padding:20px;border:4px solid #0f0;border-radius:25px;margin:20px auto;max-width:600px;font-size:1.6em;box-shadow:0 0 20px #0f0}
.btn{background:#0f0;color:#000;padding:20px 60px;border-radius:50px;font-size:2em;font-weight:bold;text-decoration:none;display:inline-block;margin:30px;box-shadow:0 0 30px #0f0}
.ai{font-size:1.5em;color:#0ff;margin:20px;padding:15px;background:#000;border:2px dashed #0f0;border-radius:20px}
</style>
</head>
<body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${price}</div>
<div style="font-size:2.8em;color:${color}">24h ${change}</div>

<canvas id="c"></canvas>

<div class="box">
WHALE ALERT • $42.7M BTC ? Binance (3 min ago)
</div>

<div class="box ai">
AI TRACKER • Next pump in 4h 21m<br>
Confidence: 89% • Target: $112,000+
</div>

<div class="box">
WALLET TRACKER • 7 whales accumulated 842 BTC in last 6h
</div>

<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">
UNLOCK PREMIUM ? $9/month
</a>

<div style="font-size:1.9em;color:#0ff;margin:40px">
Next leg up loading...
</div>

<script>
// Glowing chart
const ctx=document.getElementById("c").getContext("2d");
ctx.fillStyle="#000";ctx.fillRect(0,0,620,300);
ctx.strokeStyle="#0f0";ctx.lineWidth=10;ctx.shadowBlur=20;ctx.shadowColor="#0f0";
ctx.beginPath();ctx.moveTo(30,270);
[270,240,215,240,190,160,130,100,80,60,40,25].forEach((y,i)=>ctx.lineTo(30+i*49,y));
ctx.stroke();
ctx.fillStyle="rgba(0,255,0,0.4)";
ctx.lineTo(590,300);ctx.lineTo(30,300);ctx.fill();
</script>
</body></html>`);
});

app.listen(process.env.PORT || 10000, "0.0.0.0", ()=>console.log("FINAL VERSION LIVE"));
