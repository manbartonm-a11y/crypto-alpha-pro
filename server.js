const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', (req, res) => {
  res.send(\
<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
  body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
  h1{color:#0ff;font-size:3.5em}
  .p{font-size:5.5em;color:#0f9;margin:10px}
  canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}
  .box{background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em}
  .btn{background:#0f0;color:#000;padding:20px 80px;border-radius:50px;font-size:2em;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 50px #0f0;font-weight:bold}
</style>
</head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p" id="price">,426</div>
<div id="change" style="font-size:2em;color:#0f0">24h +0.89%</div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT .7M BTC to Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>

<script>
const c=document.getElementById('c'),x=c.getContext('2d');
c.width=600;c.height=280;x.fillStyle='#000';x.fillRect(0,0,600,280);
x.strokeStyle='#0f0';x.lineWidth=8;x.beginPath();
x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);
x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);
x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();
x.fillStyle='rgba(0,255,0,0.3)';x.fill();

setInterval(()=>{
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
  .then(r=>r.json()).then(d=>{
    document.getElementById('price').textContent = '$'+d.bitcoin.usd.toLocaleString();
    const ch = d.bitcoin.usd_24h_change.toFixed(2);
    document.getElementById('change').innerHTML = '24h '+(ch>0?'<span style=color:#0f0>+'+ch+'%</span>':'<span style=color:#f66>'+ch+'%</span>');
  });
},5000);
</script>
</body></html>
  \);
});

app.listen(process.env.PORT || 10000);
