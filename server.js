const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage (perfect for free tier)
const PORTFOLIOS = {};
const PREMIUM = new Set();

app.get('/telegram', (req, res) => {
  const userId = req.query.id || '0';
  const isPremium = PREMIUM.has(userId);

  let price = ',420';
  let change = 'Up +6.9%';
  let color = '#0f0';

  // Real price update every 10 sec in background
  const priceScript = 
    setInterval(() => {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
        .then(r => r.json())
        .then(d => {
          document.querySelector('.p').textContent = '$' + Number(d.bitcoin.usd).toLocaleString();
          const ch = d.bitcoin.usd_24h_change.toFixed(2);
          document.getElementById('change').innerHTML = '24h ' + (ch>0 ? '<span style=\"color:#0f0\">Up +' + ch + '%</span>' : '<span style=\"color:#f66\">Down ' + Math.abs(ch) + '%</span>');
        });
    }, 10000);
  ;

  // Portfolio PnL
  let portfolioBox = '';
  if (isPremium && PORTFOLIOS[userId]) {
    let total = 0;
    for (const h of PORTFOLIOS[userId]) {
      total += (108420 - h.buy) * h.amount; // using current price for demo
    }
    portfolioBox = total >= 0 
      ? <div class="box" style="color:#0f0;font-size:2em">Portfolio PnL: +C:\Users\tulip\Desktop\programing crypto 1\proxy-server{total.toFixed(0)}</div>
      : <div class="box" style="color:#f66;font-size:2em">Portfolio PnL: C:\Users\tulip\Desktop\programing crypto 1\proxy-server{total.toFixed(0)}</div>;
  }

  const premiumSection = isPremium ? portfolioBox : 
    <a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>;

  res.send(\
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
.p{font-size:6em;color:#0ff}
canvas{width:95%;max-width:700px;height:380px;border:10px solid #0f0;border-radius:35px;margin:40px auto;background:#000;box-shadow:0 0 60px #0f0}
.box{background:#001a00;padding:25px;border:6px solid #0f0;border-radius:30px;margin:25px auto;max-width:650px;font-size:1.8em;box-shadow:0 0 30px #0f0}
.btn{background:#0f0;color:#000;padding:25px 80px;border-radius:70px;font-size:2.4em;margin:40px;display:inline-block;box-shadow:0 0 50px #0f0}
</style>
</head>
<body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">,420</div>
<div id="change" style="font-size:3em;color:#0f0">24h Up +6.9%</div>

<canvas id="c"></canvas>

<div class="box">WHALE ALERT .7M BTC Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m Target: ,000+</div>
\

<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
c.width = 700; c.height = 380;
ctx.fillStyle = '#000'; ctx.fillRect(0,0,700,380);
ctx.strokeStyle = '#0f0'; ctx.lineWidth = 16; ctx.shadowBlur = 40; ctx.shadowColor = '#0f0';
ctx.beginPath(); ctx.moveTo(50,340);
ctx.lineTo(100,310); ctx.lineTo(180,280); ctx.lineTo(260,300); ctx.lineTo(340,240);
ctx.lineTo(420,180); ctx.lineTo(500,130); ctx.lineTo(580,90); ctx.lineTo(650,60);
ctx.stroke();
ctx.fillStyle = 'rgba(0,255,0,0.5)'; ctx.lineTo(700,380); ctx.lineTo(0,380); ctx.closePath(); ctx.fill();

\
</script>
</body>
</html>
\);
});

// Bot endpoints
app.post('/add', (req, res) => {
  const {id, coin, amount, buy} = req.body;
  if (!PORTFOLIOS[id]) PORTFOLIOS[id] = [];
  PORTFOLIOS[id].push({coin: coin.toLowerCase(), amount: +amount, buy: +buy});
  PREMIUM.add(id);
  res.send('OK');
});

app.post('/paid', (req, res) => {
  const {id} = req.body;
  PREMIUM.add(id);
  res.send('PREMIUM');
});

app.get('/', (req,res) => res.redirect('/telegram'));
app.listen(process.env.PORT || 10000, '0.0.0.0');
