const express = require('express');
const app = express();
app.get('/', (r,s)=>s.send('OK'));

app.get('/telegram', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(\
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
  body {margin:0;background:#000;color:#0f8;font-family:system-ui,sans-serif;text-align:center;padding:20px;background:radial-gradient(#001a00,#000)}
  h1 {font-size:3.2em;color:#0ff;margin:0;letter-spacing:4px;text-shadow:0 0 40px #0ff}
  .price {font-size:6.5em;color:#0ff;margin:15px 0;font-weight:900;text-shadow:0 0 50px #0ff}
  .change {font-size:2.8em;margin:10px;color:#0f8}
  .chart {background:#000;padding:15px;border:3px solid #0f8;border-radius:30px;margin:30px auto;width:94%;max-width:800px;box-shadow:0 0 70px #0f8}
  .box {background:#001a00;padding:22px;border-radius:25px;margin:20px auto;max-width:90%;border:2px solid #0f8;box-shadow:0 0 50px #0f8;font-size:1.6em}
  .btn {background:#0f8;color:#000;padding:20px 90px;border-radius:50px;font-size:2.2em;font-weight:bold;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 60px #0f8;letter-spacing:2px}
  .glow {animation:g 2s infinite}@keyframes g{0%,100%{text-shadow:0 0 30px #0f8}50%{text-shadow:0 0 70px #0f8}}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="price glow" id="price">,420</div>
<div class="change" class="change glow" id="change">24h +6.9%</div>
<div class="chart"><canvas id="c" height="300"></canvas></div>
<div class="box glow" id="whale">WHALE ALERT Loading real moves...</div>
<div class="box">AI TRACKER • Next pump in 4h 21m • Target +</div>
<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>

<script>
// Chart
const c=document.getElementById('c'),x=c.getContext('2d');
c.width=800;c.height=300;
x.fillStyle='#000';x.fillRect(0,0,800,300);
x.strokeStyle='#0f8';x.lineWidth=10;x.shadowBlur=40;x.shadowColor='#0f8';
x.beginPath();x.moveTo(40,280);
[280,240,200,220,180,140,100,80,60,40,20,10].forEach((y,i)=>x.lineTo(40+i*65,y));
x.stroke();
x.lineTo(760,290);x.lineTo(40,290);
x.fillStyle='rgba(0,255,136,0.3)';x.fill();

// Live BTC Price
setInterval(()=>{
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
  .then(r=>r.json())
  .then(d=>{
    document.getElementById('price').textContent = '$' + Number(d.bitcoin.usd).toLocaleString();
    const ch = d.bitcoin.usd_24h_change.toFixed(2);
    document.getElementById('change').innerHTML = '24h ' + (ch>0 ? '<span style="color:#0f0">+'+ch+'%</span>' : '<span style="color:#f66">'+ch+'%</span>');
  });
}, 6000);

// Live Whale Alerts
setInterval(()=>{
  fetch('https://api.whale-alert.io/v1/transactions?min_value=1000000&limit=1&currency=btc,eth,usdt')
  .then(r=>r.json())
  .then(d=>{
    if(d.transactions && d.transactions[0]){
      const t = d.transactions[0];
      const amount = (t.amount_usd/1000000).toFixed(1);
      const to = t.to.owner || t.to.address.slice(0,10)+'...';
      document.getElementById('whale').innerHTML = \WHALE ALERT C:\Users\tulip\Desktop\programing crypto 1\proxy-server{amount}M \ to \ <small>just now</small>\;
    }
  });
}, 20000);
</script>
</body>
</html>
  \);
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
