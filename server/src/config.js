import dotenv from "dotenv";

dotenv.config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT || 4000),
  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/mern_banking"),
  jwtSecret: required("JWT_SECRET", "dev-only-secret-change-me"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
};
