import { createApp } from "./app.js";
import { connectDb } from "./db.js";
import { config } from "./config.js";

async function main() {
  await connectDb();
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Wanderlust API listening on http://localhost:${config.port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
