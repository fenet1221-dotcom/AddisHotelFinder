const express = require("express");
const router = express.Router();
const authorizeRole = require("../middleware/roleMiddleware");
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
router.post("/", authenticateToken, authorizeRole("admin"), addHotel);

router.put("/:id", authenticateToken, authorizeRole("admin"), editHotel);

router.delete("/:id", authenticateToken, authorizeRole("admin"), removeHotel);

module.exports = router;