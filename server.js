const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send("<h1 style=\"color:#0f0;background:#000;text-align:center;padding:200px;font-family:monospace\">CRYPTO ALPHA PRO LIVE!<br><a href=\"/telegram\" style=\"color:#0ff;font-size:50px\">OPEN DASHBOARD</a></h1>"));

app.get("/telegram", (req,res)=>{
  res.send(`
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Crypto Alpha Pro</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
body{margin:0;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:20px}
h1{color:#0ff;font-size:3em}
.p{font-size:5.5em;color:#0f9;margin:10px}
canvas{width:95%;max-width:600px;height:280px;border:6px solid #0f0;border-radius:20px;margin:30px auto;display:block;background:#000}
</style>
</head><body onload="Telegram.WebApp.ready();Telegram.WebApp.expand()">
<h1>CRYPTO ALPHA PRO</h1>
<div class="p">$108,420</div>
<div style="font-size:2em;color:#0f0">24h Up +6.9%</div>
<canvas id="c" width="600" height="280"></canvas>
<div style="font-size:1.7em;color:#0f9;margin-top:20px">Whales buying the dip — next leg up loading</div>
<script>
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 280;

// Clear background
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 600, 280);

// Draw the line (y from 250 to 50 — fully visible)
ctx.strokeStyle = "#0f0";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(0, 250);
ctx.lineTo(60, 240);
ctx.lineTo(120, 220);
ctx.lineTo(180, 200);
ctx.lineTo(240, 180);
ctx.lineTo(300, 160);
ctx.lineTo(360, 140);
ctx.lineTo(420, 120);
ctx.lineTo(480, 100);
ctx.lineTo(540, 80);
ctx.lineTo(600, 60);
ctx.stroke();

// Fill under the line
ctx.fillStyle = "rgba(0,255,0,0.3)";
ctx.beginPath();
ctx.moveTo(0, 250);
ctx.lineTo(60, 240);
ctx.lineTo(120, 220);
ctx.lineTo(180, 200);
ctx.lineTo(240, 180);
ctx.lineTo(300, 160);
ctx.lineTo(360, 140);
ctx.lineTo(420, 120);
ctx.lineTo(480, 100);
ctx.lineTo(540, 80);
ctx.lineTo(600, 60);
ctx.lineTo(600, 280);
ctx.lineTo(0, 280);
ctx.closePath();
ctx.fill();
</script>
</body></html>`);
});

app.listen(process.env.PORT || 10000, "0.0.0.0");
