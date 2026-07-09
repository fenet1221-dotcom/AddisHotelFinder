const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    viewMyBookings,
    viewAllBookings,
    bookRoom,
    cancelMyBooking
} = require("../controllers/bookingController");

// Customer routes
router.get("/my", authenticateToken, viewMyBookings);
router.post("/", authenticateToken, bookRoom);
router.put("/cancel/:id", authenticateToken, cancelMyBooking);

// Admin route (we'll add admin-only protection later)
router.get("/", authenticateToken, viewAllBookings);

module.exports = router;