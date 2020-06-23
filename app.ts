import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes.ts";

const { HOST, PORT } = config({ safe: true });

const app = new Application();

// Routing
app.use(router.routes());
app.use(router.allowedMethods());

import { Client } from "https://deno.land/x/postgres/mod.ts";
const { POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_PORT } = config({ safe: true });

const client = new Client({
  user: POSTGRES_USERNAME,
  database: POSTGRES_DATABASE,
  hostname: POSTGRES_HOST,
  password: POSTGRES_PASSWORD,
  port: +POSTGRES_PORT,
});

console.log(POSTGRES_USERNAME)
console.log(POSTGRES_DATABASE)
console.log(POSTGRES_HOST)
console.log(POSTGRES_PORT)

try {
    await client.connect();
} catch (error) {
    console.log(`Failed to connect to db in app.js: ${error.stack}`);
}

// Start up
console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
