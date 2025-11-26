const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>');
});

app.get('/telegram', (req, res) => {
  let price = ',420';
  let change = 'Up +6.9%';
  let whale = 'No recent whale moves';
  let chartPoints = [108000,109500,108200,111000,110500,113000,115000,117000,119000,122000,125000,128000];

  try {
    const response = fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
    const data = response.then(r => r.json());
    price = '$' + Number(data.bitcoin.usd).toLocaleString();
    const ch = data.bitcoin.usd_24h_change.toFixed(2);
    change = ch > 0 ? 'Up + ' + ch + '%' : 'Down ' + Math.abs(ch) + '%';
  } catch (e) {
    // Fallback — no crash
  }

  res.send(
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}
.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}
</style>
</head>
<body onload="Telegram.WebApp.ready(); Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p"></div>
<div style="font-size:2em;color:#0f0">24h </div>
<canvas id="c"></canvas>
<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em"></div>
<div style="font-size:1.7em;color:#0f9;margin-top:20px">Whales buying the dip — next leg up loading</div>
<script>
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
const points = ;
for(let i = 1; i < points.length; i++) {
  ctx.lineTo(i * (600 / points.length), 280 - ((points[i] - Math.min(...points)) / (Math.max(...points) - Math.min(...points)) * 280));
}
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
  console.log('Server running on port ' + PORT);
});
