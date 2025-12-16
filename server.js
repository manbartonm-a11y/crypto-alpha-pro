const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

let lastWhale = "WHALE ALERT $42.7M BTC to Binance (3 min ago)";

// YOUR BOT TOKEN
const BOT_TOKEN = "8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w";

// YOUR TELEGRAM ID
const PREMIUM_USERS = new Set(["5946941332"]);

// SEND PUSH
async function sendPush(text) {
  for (const chatId of PREMIUM_USERS) {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
    } catch(e) {}
  }
}

// TEST + REAL WHALES
setInterval(async () => {
  sendPush("TEST: Real whales ready — waiting for move...");

  try {
    const query = `{ bitcoin(network: bitcoin) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "100000000"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
    const r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      const j = await r.json();
      const t = j.data?.bitcoin?.transfers?.[0];
      if (t) {
        const btc = (t.amount / 1e8).toFixed(1);
        const msg = `REAL WHALE ALERT ${btc} BTC (~$${Math.round(btc * 89000).toLocaleString()}M) just now!`;
        lastWhale = msg;
        sendPush(msg);
      }
    }
  } catch(e) {}
}, 30000);

// your dashboard code (keep as is)

app.listen(process.env.PORT || 10000, "0.0.0.0");
