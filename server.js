const express = require('express');
const app = express();

app.get('/telegram', (req, res) => {
  res.send(\
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}
.p{font-size:6em;color:#0ff}
canvas{width:95%;max-width:700px;height:380px;border:10px solid #0f0;border-radius:35px;margin:40px auto;background:#000;box-shadow:0 0 60px #0f0}
.box{background:#001a00;padding:25px;border:6px solid #0f0;border-radius:30px;margin:25px auto;max-width:650px;font-size:1.8em;box-shadow:0 0 30px #0f0}
.btn{background:#0f0;color:#000;padding:25px 80px;border-radius:70px;font-size:2.4em;margin:40px;display:inline-block;box-shadow:0 0 50px #0f0}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">,420</div>
<div style="font-size:3em;color:#0f0">24h Up +6.9%</div>

<canvas id="c"></canvas>

<div class="box">WHALE ALERT .7M BTC Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m Target: ,000+</div>

<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>

<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
c.width = 700;
c.height = 380;

ctx.fillStyle = '#000';
ctx.fillRect(0,0,700,380);

ctx.strokeStyle = '#0f0';
ctx.lineWidth = 16;
ctx.shadowBlur = 40;
ctx.shadowColor = '#0f0';

ctx.beginPath();
ctx.moveTo(50,340);
ctx.lineTo(100,310);
ctx.lineTo(180,280);
ctx.lineTo(260,300);
ctx.lineTo(340,240);
ctx.lineTo(420,180);
ctx.lineTo(500,130);
ctx.lineTo(580,90);
ctx.lineTo(650,60);
ctx.stroke();

ctx.fillStyle = 'rgba(0,255,0,0.5)';
ctx.lineTo(700,380);
ctx.lineTo(0,380);
ctx.closePath();
ctx.fill();
</script>
</body>
</html>
\);
});

app.get('/', (req,res) => res.redirect('/telegram'));

app.listen(process.env.PORT || 10000, '0.0.0.0', () => console.log('LIVE'));
