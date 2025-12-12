const express = require("express");
const fetch = require("node-fetch");
const app = express();

// THIS LINE IS CRITICAL — parses JSON from Telegram
app.use(express.json());

// WEBHOOK — replies to /start
app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body.message;
    if (msg && msg.text === "/start") {
      const chatId = msg.chat.id;
      await fetch("https://api.telegram.org/bot8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w/sendMessage", {
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

// your existing dashboard (keep everything below)
app.get("/", (req, res) => res.send("OK"));

app.get("/telegram", async (req, res) => {
  // ? your full dashboard code here (price, whale, payments, etc.)
  // (copy-paste your current working dashboard code below this line)
  // ... (everything you had before) ...
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
