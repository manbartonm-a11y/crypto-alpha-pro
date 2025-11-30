const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/telegram', (req, res) => {
  res.write('<!DOCTYPE html>');
  res.write('<html>');
  res.write('<head>');
  res.write('<meta charset="utf-8">');
  res.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
  res.write('<title>Crypto Alpha Pro</title>');
  res.write('<style>');
  res.write('body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}');
  res.write('h1{color:#0ff;font-size:3.5em}');
  res.write('.p{font-size:7em;color:#0ff}');
  res.write('canvas{width:96%;max-width:800px;height:460px;margin:40px auto;border:3px solid #0f0;border-radius:40px;background:#000;box-shadow:0 0 80px #0f0}');
  res.write('.box{background:#000;padding:25px;border:2px solid #0f0;border-radius:35px;margin:25px auto;max-width:750px;font-size:1.9em;box-shadow:0 0 50px #0f0}');
  res.write('.btn{background:#0f0;color:#000;padding:32px 110px;border-radius:90px;font-size:2.9em;text-decoration:none;display:inline-block;margin:50px;box-shadow:0 0 70px #0f0;letter-spacing:2px;font-weight:bold}');
  res.write('</style>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write('<div class="p">,420</div>');
  res.write('<div style="font-size:4em;color:#0f0">24h +6.9%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div class="box">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>');
  res.write('<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>');
  res.write('<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>');
  res.write('<script>');
  res.write('const canvas = document.getElementById("c");');
  res.write('const ctx = canvas.getContext("2d");');
  res.write('canvas.width = 800;');
  res.write('canvas.height = 460;');
  res.write('ctx.fillStyle = "#000";');
  res.write('ctx.fillRect(0, 0, 800, 460);');
  res.write('ctx.strokeStyle = "#0f0";');
  res.write('ctx.lineWidth = 16;');
  res.write('ctx.shadowBlur = 60;');
  res.write('ctx.shadowColor = "#0f0";');
  res.write('ctx.beginPath();');
  res.write('ctx.moveTo(80, 420);');
  res.write('[420,370,320,340,280,210,150,100,70,45,20,10].forEach((y,i)=>ctx.lineTo(80+i*62,y));');
  res.write('ctx.stroke();');
  res.write('ctx.lineTo(780, 460);');
  res.write('ctx.lineTo(80, 460);');
  res.write('ctx.fillStyle = "rgba(0,255,0,0.5)";');
  res.write('ctx.fill();');
  res.write('</script>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Crypto Alpha Pro LIVE on Render!');
});
