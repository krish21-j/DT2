
const express = require("express");
const { z } = require("zod");

const app = express();
app.use(express.json());

let thresholds = {
  latency_threshold_ms: 500,
  error_rate_threshold_percent: 5,
  enabled: true,
};

const metrics = [
  { timestamp: new Date().toISOString(), latency_ms: 120, error_rate_percent: 1.2 },
  { timestamp: new Date().toISOString(), latency_ms: 180, error_rate_percent: 2 },
];

app.get("/api/v1/monitoring/summary", (req, res) => {
  res.json({
    service: "payment-api",
    status: "healthy",
    latency_ms: { average: 150, p95: 180 },
    error_rate_percent: 1.6,
    total_requests: 1000,
  });
});

app.get("/api/v1/monitoring/metrics", (req, res) => {
  const window = req.query.window || "1h";

  if (!["15m", "1h", "24h"].includes(window))
    return res.status(400).json({ error: "Invalid window" });

  res.json({ window, metrics });
});

app.get("/api/v1/alerts/thresholds", (req, res) => {
  res.json(thresholds);
});

app.put("/api/v1/alerts/thresholds", (req, res) => {
  const schema = z.object({
    latency_threshold_ms: z.number().positive(),
    error_rate_threshold_percent: z.number().min(0).max(100),
    enabled: z.boolean(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success)
    return res.status(422).json({ error: "Invalid threshold" });

  thresholds = result.data;
  res.json({ message: "Thresholds updated", thresholds });
});

app.listen(8000, () => console.log("Server running on port 8000"));
