import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./database/connectDB.js";
import { Messages } from "./constants/messages.js";

async function bootstrap() {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`${Messages.SERVER_RUNNING} on port ${env.port}`);
    });
  } catch (err) {
    console.error(Messages.DB_CONNECTION_FAILED, err);
    process.exit(1);
  }
}

bootstrap();
