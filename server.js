const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/telegram', (req, res) => {
  res.write('<!DOCTYPE html><html><head>');
  res.write('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">');
  res.write('<title>Crypto Alpha Pro</title>');
  res.write('<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}');
  res.write('h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}');
  res.write('canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}</style>');
  res.write('</head><body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write('<div class="p">,420</div>');
  res.write('<div style="font-size:2em;color:#0f0">24h Up +6.9%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em">WHALE ALERT .7M BTC to Binance (3 min ago)</div>');
  res.write('<div style="font-size:1.7em;color:#0f9;margin-top:20px">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>');
  res.write('<script>');
  res.write('const canvas = document.getElementById("c");');
  res.write('const ctx = canvas.getContext("2d");');
  res.write('canvas.width = 600; canvas.height = 280;');
  res.write('ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 600, 280);');
  res.write('ctx.strokeStyle = "#0f0"; ctx.lineWidth = 8; ctx.beginPath();');
  res.write('ctx.moveTo(0, 250); ctx.lineTo(50, 230); ctx.lineTo(100, 220); ctx.lineTo(150, 180); ctx.lineTo(200, 200); ctx.lineTo(250, 160); ctx.lineTo(300, 140); ctx.lineTo(350, 120); ctx.lineTo(400, 100); ctx.lineTo(450, 80); ctx.lineTo(500, 60); ctx.lineTo(550, 40); ctx.lineTo(600, 30);');
  res.write('ctx.stroke(); ctx.fillStyle = "rgba(0,255,0,0.3)"; ctx.fill();');
  res.write('</script>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Crypto Alpha Pro LIVE on Render!');
});
