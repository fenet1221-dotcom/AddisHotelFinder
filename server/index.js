require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authenticateToken = require("./middleware/authMiddleware");
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted!",
        user: req.user
    });
});

app.get("/", (req, res) => {
    res.send("Hotel Booking API is running");
});

// TEST DATABASE CONNECTION
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});