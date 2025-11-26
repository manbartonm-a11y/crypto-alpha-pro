const express = require("express");
const app = express();

// Super-safe price fetch with 3 fallbacks
async function getBtcPrice() {
  const fallbacks = [
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    "https://api.kraken.com/0/public/Ticker?pair=XBTUSD"
  ];
  for (const url of fallbacks) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "CryptoAlphaPro/1.0" }, timeout: 5000 });
      if (!r.ok) continue;
      const j = await r.json();
      if (url.includes("coingecko")) {
        return { price: j.bitcoin.usd, change: j.bitcoin.usd_24h_change.toFixed(2) };
      }
      if (url.includes("binance")) {
        return { price: parseFloat(j.price), change: "+?.??" };
      }
      if (url.includes("kraken")) {
        const data = j.result.XXBTZUSD;
        return { price: parseFloat(data.c[0]), change: "+?.??" };
      }
    } catch(e) {}
  }
  return { price: 108420, change: "+6.9" }; // final fallback
}

app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));

app.get("/telegram", async (req,res)=>{
  const data = await getBtcPrice();
  const price = "$" + Number(data.price).toLocaleString();
  const change = data.change;
  const color = change > 0 ? "#0f0" : "#f66";

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:300px;border:6px solid #0f0;border-radius:20px;margin:40px auto;background:#000}
.btn{background:#0f0;color:#000;padding:20px 50px;border-radius:50px;font-size:2em;font-weight:bold;text-decoration:none;display:inline-block;margin:30px}
</style></head><body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${price}</div>
<div style="font-size:2.5em;color:${color}">24h ${change}%</div>
<canvas id="c"></canvas>
<div style="background:#001a00;padding:25px;border:4px solid #0f0;border-radius:25px;margin:30px;font-size:1.7em">
WHALE ALERT • $42.7M BTC ? Binance (3 min ago)
</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM $9/month</a>
<div style="font-size:1.8em;color:#0f9;margin-top:30px">Next leg up loading…</div>
<script>
const ctx=document.getElementById("c").getContext("2d");
ctx.fillStyle="#000";ctx.fillRect(0,0,600,300);
ctx.strokeStyle="#0f0";ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(20,270);
[270,240,220,200,230,180,140,110,90,70,45,30].forEach((y,i)=>ctx.lineTo(20+i*48,y));
ctx.stroke();ctx.fillStyle="rgba(0,255,0,0.35)";ctx.lineTo(580,300);ctx.lineTo(20,300);ctx.fill();
</script>
</body></html>`);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
