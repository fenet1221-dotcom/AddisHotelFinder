const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getHotels,
    getHotel,
    addHotel,
    editHotel,
    removeHotel
} = require("../controllers/hotelController");

// Public routes
router.get("/", getHotels);
router.get("/:id", getHotel);

// Protected routes
router.post("/", authenticateToken, addHotel);
router.put("/:id", authenticateToken, editHotel);
router.delete("/:id", authenticateToken, removeHotel);

module.exports = router;