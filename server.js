const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

app.get('/telegram', (req, res) => {
  res.write('<!DOCTYPE html><html><head>');
  res.write('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">');
  res.write('<title>Crypto Alpha Pro</title>');
  res.write('<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}');
  res.write('h1{color:#0ff;font-size:3.5em}.p{font-size:7em;color:#0ff}');
  res.write('canvas{width:96%;max-width:800px;height:460px;margin:40px auto;border:3px solid #0f0;border-radius:40px;background:#000;box-shadow:0 0 80px #0f0}');
  res.write('.box{background:#000;padding:25px;border:2px solid #0f0;border-radius:35px;margin:25px auto;max-width:750px;font-size:1.9em;box-shadow:0 0 50px #0f0}');
  res.write('.live{color:#0f0;animation:glow 1.5s infinite alternate}@keyframes glow{from{text-shadow:0 0 20px #0f0}to{text-shadow:0 0 60px #0f0}}</style></head><body>');
  res.write('<h1>CRYPTO ALPHA PRO</h1>');
  res.write('<div class="p" id="price">,481</div>');
  res.write('<div id="change" style="font-size:4em;color:#0f0">24h +0.89%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div class="box live" id="whale">WHALE ALERT Loading...</div>');
  res.write('<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>');
  res.write('<script>');
  res.write('const c=document.getElementById("c"),x=c.getContext("2d");');
  res.write('c.width=800;c.height=460;x.fillStyle="#000";x.fillRect(0,0,800,460);');
  res.write('x.strokeStyle="#0f0";x.lineWidth=16;x.shadowBlur=60;x.shadowColor="#0f0";');
  res.write('x.beginPath();x.moveTo(80,420);[420,370,320,340,280,210,150,100,70,45,20,10].forEach((y,i)=>x.lineTo(80+i*62,y));');
  res.write('x.stroke();x.lineTo(780,460);x.lineTo(80,460);x.fillStyle="rgba(0,255,0,0.5)";x.fill();');
  res.write('setInterval(()=>{fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true")');
  res.write('.then(r=>r.json()).then(d=>{');
  res.write('document.getElementById("price").innerText="$"+d.bitcoin.usd.toLocaleString();');
  res.write('const ch=d.bitcoin.usd_24h_change.toFixed(2);');
  res.write('document.getElementById("change").innerHTML="24h "+(ch>0?"<span style=color:#0f0>Up +"+ch+"%</span>":"<span style=color:#f66>Down "+Math.abs(ch)+"%</span>");});},5000);');
  res.write('setInterval(()=>{fetch("https://api.whale-alert.io/v1/transactions?min_value=500000&limit=1&currency=btc,eth,usdt")');
  res.write('.then(r=>r.json()).then(d=>{if(d.transactions&&d.transactions[0]){');
  res.write('const t=d.transactions[0];');
  res.write('const amount=Math.round(t.amount_usd/100000)/10;');  // e.g. 28.4
  res.write('const dest=t.to.owner?t.to.owner:t.to.address.slice(0,10)+"...";');
  res.write('const src=t.from.owner?"from "+t.from.owner:"";');
  res.write('document.getElementById("whale").innerHTML=WHALE ALERT C:\Users\tulip\Desktop\programing crypto 1\proxy-server{amount}M  ?   <small>(just now)</small>;');
  res.write('}else{document.getElementById("whale").innerText="WHALE ALERT No recent moves";}});},15000);');
  res.write('</script></body></html>');
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
