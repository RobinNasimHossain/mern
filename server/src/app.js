import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { config } from "./config.js";
import packageRoutes from "./routes/packages.js";
import bookingRoutes from "./routes/bookings.js";
import contactRoutes from "./routes/contact.js";
import reviewRoutes from "./routes/reviews.js";
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

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use("/api/packages", apiLimiter, packageRoutes);
  app.use("/api/bookings", apiLimiter, bookingRoutes);
  app.use("/api/contact", apiLimiter, contactRoutes);
  app.use("/api/reviews", apiLimiter, reviewRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
