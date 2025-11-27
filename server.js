const express = require('express');
const app = express();
app.use(express.json());

const PORTFOLIOS = {};
const PREMIUM = new Set();

app.get('/', (req,res)=>res.send('OK'));

app.get('/telegram', (req,res)=>{
  const userId = req.query.id || '0';
  const isPremium = PREMIUM.has(userId);

  let pnl = '';
  if (isPremium && PORTFOLIOS[userId]) {
    let total = 0;
    PORTFOLIOS[userId].forEach(p => total += (108420 - p.buy) * p.amount);
    pnl = <div style='background:#001a00;padding:30px;border:8px solid #0f0;border-radius:40px;margin:40px auto;max-width:700px;font-size:2.5em;color:#0f0'>
      Portfolio PnL: +C:\Users\tulip\Desktop\programing crypto 1\proxy-server{total.toFixed(0)}
    </div>;
  }

  const paywall = isPremium ? pnl : <a href='https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot' 
    style='background:#0f0;color:#000;padding:35px 120px;border-radius:100px;font-size:3em;text-decoration:none;display:inline-block;margin:50px;box-shadow:0 0 80px #0f0'>
    UNLOCK PREMIUM /month</a>;

  res.send(\
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crypto Alpha Pro</title>
<style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3.5em}.p{font-size:7em;color:#0ff}
canvas{width:96%;max-width:800px;height:460px;margin:40px auto;border:14px solid #0f0;border-radius:50px;background:#000;box-shadow:0 0 100px #0f0}
.box{background:#001a00;padding:28px;border:8px solid #0f0;border-radius:40px;margin:30px auto;max-width:750px;font-size:2em;box-shadow:0 0 50px #0f0}
</style></head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">,420</div>
<div style="font-size:4em;color:#0f0">24h +6.9%</div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT .7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: ,000+</div>

<script>
const c=document.getElementById('c'),ctx=c.getContext('2d');
c.width=800;c.height=460;
ctx.fillStyle='#000';ctx.fillRect(0,0,800,460);
ctx.strokeStyle='#0f0';ctx.lineWidth=22;ctx.shadowBlur=70;ctx.shadowColor='#0f0';
ctx.beginPath();ctx.moveTo(80,420);
[420,370,320,340,280,210,150,100,70,45,20,10].forEach((y,i)=>ctx.lineTo(80+i*62,y));
ctx.stroke();ctx.lineTo(780,460);ctx.lineTo(80,460);
ctx.fillStyle='rgba(0,255,0,0.6)';ctx.fill();
</script>
</body></html>
\);
});

app.post('/add', (req,res)=>{
  const {id,amount,buy} = req.body;
  if(id&&amount&&buy){
    if(!PORTFOLIOS[id]) PORTFOLIOS[id]=[];
    PORTFOLIOS[id].push({buy:+buy,amount:+amount});
    PREMIUM.add(id);
  }
  res.send('OK');
});

app.post('/paid', (req,res)=>{
  const {id} = req.body;
  if(id) PREMIUM.add(id);
  res.send('OK');
});

app.listen(process.env.PORT || 10000, '0.0.0.0');
