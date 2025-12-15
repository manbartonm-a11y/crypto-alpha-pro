const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// WEBHOOK — REPLIES TO /start
app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body.message;
    if (msg && msg.text && msg.text.trim() === "/start") {
      const chatId = msg.chat.id;
      await fetch(`https://api.telegram.org/bot8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Welcome to Crypto Alpha Pro! ??\nClick below to open the live dashboard:",
          reply_markup: {
            inline_keyboard: [[
              { text: "Open Dashboard", web_app: { url: "https://crypto-alpha-pro.onrender.com/telegram" } }
            ]]
          }
        })
      });
    }
  } catch(e) {}
  res.sendStatus(200);
});

// YOUR FULL DASHBOARD (keep everything else)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  // your full dashboard code here (price, whale, payments, etc.)
  // (copy-paste your current working dashboard code)
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
