const express = require('express');
const app = express();

app.get('/', (req,res)=>res.send('OK'));

app.get('/telegram', (req,res)=>{
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3.5em}
.p{font-size:7em;color:#0ff}
canvas{width:96%;max-width:800px;height:460px;margin:40px auto;border:14px solid #0f0;border-radius:50px;background:#000;box-shadow:0 0 100px #0f0}
.box{background:#001a00;padding:28px;border:8px solid #0f0;border-radius:40px;margin:30px auto;max-width:750px;font-size:2em;box-shadow:0 0 50px #0f0}
.btn{background:#0f0;color:#000;padding:35px 120px;border-radius:100px;font-size:3em;text-decoration:none;display:inline-block;margin:50px;box-shadow:0 0 80px #0f0}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">$108,420</div>
<div style="font-size:4em;color:#0f0">24h +6.9%</div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT $42.7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM $9/month</a>
<script>
const c=document.getElementById('c'),ctx=c.getContext('2d');
c.width=800;c.height=460;
ctx.fillStyle='#000';ctx.fillRect(0,0,800,460);
ctx.strokeStyle='#0f0';ctx.lineWidth=22;ctx.shadowBlur=70;ctx.shadowColor='#0f0';
ctx.beginPath();ctx.moveTo(80,420);
[420,370,320,340,280,210,150,100,70,45,20,10].forEach((y,i)=>ctx.lineTo(80+i*62,y));
ctx.stroke();ctx.lineTo(780,460);ctx.lineTo(80,460);
ctx.fillStyle='rgba(0,255,0,0.6)';ctx.fill();
</script>
</body>
</html>
`);
});

app.listen(process.env.PORT || 10000, '0.0.0.0', ()=>console.log('LIVE'));
