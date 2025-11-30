const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', async (req, res) => {
  let price = 91481, change = '+0.89';
  try {
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true', {headers: {'User-Agent': 'CryptoAlphaPro'}});
    if (r.ok) {
      const d = await r.json();
      price = d.bitcoin.usd;
      change = d.bitcoin.usd_24h_change.toFixed(2);
    }
  } catch(e) {
    // Fallback — app always loads
  }

  const priceStr = '$' + Number(price).toLocaleString();
  const changeStr = change > 0 ? '+ ' + change + '%' : change + '%';
  const color = change > 0 ? '#0f0' : '#f66';

  res.send(\
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
canvas{width:96%;max-width:800px;height:460px;margin:40px auto;border:3px solid #0f0;border-radius:40px;background:#000;box-shadow:0 0 80px #0f0}
.box{background:#000;padding:25px;border:2px solid #0f0;border-radius:35px;margin:25px auto;max-width:750px;font-size:1.9em;box-shadow:0 0 50px #0f0}
.btn{background:#0f0;color:#000;padding:32px 110px;border-radius:90px;font-size:2.9em;text-decoration:none;display:inline-block;margin:50px;box-shadow:0 0 70px #0f0;letter-spacing:2px;font-weight:bold}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p"></div>
<div style="font-size:4em;color:">24h </div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>
<script>
const c=document.getElementById("c"),x=c.getContext("2d");
c.width=800;c.height=460;
x.fillStyle="#000";x.fillRect(0,0,800,460);
x.strokeStyle="#0f0";x.lineWidth=16;x.shadowBlur=60;x.shadowColor="#0f0";
x.beginPath();x.moveTo(80,420);
[420,370,320,340,280,210,150,100,70,45,20,10].forEach((y,i)=>x.lineTo(80+i*62,y));
x.stroke();x.lineTo(780,460);x.lineTo(80,460);
x.fillStyle="rgba(0,255,0,0.5)";x.fill();
</script>
</body>
</html>
  \);
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
