const express = require("express");
const router = express.Router();
const authorizeRole = require("../middleware/roleMiddleware");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getRooms,
    getRoom,
    addRoom,
    editRoom,
    removeRoom
} = require("../controllers/roomController");


// View rooms
router.get("/", getRooms);

router.get("/:id", getRoom);


// Protected routes
router.post("/", authenticateToken, authorizeRole("admin"), addRoom);

router.put("/:id", authenticateToken, authorizeRole("admin"), editRoom);

router.delete("/:id", authenticateToken, authorizeRole("admin"), removeRoom);


module.exports = router;