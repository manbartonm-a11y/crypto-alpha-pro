const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('OK'); // Health check — keeps Render awake
});

app.get('/telegram', (req, res) => {
  res.send(
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}
.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">,420</div>
<div style="font-size:2em;color:#0f0">24h Up +6.9%</div>
<canvas id="c"></canvas>
<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>
<div style="font-size:1.7em;color:#0f9;margin-top:20px">Whales buying the dip — next leg up loading</div>
<script>
// Background price update (no hang)
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true', {headers:{"User-Agent":"CryptoAlphaPro"}})
  .then(r => r.json())
  .then(d => {
    document.querySelector('.p').textContent = '$' + Number(d.bitcoin.usd).toLocaleString();
    const ch = d.bitcoin.usd_24h_change.toFixed(2);
    document.querySelector('div[style*="font-size:2em"]').innerHTML = '24h ' + (ch>0 ? '<span style="color:#0f0">Up +' + ch + '%</span>' : '<span style="color:#f66">Down ' + Math.abs(ch) + '%</span>');
  })
  .catch(e => {});

// Draw chart immediately (pure JS)
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 280;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 600, 280);
ctx.strokeStyle = '#0f0';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(0, 250);
ctx.lineTo(50, 230);
ctx.lineTo(100, 220);
ctx.lineTo(150, 180);
ctx.lineTo(200, 200);
ctx.lineTo(250, 160);
ctx.lineTo(300, 140);
ctx.lineTo(350, 120);
ctx.lineTo(400, 100);
ctx.lineTo(450, 80);
ctx.lineTo(500, 60);
ctx.lineTo(550, 40);
ctx.lineTo(600, 30);
ctx.stroke();
ctx.fillStyle = 'rgba(0,255,0,0.3)';
ctx.fill();
</script>
</body>
</html>
);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Crypto Alpha Pro LIVE on Render!');
});
