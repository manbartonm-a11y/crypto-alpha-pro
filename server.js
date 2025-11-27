const express = require('express');
const app = express();
app.use(express.json());

const PORTFOLIOS = {};   // {userId: [{buy: 60000, amount: 0.5}, ...]}
const PREMIUM = new Set(); // userId list

app.get('/', (req,res)=>res.send('OK'));

app.get('/telegram', (req,res)=>{
  const userId = req.query.id || 'guest';
  const isPremium = PREMIUM.has(userId);

  let pnlBox = '';
  if (isPremium && PORTFOLIOS[userId]) {
    let total = 0;
    PORTFOLIOS[userId].forEach(p => total += (108420 - p.buy) * p.amount);
    const sign = total >= 0 ? '+' : '';
    const color = total >= 0 ? '#0f0' : '#f66';
    pnlBox = `<div style="background:#001a00;padding:40px;border:12px solid ${color};border-radius:60px;margin:60px auto;max-width:900px;font-size:4em;color:${color};box-shadow:0 0 120px ${color}">
      Portfolio PnL: ${sign}$${Math.abs(total).toFixed(0)}
    </div>`;
  }

  const paywall = isPremium ? pnlBox : `<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot"
    style="background:#0f0;color:#000;padding:45px 160px;border-radius:140px;font-size:4em;text-decoration:none;display:inline-block;margin:70px;box-shadow:0 0 150px #0f0">
    UNLOCK PREMIUM $9/month
  </a>`;

  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:4em}
.p{font-size:8em;color:#0ff}
canvas{width:98%;max-width:900px;height:500px;margin:50px auto;border:16px solid #0f0;border-radius:60px;background:#000;box-shadow:0 0 150px #0f0}
.box{background:#001a00;padding:35px;border:10px solid #0f0;border-radius:50px;margin:40px auto;max-width:850px;font-size:2.5em;box-shadow:0 0 80px #0f0}
</style></head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">$108,420</div>
<div style="font-size:5em;color:#0f0">24h +6.9%</div>
<canvas id="c"></canvas>
<div class="box">WHALE ALERT $42.7M BTC ? Binance (3 min ago)</div>
<div class="box">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>
${paywall}
<script>
const c=document.getElementById('c'),ctx=c.getContext('2d');
c.width=900;c.height=500;
ctx.fillStyle='#000';ctx.fillRect(0,0,900,500);
ctx.strokeStyle='#0f0';ctx.lineWidth=28;ctx.shadowBlur=90;ctx.shadowColor='#0f0';
ctx.beginPath();ctx.moveTo(100,460);
[460,400,340,360,290,210,140,90,60,40,20,10].forEach((y,i)=>ctx.lineTo(100+i*68,y));
ctx.stroke();ctx.lineTo(880,500);ctx.lineTo(100,500);
ctx.fillStyle='rgba(0,255,0,0.7)';ctx.fill();
</script>
</body></html>
`);
});

// Bot will call these
app.post('/add', (req,res)=>{
  const {id, amount, buy} = req.body;
  if (!id || !amount || !buy) return res.send('NO');
  if (!PORTFOLIOS[id]) PORTFOLIOS[id] = [];
  PORTFOLIOS[id].push({buy: +buy, amount: +amount});
  PREMIUM.add(id);
  res.send('OK');
});

app.post('/paid', (req,res)=>{
  if (req.body.id) PREMIUM.add(req.body.id);
  res.send('OK');
});

app.listen(process.env.PORT || 10000, '0.0.0.0', ()=>console.log('STEP 3 LIVE'));
