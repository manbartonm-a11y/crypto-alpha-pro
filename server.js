const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

let lastWhale = "WHALE ALERT $42.7M BTC to Binance (3 min ago)";

// Store real paid users (Telegram ID)
const PREMIUM_USERS = new Set();

// AUTO-UNLOCK AFTER PAYMENT — Stripe + CryptoBot
app.post("/unlock", async (req, res) => {
  let userId = null;

  // Stripe webhook
  if (req.body?.data?.object?.metadata?.telegram_id) {
    userId = req.body.data.object.metadata.telegram_id;
  }
  // CryptoBot webhook
  else if (req.body?.telegram_id) {
    userId = req.body.telegram_id;
  }

  if (userId) {
    PREMIUM_USERS.add(userId);
    console.log("Unlocked premium for:", userId);
  }
  res.sendStatus(200);
});

// your existing dashboard (unchanged)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  const isPremium = PREMIUM_USERS.has(req.query.id || "0");

  // ... [your full working dashboard code here] ...

  res.send(html);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
