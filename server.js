const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// WEBHOOK ROUTE — FIXED TO HANDLE /start
app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body.message;
    if (msg && msg.text && msg.text.trim() === "/start") {
      const chatId = msg.chat.id;
      await fetch(`https://api.telegram.org/bot8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Welcome to Crypto Alpha Pro! ??\nClick below to open the live dashboard:",
          reply_markup: {
            inline_keyboard: [[
              { text: "Open Dashboard", web_app: { url: "https://crypto-alpha-pro.onrender.com/telegram" } }
            ]]
          }
        })
      });
      console.log("Sent /start reply to chatId:", chatId);
    }
  } catch(e) {
    console.log("Webhook error:", e);
  }
  res.sendStatus(200);
});

// YOUR FULL DASHBOARD (keep as is)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  const userId = req.query.id || "0";
  const isPremium = userId === "777000";

  let price = 89600, change = "-2.84";
  try {
    const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
    if (r.ok) {
      const j = await r.json();
      price = Math.round(j.bitcoin.usd);
      change = j.bitcoin.usd_24h_change.toFixed(2);
    }
  } catch(e) {}

  const priceStr = "$" + price.toLocaleString("en-US");
  const color = change >= 0 ? "#0f0" : "#f66";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Crypto Alpha Pro</title>
  <style>
    body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
    h1{color:#0ff;font-size:3.5em}
    .p{font-size:5.5em;color:#0f9;margin:10px}
    canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;background:#000}
    .blur{filter:blur(12px);pointer-events:none}
    .btn{background:#0f0;color:#000;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:15px auto;width:90%;max-width:500px}
  </style>
</head>
<body>
  <h1>CRYPTO ALPHA PRO</h1>
  <div class="p">${priceStr}</div>
  <div style="font-size:2em;color:${color}">24h ${change >= 0 ? "+" : ""}${change}%</div>
  <canvas id="c"></canvas>
  <div style="background:#001a00;padding:20px;border:3px solid #0f0;border-radius:20px;margin:20px;font-size:1.5em${isPremium?'':' class=\"blur\"'}">WHALE ALERT $42.7M BTC to Binance (3 min ago)</div>
  <div style="font-size:1.7em;color:#0f9">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>
  ${isPremium ? '<div style="color:#0f9;font-size:2em">PREMIUM ACTIVE</div>' : `
  <div class="btn" onclick="location.href='https://t.me/CryptoBot?start=pay_to_crypto_alert_677_bot'">Pay with Crypto (USDT/BTC/TON)</div>
  <div class="btn" onclick="location.href='https://buy.stripe.com/00wdR92NcfZzdNgahlgEg00'">Pay with Card / PayPal / Apple Pay</div>`}
  <script>
    const c=document.getElementById("c"),x=c.getContext("2d");
    c.width=600;c.height=280;x.fillStyle="#000";x.fillRect(0,0,600,280);
    x.strokeStyle="#0f0";x.lineWidth=8;x.beginPath();
    x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);
    x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);
    x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();
    x.fillStyle="rgba(0,255,0,0.3)";x.fill();
  </script>
</body>
</html>`;
  res.send(html);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
