const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// YOUR BOT TOKEN
const BOT_TOKEN = "8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w";

// WEBHOOK — Telegram sends updates here
app.post("/webhook", async (req, res) => {
  const update = req.body;
  if (update.message && update.message.text === "/start") {
    const chatId = update.message.chat.id;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chat_id: chatId,
        text: "Welcome to Crypto Alpha Pro! ??\nClick below to open the dashboard:",
        reply_markup: {
          inline_keyboard: [[{
            text: "Open Dashboard",
            web_app: { url: "https://crypto-alpha-pro.onrender.com/telegram" }
          }]]
        }
      })
    });
  }
  res.sendStatus(200);
});

// your existing dashboard code (keep everything below)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  // ... your full dashboard code here (price, whale, payments, etc.) ...
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
