const express = require("express");
const router = express.Router();

// Örnek otel verileri
let hotels = [
  {
    id: "1",
    name: "Grand Hotel",
    location: "İstanbul, Türkiye",
    price: 1500,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Şehrin merkezinde lüks bir otel deneyimi.",
    facilities: ["WiFi", "Spa", "Havuz", "Restoran", "Bar", "Fitness Merkezi"],
    photos: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
  },
  {
    id: "2",
    name: "Lüks Resort",
    location: "Antalya, Türkiye",
    price: 2000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
    description: "Deniz kenarında lüks bir tatil deneyimi için idealdir.",
    facilities: ["WiFi", "Plaj", "Havuz", "Spa", "Restoran", "Bar", "Fitness"],
    photos: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    id: "3",
    name: "Deniz View Hotel",
    location: "Bodrum, Türkiye",
    price: 1800,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Deniz manzaralı odalarda konforlu bir konaklama.",
    facilities: ["WiFi", "Havuz", "Restoran", "Bar", "Özel Plaj"],
    photos: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
  },
  {
    id: "4",
    name: "Premium Resort",
    location: "Fethiye, Türkiye",
    price: 2200,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Lüks bir tatil deneyimi için tasarlanmış premium tesis.",
    facilities: [
      "WiFi",
      "Özel Plaj",
      "Spa",
      "Infinity Havuz",
      "Gourmet Restoran",
      "Su Sporları",
    ],
    photos: [
      "https://images.unsplash.com/photo-1601701119533-fde70375eb5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1049&q=80",
    ],
  },
];

// Tüm otelleri getir
router.get("/", (req, res) => {
  res.json(hotels);
});

// Belirli bir oteli getir
router.get("/:id", (req, res) => {
  const hotel = hotels.find((h) => h.id === req.params.id);
  if (!hotel) {
    return res.status(404).json({ message: "Otel bulunamadı" });
  }
  res.json(hotel);
});

// Yeni otel ekle
router.post("/", (req, res) => {
  const newHotel = {
    id: (hotels.length + 1).toString(),
    ...req.body,
    photos: req.body.photos || [],
  };

  hotels.push(newHotel);
  res.status(201).json(newHotel);
});

// Otel güncelle
router.put("/:id", (req, res) => {
  const index = hotels.findIndex((h) => h.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Otel bulunamadı" });
  }

  hotels[index] = {
    ...hotels[index],
    ...req.body,
  };

  res.json(hotels[index]);
});

// Otel sil
router.delete("/:id", (req, res) => {
  const index = hotels.findIndex((h) => h.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Otel bulunamadı" });
  }

  hotels.splice(index, 1);
  res.json({ message: "Otel başarıyla silindi" });
});

module.exports = router;
