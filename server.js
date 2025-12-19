const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// YOUR BOT TOKEN
const BOT_TOKEN = "8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w";

// YOUR TELEGRAM ID (for testing)
const PREMIUM_USERS = new Set(["5946941332"]);

// SEND PUSH TO ALL PREMIUM USERS
async function sendPush(text) {
  for (const chatId of PREMIUM_USERS) {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
    } catch(e) {}
  }
}

// DAILY ALPHA CALL — every 24 hours
setInterval(async () => {
  const msg = "DAILY ALPHA CALL ??\nBTC target: $95,000 in 24h\nBuy the dip — strong support at $88k\nConfidence: High";
  sendPush(msg);
}, 86400000); // 24 hours

// your existing dashboard code (keep everything)

app.listen(process.env.PORT || 10000, "0.0.0.0");
