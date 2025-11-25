const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Root — keep Render alive
app.get("/", (req, res) => {
  res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:100px;font-family:monospace\">Crypto Alpha Pro is LIVE on Render! ??</h1>");
});

// The real Telegram Mini App
app.get("/telegram", async (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
  body{margin:0;background:#000;color:#0f0;font-family:monospace;padding:20px;text-align:center}
  h1{color:#0ff;font-size:2.8em;margin:10px}
  .price{font-size:4.5em;color:#0f9;margin:15px}
  canvas{border:2px solid #0f0;border-radius:16px;margin:20px}
</style>
</head>
<body>
<h1>CRYPTO ALPHA PRO</h1>
<div class="price" id="price">Loading...</div>
<div id="change">24h —</div>
<canvas id="chart" height="200"></canvas>
<div style="font-size:1.4em;line-height:1.6;color:#0f9" id="grok">Loading AI...</div>

<script>
Telegram.WebApp.ready();
Telegram.WebApp.expand();

async function update() {
  try {
    const [pRes, sRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true"),
      fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7")
    ]);
    const p = await pRes.json();
    const s = await sRes.json();

    document.getElementById("price").textContent = "$" + Number(p.market_data.current_price.usd).toLocaleString();
    const ch = p.market_data.price_change_percentage_24h;
    document.getElementById("change").innerHTML = "24h " + (ch>0 ? "<span style=color:#0f0>Up "+ch.toFixed(2)+"%</span>" : "<span style=color:#f66>Down "+Math.abs(ch).toFixed(2)+"%</span>");
    document.getElementById("grok").textContent = "Bitcoin whales are buying every dip — next leg up loading.";

    new Chart(document.getElementById("chart"), {
      type:"line",
      data:{datasets:[{data:s.prices.map(p=>p[1]),borderColor:"#0f0",tension:0.4,fill:true,backgroundColor:"rgba(0,255,0,0.1)"}]},
      options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}}}
    });
  } catch(e) {
    document.body.innerHTML += "<p style=color:#f66>Rate limited — retry in 30s</p>";
  }
}
update();
setInterval(update, 60000);
</script>
</body>
</html>
  \`);
});

// Render needs PORT from environment
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(\`Server running on port \${PORT}\`);
});
