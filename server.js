const express = require('express');
const app = express();

app.get('/', (req,res)=>res.send('OK'));

app.get('/telegram', (req,res)=>{
  res.send(\
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3.5em}.p{font-size:6.5em;color:#0ff}
canvas{width:96vw;max-width:750px;height:420px;margin:40px auto;border:12px solid #0f0;border-radius:40px;background:#000;box-shadow:0 0 80px #0f0}
.box{background:#001a00;padding:25px;border:6px solid #0f0;border-radius:35px;margin:25px auto;max-width:700px;font-size:1.9em;box-shadow:0 0 40px #0f0}
.btn{background:#0f0;color:#000;padding:30px 100px;border-radius:80px;font-size:2.8em;text-decoration:none;display:inline-block;margin:50px;box-shadow:0 0 70px #0f0}
</style>
</head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p" id="price">,420</div>
<div id="change" style="font-size:3.5em;color:#0f0">24h Up +6.9%</div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>
<script>
// Real price update every 8 sec (client-side)
setInterval(()=>{fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
  .then(r=>r.json()).then(d=>{
    document.getElementById('price').innerText='$'+Number(d.bitcoin.usd).toLocaleString();
    const ch=d.bitcoin.usd_24h_change.toFixed(2);
    document.getElementById('change').innerHTML='24h '+(ch>0?'<span style="color:#0f0">Up +'+ch+'%</span>':'<span style="color:#f66">Down '+Math.abs(ch)+'%</span>');
  })},8000);

// Glowing green chart
const c=document.getElementById('c');const ctx=c.getContext('2d');
c.width=750;c.height=420;ctx.fillStyle='#000';ctx.fillRect(0,0,750,420);
ctx.strokeStyle='#0f0';ctx.lineWidth=20;ctx.shadowBlur=60;ctx.shadowColor='#0f0';
ctx.beginPath();ctx.moveTo(80,380);
[380,340,300,320,260,200,150,100,70,45,25,15].forEach((y,i)=>ctx.lineTo(80+i*58,y));
ctx.stroke();ctx.lineTo(720,420);ctx.lineTo(80,420);
ctx.fillStyle='rgba(0,255,0,0.55)';ctx.fill();
</script>
</body></html>
\);
});

app.listen(process.env.PORT || 3000);
