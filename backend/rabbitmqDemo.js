const amqp = require("amqplib");

async function run() {
  const queue = "test_queue";
  const msg = "Merhaba RabbitMQ!";
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  // Mesaj gönder
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log("Mesaj gönderildi:", msg);
  // Mesaj dinle
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Mesaj alındı:", msg.content.toString());
      channel.ack(msg);
    }
  });
}

run().catch(console.error);
