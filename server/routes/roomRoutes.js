const express = require("express");
const router = express.Router();

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
router.post("/", authenticateToken, addRoom);

router.put("/:id", authenticateToken, editRoom);

router.delete("/:id", authenticateToken, removeRoom);


module.exports = router;