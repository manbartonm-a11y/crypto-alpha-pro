const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/telegram", async (req, res) => {
  try {
    res.send(\`
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
  body{margin:0;background:#000;color:#0f0;font-family:monospace;padding:20px;text-align:center}
  h1{color:#0ff;font-size:2.8em}
  .p{font-size:4.5em;color:#0f9;margin:15px}
  canvas{border:2px solid #0f0;border-radius:16px;margin:20px}
</style>
</head><body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="p" id="price">Loading...</div>
<div id="change">24h —</div>
<canvas id="chart" height="200"></canvas>
<div style="font-size:1.4em;line-height:1.6;color:#0f9" id="grok">AI loading...</div>
<script>
  Telegram.WebApp.ready(); Telegram.WebApp.expand();
  async function load(){
    const p = await (await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true")).json();
    const s = await (await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7")).json();
    document.getElementById("price").textContent = "$" + Number(p.market_data.current_price.usd).toLocaleString();
    const ch = p.market_data.price_change_percentage_24h;
    document.getElementById("change").innerHTML = "24h " + (ch>0 ? "<span style=\"color:#0f0\">Up "+ch.toFixed(2)+"%</span>" : "<span style=\"color:#f66">Down "+Math.abs(ch).toFixed(2)+"%</span>");
    document.getElementById("grok").textContent = "Bitcoin whales are buying every dip — accumulation confirmed.";
    new Chart(document.getElementById("chart"),{type:"line",data:{datasets:[{data:s.prices.map(x=>x[1]),borderColor:"#0f0",tension:0.4,fill:true,backgroundColor:"rgba(0,255,0,0.1)"}] },options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}}}});
  }
  load(); setInterval(load,60000);
</script>
</body></html>
    \`);
  } catch (e) {
    res.status(500).send("Server error: " + e.message);
  }
});

module.exports = app;
