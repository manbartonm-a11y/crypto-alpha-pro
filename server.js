const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// WEBHOOK — Telegram sends updates here
app.post("/webhook", async (req, res) => {
  const update = req.body;
  if (update.message) {
    const text = update.message.text || "";
    const chatId = update.message.chat.id;

    if (text === "/start") {
      await fetch(`https://api.telegram.org/bot8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: chatId,
          text: "Welcome to Crypto Alpha Pro! ??",
          reply_markup: {
            inline_keyboard: [[{
              text: "Open Dashboard",
              web_app: { url: "https://crypto-alpha-pro.onrender.com/telegram" }
            }]]
          }
        })
      });
    }
  }
  res.sendStatus(200);
});

// your existing dashboard code below (keep everything)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  // ... your full dashboard code here ...
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
