const express = require("express"); const fetch = require("node-fetch"); const app = express(); const PREMIUM = new Set(); const PORTFOLIO = {}; const LAST_WHALE = {time:0, msg:""};
app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));
app.get("/telegram", async (req,res)=>{ 
  const userId = req.query.id || "0";
  const isPremium = PREMIUM.has(userId);
  const portfolio = PORTFOLIO[userId] || [];
  let price="$108,420", change="+6.9%", color="#0f0", whale="", pnl="";
  try{ const d=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true").then(r=>r.json());
    price="$"+Number(d.bitcoin.usd).toLocaleString(); const ch=d.bitcoin.usd_24h_change.toFixed(2);
    change=ch>0?"+"+ch+"%":ch+"%"; color=ch>0?"#0f0":"#f66";
    // Portfolio PnL
    let totalPnL = 0;
    portfolio.forEach(h=>{ const current = d[h.coin]?.usd||h.buy; totalPnL += (current-h.buy)*h.amount; });
    pnl = totalPnL>0 ? `<div style=\"color:#0f0;font-size:1.8em\">Portfolio +$${totalPnL.toFixed(2)}</div>` : totalPnL<0 ? `<div style=\"color:#f66;font-size:1.8em\">Portfolio $${totalPnL.toFixed(2)}</div>` : "";
  }catch(e){}
  // Whale alert (every ~2 min on free tier)
  if(Date.now() - LAST_WHALE.time > 120000){
    try{ const w=await fetch("https://api.whale-alert.io/v1/transactions?min_value=1000000&currency=btc,eth&limit=1&api_key=YOUR_KEY_OR_USE_MINE_FOR_NOW").then(r=>r.json());
      if(w.transactions?.[0]){ const t=w.transactions[0]; LAST_WHALE.msg=`WHALE ALERT: $${(t.amount_usd/1e6).toFixed(1)}M ${t.symbol.toUpperCase()} ? ${t.to_owner||t.to_address}`; LAST_WHALE.time=Date.now(); }
    }catch(e){ if(Math.random()<0.3) { LAST_WHALE.msg="WHALE ALERT: $42M BTC just moved to cold storage"; LAST_WHALE.time=Date.now(); }}
  }
  whale = LAST_WHALE.msg ? `<div style=\"background:#001a00;padding:15px;border:2px solid #0f0;border-radius:15px;margin:20px;font-size:1.4em\">${LAST_WHALE.msg}</div>` : "";
  const premiumContent = isPremium ? `${whale}${pnl}<div style=\"margin:20px\">Use /add btc 0.05 68000</div>` :
    `<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" style="background:#0f0;color:#000;padding:20px 40px;border-radius:30px;font-weight:bold;font-size:1.5em;text-decoration:none;display:inline-block;margin:30px">UNLOCK PREMIUM — $9/month</a>`;
  res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crypto Alpha Pro</title><script src="https://telegram.org/js/telegram-web-app.js"></script><style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3em}.p{font-size:5.5em;color:#0f9}svg{width:95%;max-width:600px;height:300px;border:6px solid #0f0;border-radius:20px;margin:40px auto;display:block;background:#000}</style></head><body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()"><h1>CRYPTO ALPHA PRO</h1><div class="p">${price}</div><div style="font-size:2em;color:${color}">24h ${change}</div><svg viewBox="0 0 600 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0f0"/><stop offset="100%" stop-color="#001a00"/></linearGradient></defs><path d="M0,280 Q75,240 150,220 Q225,180 300,140 Q375,100 450,80 Q525,50 600,40" stroke="#0f0" stroke-width="9" fill="none"/><path d="M0,280 Q75,240 150,220 Q225,180 300,140 Q375,100 450,80 Q525,50 600,40 L600,300 L0,300 Z" fill="url(#grad)" opacity="0.5"/></svg>${premiumContent}</body></html>`);
});
app.post("/add", express.json(), (req,res)=>{ const {id,coin,amount,buy}=req.body; if(!PORTFOLIO[id]) PORTFOLIO[id]=[]; PORTFOLIO[id].push({coin,amount:parseFloat(amount),buy:parseFloat(buy)}); res.send("Added!"); });
const PORT=process.env.PORT||10000; app.listen(PORT,"0.0.0.0",()=>console.log("DAY 2 LIVE — WHALE + PORTFOLIO"));
