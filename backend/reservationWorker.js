const amqp = require("amqplib");

async function run() {
  const queue = "reservation_queue";
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  console.log("Reservation worker kuyruğu dinliyor...");
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log("Yeni rezervasyon alındı:", data);
      channel.ack(msg);
    }
  });
}

run().catch(console.error);
