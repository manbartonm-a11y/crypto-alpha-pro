const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', (req, res) => {
  res.write('<!DOCTYPE html><html><head>');
  res.write('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">');
  res.write('<title>Crypto Alpha Pro</title>');
  res.write('<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}');
  res.write('h1{color:#0ff;font-size:3.5em;text-shadow:0 0 30px #0ff}');
  res.write('.p{font-size:6em;color:#0ff;text-shadow:0 0 50px #0ff;margin:10px}');
  res.write('canvas{width:95%;max-width:700px;height:300px;border:6px solid #0f0;border-radius:30px;margin:40px auto;background:#000;box-shadow:0 0 60px #0f0}');
  res.write('.box{background:#001a00;padding:22px;border:3px solid #0f0;border-radius:25px;margin:20px auto;max-width:85%;font-size:1.6em;box-shadow:0 0 50px #0f0}');
  res.write('.btn{background:#0f0;color:#000;padding:20px 90px;border-radius:60px;font-size:2.2em;text-decoration:none;display:inline-block;margin:40px;box-shadow:0 0 70px #0f0;font-weight:bold}');
  res.write('.glow{animation:g 2s infinite}@keyframes g{0%,100%{text-shadow:0 0 30px}50%{text-shadow:0 0 70px}}</style></head><body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write('<div class="p glow" id="price">,420</div>');
  res.write('<div style="font-size:2.5em;color:#0f0" id="change">24h Up +6.9%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div class="box glow">WHALE ALERT .7M BTC to Binance (3 min ago)</div>');
  res.write('<div class="box">AI TRACKER Next pump in 4h 21m Target: ,000+</div>');
  res.write('<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" class="btn">UNLOCK PREMIUM /month</a>');
  res.write('<script>');
  res.write('const canvas=document.getElementById("c"),ctx=canvas.getContext("2d");');
  res.write('canvas.width=700;canvas.height=300;');
  res.write('ctx.fillStyle="#000";ctx.fillRect(0,0,700,300);');
  res.write('ctx.strokeStyle="#0f0";ctx.lineWidth=10;ctx.shadowBlur=40;ctx.shadowColor="#0f0";');
  res.write('ctx.beginPath();ctx.moveTo(30,280);');
  res.write('[280,240,200,220,180,140,100,80,60,40,20,10].forEach((y,i)=>ctx.lineTo(30+i*60,y));');
  res.write('ctx.stroke();ctx.lineTo(670,290);ctx.lineTo(30,290);');
  res.write('ctx.fillStyle="rgba(0,255,0,0.3)";ctx.fill();');
  res.write('setInterval(()=>{fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true")');
  res.write('.then(r=>r.json()).then(d=>{');
  res.write('document.getElementById("price").innerText="$"+d.bitcoin.usd.toLocaleString();');
  res.write('const ch=d.bitcoin.usd_24h_change.toFixed(2);');
  res.write('document.getElementById("change").innerHTML="24h "+(ch>0?"<span style=color:#0f0>Up +"+ch+"%</span>":"<span style=color:#f66>"+ch+"%</span>");');
  res.write('});},6000);</script></body></html>');
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
