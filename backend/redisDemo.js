const { createClient } = require("redis");

async function run() {
  const client = createClient({ url: "redis://redis:6379" });
  await client.connect();
  await client.set("test_key", "Merhaba Redis!");
  const value = await client.get("test_key");
  console.log("Redis test_key:", value);
  await client.quit();
}

run().catch(console.error);
