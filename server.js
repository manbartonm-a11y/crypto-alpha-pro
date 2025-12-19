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

// TEST LOG + REAL WHALES
setInterval(async () => {
  console.log("TEST LOG — CODE IS RUNNING EVERY 30 SEC");

  // your whale code here (keep as is)

}, 30000);

// dashboard code (keep as is)

app.listen(process.env.PORT || 10000, "0.0.0.0");
