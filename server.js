const express = require("express");
const fetch = require("node-fetch");
const app = express();

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
  const color = change >= 0 ? "#00ff9d" : "#ff006e";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Crypto Alpha Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet">
  <style>
    body{margin:0;background:#0a0e17;color:#e0e0e0;font-family:'Inter',sans-serif;text-align:center;padding:20px}
    h1{color:#00d4ff;font-size:3.5em;text-shadow:0 0 20px #00d4ff}
    .p{font-size:5.5em;color:#00ff9d;margin:10px;text-shadow:0 0 15px #00ff9d}
    canvas{width:95%;max-width:600px;height:280px;border:6px solid #00d4ff;border-radius:20px;margin:30px auto;background:#0f1621;box-shadow:0 0 20px #00d4ff}
    .blur{filter:blur(12px);pointer-events:none}
    .btn{background:linear-gradient(45deg,#00d4ff,#8b00ff);color:#fff;padding:20px 40px;font-size:2em;border-radius:20px;cursor:pointer;margin:15px auto;width:90%;max-width:500px;box-shadow:0 0 20px rgba(0,212,255,0.5);transition:0.3s}
    .btn:hover{transform:scale(1.05)}
  </style>
</head>
<body>
  <h1>CRYPTO ALPHA PRO</h1>
  <div class="p">${priceStr}</div>
  <div style="font-size:2em;color:${color}">24h ${change >= 0 ? "+" : ""}${change}%</div>
  <canvas id="c"></canvas>
  <div style="background:#0f1621;padding:20px;border:3px solid #00d4ff;border-radius:20px;margin:20px;font-size:1.5em${isPremium?'':' class=\"blur\"'}">WHALE ALERT $42.7M BTC to Binance (3 min ago)</div>
  <div style="font-size:1.7em;color:#8b00ff">AI TRACKER Next pump in 4h 21m • Target: $112,000+</div>
  ${isPremium ? '<div style="color:#00ff9d;font-size:2em">PREMIUM ACTIVE</div>' : `
  <div class="btn" onclick="location.href='https://t.me/CryptoBot?start=pay_to_crypto_alert_677_bot'">Pay with Crypto (USDT/BTC/TON)</div>
  <div class="btn" onclick="location.href='https://buy.stripe.com/00wdR92NcfZzdNgahlgEg00'">Pay with Card / PayPal / Apple Pay</div>`}
  <script>
    const c=document.getElementById("c"),x=c.getContext("2d");
    c.width=600;c.height=280;x.fillStyle="#0f1621";x.fillRect(0,0,600,280);
    x.strokeStyle="#00d4ff";x.lineWidth=8;x.beginPath();
    x.moveTo(0,250);x.lineTo(50,230);x.lineTo(100,220);x.lineTo(150,180);x.lineTo(200,200);
    x.lineTo(250,160);x.lineTo(300,140);x.lineTo(350,120);x.lineTo(400,100);x.lineTo(450,80);
    x.lineTo(500,60);x.lineTo(550,40);x.lineTo(600,30);x.stroke();
    x.fillStyle="rgba(0,212,255,0.2)";x.fill();
  </script>
</body>
</html>`;
  res.send(html);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
