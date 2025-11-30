const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', (req, res) => {
  res.write('<!DOCTYPE html><html><head>');
  res.write('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">');
  res.write('<title>Crypto Alpha Pro</title>');
  res.write('<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3.5em}.p{font-size:5.5em;color:#0f9;margin:10px}canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}</style>');
  res.write('</head><body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write('<div class="p" id="price">,420</div>');
  res.write('<div style="font-size:2em;color:#0f0" id="change">24h Up +6.9%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em">WHALE ALERT .7M BTC to Binance (3 min ago)</div>');
  res.write('<div style="font-size:1.7em;color:#0f9;margin-top:20px">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>');
  res.write('<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" style="background:#0f0;color:#000;padding:20px 80px;border-radius:50px;font-size:2em;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 50px #0f0;letter-spacing:2px;font-weight:bold">UNLOCK PREMIUM /month</a>');
  res.write('<script>');
  res.write('const canvas = document.getElementById("c");');
  res.write('const ctx = canvas.getContext("2d");');
  res.write('canvas.width = 600; canvas.height = 280;');
  res.write('ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 600, 280);');
  res.write('ctx.strokeStyle = "#0f0"; ctx.lineWidth = 8; ctx.beginPath();');
  res.write('ctx.moveTo(0, 250); ctx.lineTo(50, 230); ctx.lineTo(100, 220); ctx.lineTo(150, 180); ctx.lineTo(200, 200); ctx.lineTo(250, 160); ctx.lineTo(300, 140); ctx.lineTo(350, 120); ctx.lineTo(400, 100); ctx.lineTo(450, 80); ctx.lineTo(500, 60); ctx.lineTo(550, 40); ctx.lineTo(600, 30);');
  res.write('ctx.stroke(); ctx.fillStyle = "rgba(0,255,0,0.3)"; ctx.fill();');
  res.write('// Live BTC price update every 5 sec (CoinGecko free API)');
  res.write('setInterval(() => {');
  res.write('fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true")');
  res.write('.then(r => r.json())');
  res.write('.then(d => {');
  res.write('document.querySelector(".p").textContent = "$" + Number(d.bitcoin.usd).toLocaleString();');
  res.write('const ch = d.bitcoin.usd_24h_change.toFixed(2);');
  res.write('const changeDiv = document.querySelector("div[style*='font-size:2em']");');
  res.write('changeDiv.innerHTML = "24h " + (ch > 0 ? "<span style='color:#0f0'>Up +" + ch + "%</span>" : "<span style='color:#f66'>Down " + Math.abs(ch) + "%</span>");');
  res.write('});');
  res.write('}, 5000);');
  res.write('</script>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
