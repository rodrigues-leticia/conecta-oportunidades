import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import opportunitiesRouter from "./routes/opportunities.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.use("/api/opportunities", opportunitiesRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Erro interno do servidor." });
});

app.listen(port, () => {
  console.log(`API executando em http://localhost:${port}`);
});
