const {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} = require("../models/roomModel");


const getRooms = async (req, res) => {
    try {
        const rooms = await getAllRooms();
        res.json(rooms);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getRoom = async (req, res) => {
    try {
        const room = await getRoomById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json(room);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const addRoom = async (req, res) => {
    try {

        const {
            hotel_id,
            room_type,
            price_per_night,
            capacity,
            description
        } = req.body;


        const room = await createRoom(
            hotel_id,
            room_type,
            price_per_night,
            capacity,
            description
        );


        res.status(201).json(room);


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const editRoom = async (req, res) => {
    try {

        const {
            room_type,
            price_per_night,
            capacity,
            description
        } = req.body;


        const room = await updateRoom(
            req.params.id,
            room_type,
            price_per_night,
            capacity,
            description
        );


        res.json(room);


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const removeRoom = async (req, res) => {
    try {

        await deleteRoom(req.params.id);


        res.json({
            message: "Room deleted successfully"
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getRooms,
    getRoom,
    addRoom,
    editRoom,
    removeRoom
};