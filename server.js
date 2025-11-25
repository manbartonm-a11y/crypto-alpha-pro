const express = require("express"); const fetch = require("node-fetch"); const app = express(); const PREMIUM_USERS = new Set(["123456789","987654321"]); // ? add real user IDs later
app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));
app.get("/telegram", async (req,res)=>{ 
  const userId = req.query.id || "0";
  const isPremium = PREMIUM_USERS.has(userId);
  let price="$108,420", change="+6.9%", color="#0f0";
  try{ const d=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true").then(r=>r.json());
    price="$"+Number(d.bitcoin.usd).toLocaleString();
    const ch=d.bitcoin.usd_24h_change.toFixed(2);
    change=ch>0?"+"+ch+"%":ch+"%"; color=ch>0?"#0f0":"#f66";
  }catch(e){}
  const premiumOnly = isPremium ? 
    `<div style=\"background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:30px;font-size:1.5em\">PREMIUM ACTIVE<br>Whale alerts + AI signals coming in 24h</div>` :
    `<a href="https://t.me/CryptoBot?start=pay_to_@crypto_alert_677_bot" style="background:#0f0;color:#000;padding:20px 40px;border-radius:30px;font-weight:bold;font-size:1.4em;text-decoration:none;display:inline-block;margin:30px">UNLOCK PREMIUM — $9/month</a>
     <div style="color:#666;margin:20px">Free users see basic dashboard only</div>`;
  res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Crypto Alpha Pro</title><script src="https://telegram.org/js/telegram-web-app.js"></script><style>body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}h1{color:#0ff;font-size:3em}.p{font-size:5.5em;color:#0f9}svg{width:95%;max-width:600px;height:300px;border:6px solid #0f0;border-radius:20px;margin:40px auto;display:block;background:#000}.btn{background:#0f0;color:#000;padding:18px 40px;border-radius:30px;font-weight:bold;margin:30px;font-size:1.3em}</style></head><body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()"><h1>CRYPTO ALPHA PRO</h1><div class="p">${price}</div><div style="font-size:2em;color:${color}">24h ${change}</div><svg viewBox="0 0 600 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0f0"/><stop offset="100%" stop-color="#001a00"/></linearGradient></defs><path d="M0,280 Q75,240 150,220 Q225,180 300,140 Q375,100 450,80 Q525,50 600,40" stroke="#0f0" stroke-width="9" fill="none"/><path d="M0,280 Q75,240 150,220 Q225,180 300,140 Q375,100 450,80 Q525,50 600,40 L600,300 L0,300 Z" fill="url(#grad)" opacity="0.5"/></svg><div style="font-size:1.8em;color:#0f9">Whales buying the dip — next leg up loading</div>${premiumOnly}</body></html>`);
});
const PORT=process.env.PORT||10000; app.listen(PORT,"0.0.0.0",()=>console.log("PREMIUM PAYWALL LIVE"));
