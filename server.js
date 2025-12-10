const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req, res) => res.send("OK"));

// /start handler — replies with welcome + button to open dashboard
app.get("/start", async (req, res) => {
  const chatId = req.query.id; // get from URL param (we'll link to it)
  if (!chatId) return res.send("No chat ID");

  try {
    await fetch(`https://api.telegram.org/bot8145055066:AAHU1p-W8kUdDd8t7qhF1KiEtb3qVWkQ91w/sendMessage`, {
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
    res.send("Sent /start reply");
  } catch(e) {
    res.send("Error");
  }
});

// your existing /telegram dashboard code (keep everything below)
app.get("/telegram", async (req, res) => {
  // ... your full dashboard code here ...
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
