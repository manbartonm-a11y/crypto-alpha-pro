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

// REAL WHALES — BitQuery (BTC $500k+, ETH $1M+, SOL $1M+)
setInterval(async () => {
  try {
    // BTC $500k+
    let query = `{ bitcoin(network: bitcoin) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "50000000"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
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

    // ETH $1M+
    query = `{ ethereum(network: ethereum) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "300"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
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

    // SOL $1M+
    query = `{ solana(network: solana) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "5000"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
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

// dashboard code (keep as is)

app.listen(process.env.PORT || 10000, "0.0.0.0");
