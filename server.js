const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));

app.get("/telegram", async (req,res)=>{
  let price = "$108,420", change = "+6.9%", color = "#0f0";
  try{
    const d = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true").then(r=>r.json());
    price = "$" + Number(d.bitcoin.usd).toLocaleString();
    const ch = d.bitcoin.usd_24h_change.toFixed(2);
    change = (ch>0?"+":"") + ch + "%";
    color = ch>0?"#0f0":"#f66";
  }catch(e){}

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:300px;border:6px solid #0f0;border-radius:20px;margin:40px auto;background:#000}
</style></head><body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">${price}</div>
<div style="font-size:2.5em;color:${color}">24h ${change}</div>
<canvas id="c"></canvas>
<div style="font-size:1.9em;color:#0f9;padding:20px;background:#001a00;border:3px solid #0f0;border-radius:20px;margin:30px">
WHALE ALERT • $42.7M BTC ? Binance (3 min ago)
</div>
<div style="font-size:1.8em;color:#0f9">Next leg up loading…</div>
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
