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

// REAL WHALES — BTC $100k+, ETH $300k+, SOL $300k+
setInterval(async () => {
  try {
    // BTC $100k+
    let query = `{ bitcoin(network: bitcoin) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "10000000"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
    let r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      let j = await r.json();
      let t = j.data?.bitcoin?.transfers?.[0];
      if (t) {
        let btc = (t.amount / 1e8).toFixed(1);
        let msg = `REAL WHALE ALERT ${btc} BTC (~$${Math.round(btc * 89600).toLocaleString()}M) just now!`;
        lastWhale = msg;
        sendPush(msg);
        return;
      }
    }

    // ETH $300k+
    query = `{ ethereum(network: ethereum) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "100"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
    r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      let j = await r.json();
      let t = j.data?.ethereum?.transfers?.[0];
      if (t) {
        let eth = t.amount.toFixed(1);
        let msg = `REAL WHALE ALERT ${eth} ETH (~$${Math.round(eth * 3200).toLocaleString()}M) just now!`;
        lastWhale = msg;
        sendPush(msg);
        return;
      }
    }

    // SOL $300k+
    query = `{ solana(network: solana) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "1500"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
    r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      let j = await r.json();
      let t = j.data?.solana?.transfers?.[0];
      if (t) {
        let sol = t.amount.toFixed(1);
        let msg = `REAL WHALE ALERT ${sol} SOL (~$${Math.round(sol * 200).toLocaleString()}M) just now!`;
        lastWhale = msg;
        sendPush(msg);
      }
    }
  } catch(e) {}
}, 30000);

// dashboard code (keep everything)

app.listen(process.env.PORT || 10000, "0.0.0.0");
