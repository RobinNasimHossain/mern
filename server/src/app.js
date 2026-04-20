import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { config } from "./config.js";
import authRoutes from "./routes/auth.js";
import accountRoutes from "./routes/accounts.js";
import transactionRoutes from "./routes/transactions.js";
import { notFound, errorHandler } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.clientOrigin === "*" ? true : config.clientOrigin,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "100kb" }));
  if (config.nodeEnv !== "test") {
    app.use(morgan("dev"));
  }

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use("/api/auth", authLimiter, authRoutes);
  app.use("/api/accounts", accountRoutes);
  app.use("/api/transactions", transactionRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
