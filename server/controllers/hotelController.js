const {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} = require("../models/hotelModel");

const getHotels = async (req, res) => {
    try {
        const hotels = await getAllHotels();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHotel = async (req, res) => {
    try {
        const hotel = await getHotelById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        res.json(hotel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addHotel = async (req, res) => {
    try {
        const { name, city, address, description } = req.body;

        const hotel = await createHotel(
            name,
            city,
            address,
            description
        );

        res.status(201).json(hotel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editHotel = async (req, res) => {
    try {
        const { name, city, address, description } = req.body;

        const hotel = await updateHotel(
            req.params.id,
            name,
            city,
            address,
            description
        );

        res.json(hotel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeHotel = async (req, res) => {
    try {
        await deleteHotel(req.params.id);

        res.json({
            message: "Hotel deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHotels,
    getHotel,
    addHotel,
    editHotel,
    removeHotel
};