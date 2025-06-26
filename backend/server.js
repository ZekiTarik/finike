const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const amqp = require("amqplib");

const app = express();

// Connect to MongoDB if MONGODB_URI is available
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB bağlantısı başarılı"))
    .catch((err) => console.error("MongoDB bağlantı hatası:", err));
} else {
  console.log("MongoDB bağlantısı atlanıyor. In-memory veriler kullanılacak.");
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const hotelsRouter = require("./routes/hotels");
const bookingsRouter = require("./routes/bookings");
const reviewsRoutes = require("./routes/reviews");
const favoritesRoutes = require("./routes/favorites");
const campaignsRouter = require("./routes/campaigns");
const feedbackRoutes = require("./routes/feedback");
const complaintsRouter = require("./routes/complaints");

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/complaints", complaintsRouter);

let rabbitChannel;

async function setupRabbitMQ() {
  try {
    const conn = await amqp.connect("amqp://rabbitmq");
    rabbitChannel = await conn.createChannel();
    await rabbitChannel.assertQueue("reservation_queue", { durable: false });
    console.log("RabbitMQ bağlantısı başarılı");
  } catch (err) {
    console.error("RabbitMQ bağlantı hatası:", err);
  }
}
setupRabbitMQ();

// Rezervasyon işlemleri için endpoint
app.post("/api/bookings", async (req, res) => {
  const { hotelId, checkIn, checkOut, guests, roomType, name, email, phone } =
    req.body;
  const booking = {
    hotelId,
    checkIn,
    checkOut,
    guests,
    roomType,
    name,
    email,
    phone,
    bookingDate: new Date().toISOString(),
  };
  // RabbitMQ'ya mesaj gönder
  try {
    if (rabbitChannel) {
      rabbitChannel.sendToQueue(
        "reservation_queue",
        Buffer.from(JSON.stringify(booking))
      );
      console.log("Rezervasyon RabbitMQ kuyruğuna gönderildi.");
    } else {
      console.warn("RabbitMQ bağlantısı yok, mesaj gönderilemedi.");
    }
  } catch (err) {
    console.error("RabbitMQ mesaj gönderme hatası:", err);
  }
  // Yanıt dön
  res.status(200).json({
    success: true,
    message: "Rezervasyon başarıyla oluşturuldu",
    booking,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Bir şeyler ters gitti!" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Tatilim API is running");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`API Endpoints:`);
  console.log(`- Hotels: http://localhost:${PORT}/api/hotels`);
  console.log(`- Complaints: http://localhost:${PORT}/api/complaints`);
  console.log(`- Campaigns: http://localhost:${PORT}/api/campaigns`);
});
