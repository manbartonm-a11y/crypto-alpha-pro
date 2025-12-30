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

// REAL WHALES + TEST DM EVERY 5 MIN TO PROVE IT WORKS
setInterval(async () => {
  console.log("Checking whales...");
  sendPush("TEST: System running — waiting for whale move...");

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

    // ETH $500k+
    query = `{ ethereum(network: ethereum) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "150"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
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

    // SOL $500k+
    query = `{ solana(network: solana) { transfers(options: {limit: 1, desc: "block.height"}, amount: {gt: "2500"}) { amount receiver { address } sender { address } block { timestamp { time } } } } }`;
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
  } catch(e) {
    console.log("Whale error:", e);
  }
}, 300000); // 5 min for test (change to 30000 for 30 sec later)

// your dashboard code (keep as is)

app.listen(process.env.PORT || 10000, "0.0.0.0");
