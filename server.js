const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
  body{margin:0;background:#000;color:#0f0;font-family:system-ui,sans-serif;text-align:center;padding:15px 20px;background:radial-gradient(circle at center,#001a00,#000)}
  h1{font-size:3.2em;color:#0ff;margin:10px;letter-spacing:5px;text-shadow:0 0 40px #0ff}
  .price{font-size:6.8em;color:#0ff;margin:0;font-weight:900;text-shadow:0 0 60px #0ff;animation:glow 3s infinite}
  .change{font-size:2.8em;margin:15px 0}
  canvas{width:96%;max-width:800px;height:320px;border:4px solid #0f0;border-radius:35px;background:#000;box-shadow:0 0 80px #0f0;margin:30px auto}
  .box{background:#001a00;padding:22px;border-radius:30px;margin:22px auto;max-width:90%;border:2px solid #0f0;box-shadow:0 0 50px #0f0;font-size:1.7em}
  .btn{background:#0f0;color:#000;padding:22px 100px;border-radius:60px;font-size:2.4em;font-weight:bold;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 70px #0f0ff}
  @keyframes glow{0%,100%{text-shadow:0 0 40px #0ff}50%{text-shadow:0 0 80px #0ff}}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="price" id="price">,426</div>
<div class="change" id="change">24h +0.89%</div>
<canvas id="c"></canvas>
<div class="box" id="whale">WHALE ALERT Loading real moves...</div>
<div class="box">AI TRACKER • Next pump in 4h 21m • Target +</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>

<script>
// Chart
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = 800; canvas.height = 320;
ctx.fillStyle = '#000'; ctx.fillRect(0,0,800,320);
ctx.strokeStyle = '#0f0'; ctx.lineWidth = 12; ctx.shadowBlur = 50; ctx.shadowColor = '#0f0';
ctx.beginPath(); ctx.moveTo(40,300);
[300,260,220,240,190,150,110,80,55,35,15,8].forEach((y,i)=>ctx.lineTo(40+i*68,y));
ctx.stroke();
ctx.lineTo(760,310); ctx.lineTo(40,310);
ctx.fillStyle = 'rgba(0,255,0,0.35)'; ctx.fill();

// Live price + 24h change
setInterval(()=>{
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
    .then(r=>r.json())
    .then(d=>{
      document.getElementById('price').textContent = '$' + Number(d.bitcoin.usd).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
      const ch = d.bitcoin.usd_24h_change.toFixed(2);
      document.getElementById('change').innerHTML = '24h ' + (ch>0 ? '<span style="color:#0f0">+'+ch+'%</span>' : '<span style="color:#f66">'+ch+'%</span>');
    })
    .catch(()=>{});
}, 6000);
</script>
</body>
</html>
  \);
});

app.listen(process.env.PORT || 10000, '0.0.0.0', () => console.log('LIVE'));
