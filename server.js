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
  res.write('<div class="p">,420</div>');
  res.write('<div style="font-size:2em;color:#0f0">24h Up +6.9%</div>');
  res.write('<canvas id="c"></canvas>');
  res.write('<div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em">WHALE ALERT .7M BTC to Binance (3 min ago)</div>');
  res.write('<div style="font-size:1.7em;color:#0f9;margin-top:20px">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>');
  res.write('<script>');
  res.write('const c=document.getElementById("c"),x=c.getContext("2d");');
  res.write('c.width=600;c.height=280;x.fillStyle="#000";x.fillRect(0,0,600,280);');
  res.write('x.strokeStyle="#0f0";x.lineWidth=8;x.beginPath();');
  res.write('x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);');
  res.write('x.stroke();x.fillStyle="rgba(0,255,0,0.3)";x.fill();');
  res.write('</script></body></html>');
  res.end();
});

app.listen(process.env.PORT || 10000, '0.0.0.0', () => console.log('LIVE'));
