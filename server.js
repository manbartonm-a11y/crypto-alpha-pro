const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>');
});

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
.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">,420</div>
<div style="font-size:2em;color:#0f0">24h Up +6.9%</div>
<canvas id="c" width="600" height="280"></canvas>
<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>
<div style="font-size:1.7em;color:#0f9;margin-top:20px">Whales buying the dip — next leg up loading</div>
<script>
// Draw chart immediately (pure JS — no fetch, no CDN)
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 280;

// Black background
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 600, 280);

// Green line
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

// Green fill under line
ctx.fillStyle = 'rgba(0,255,0,0.3)';
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
ctx.lineTo(600, 280);
ctx.lineTo(0, 280);
ctx.closePath();
ctx.fill();
</script>
</body>
</html>
\);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Crypto Alpha Pro LIVE on Render!');
});
