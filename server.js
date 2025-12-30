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
      console.log("DM sent:", text);
    } catch(e) {
      console.log("Push error:", e);
    }
  }
}

// REAL WHALES — BitQuery (BTC $50k+, ETH $100k+, SOL $100k+, BNB $100k+)
setInterval(async () => {
  console.log("Checking for whales...");
  let found = false;

  try {
    // BTC $50k+
    let query = `{ bitcoin(network: bitcoin) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "5000000"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
    let r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
    if (r.ok) {
      let j = await r.json();
      let t = j.data?.bitcoin?.transfers?.[0];
      if (t) {
        let btc = (t.amount / 1e8).toFixed(1);
        let msg = `REAL WHALE ALERT ${btc} BTC (~$${Math.round(btc * 89600).toLocaleString()}K) just now!`;
        lastWhale = msg;
        sendPush(msg);
        found = true;
      }
    }
  } catch(e) {
    console.log("BTC whale error:", e);
  }

  if (!found) {
    try {
      // ETH $100k+
      let query = `{ ethereum(network: ethereum) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "30"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
      let r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
      if (r.ok) {
        let j = await r.json();
        let t = j.data?.ethereum?.transfers?.[0];
        if (t) {
          let eth = t.amount.toFixed(1);
          let msg = `REAL WHALE ALERT ${eth} ETH (~$${Math.round(eth * 3200).toLocaleString()}K) just now!`;
          lastWhale = msg;
          sendPush(msg);
          found = true;
        }
      }
    } catch(e) {
      console.log("ETH whale error:", e);
    }
  }

  if (!found) {
    try {
      // SOL $100k+
      let query = `{ solana(network: solana) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "500"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
      let r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
      if (r.ok) {
        let j = await r.json();
        let t = j.data?.solana?.transfers?.[0];
        if (t) {
          let sol = t.amount.toFixed(1);
          let msg = `REAL WHALE ALERT ${sol} SOL (~$${Math.round(sol * 200).toLocaleString()}K) just now!`;
          lastWhale = msg;
          sendPush(msg);
          found = true;
        }
      }
    } catch(e) {
      console.log("SOL whale error:", e);
    }
  }

  if (!found) {
    try {
      // BNB $100k+
      let query = `{ binancecoin(network: bsc) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "200"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
      let r = await fetch("https://graphql.bitquery.io", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({query})});
      if (r.ok) {
        let j = await r.json();
        let t = j.data?.binancecoin?.transfers?.[0];
        if (t) {
          let bnb = t.amount.toFixed(1);
          let msg = `REAL WHALE ALERT ${bnb} BNB (~$${Math.round(bnb * 600).toLocaleString()}K) just now!`;
          lastWhale = msg;
          sendPush(msg);
        }
      }
    } catch(e) {
      console.log("BNB whale error:", e);
    }
  }
}, 30000);

// dashboard code (keep as is)

app.listen(process.env.PORT || 10000, "0.0.0.0");
