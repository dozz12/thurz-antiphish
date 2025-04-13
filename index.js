const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function isPhishingLink(url) {
  const keywords = ['login', 'verify', 'secure', 'update', 'bank'];
  return keywords.some(word => url.toLowerCase().includes(word));
}

app.post("/check-link", (req, res) => {
  const { url } = req.body;
  const result = isPhishingLink(url) ? "⚠️ Link terindikasi phishing" : "✅ Link aman";
  res.json({ result });
});

app.post("/report", (req, res) => {
  const { url, description, email } = req.body;
  const report = {
    url, description, email,
    date: new Date().toISOString()
  };

  let reports = [];
  if (fs.existsSync("reports.json")) {
    reports = JSON.parse(fs.readFileSync("reports.json"));
  }
  reports.push(report);
  fs.writeFileSync("reports.json", JSON.stringify(reports, null, 2));
  res.json({ message: "✅ Laporan diterima. Terima kasih!" });
});

app.listen(PORT, () => console.log(`🛡️ Backend jalan di http://localhost:${PORT}`));
