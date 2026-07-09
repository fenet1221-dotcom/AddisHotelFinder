const {
    getMyBookings,
    getAllBookings,
    createBooking,
    cancelBooking
} = require("../models/bookingModel");

const viewMyBookings = async (req, res) => {
    try {
        const bookings = await getMyBookings(req.user.id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewAllBookings = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const bookRoom = async (req, res) => {
    try {
        const { room_id, check_in_date, check_out_date } = req.body;

        const booking = await createBooking(
            req.user.id,
            room_id,
            check_in_date,
            check_out_date
        );

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const cancelMyBooking = async (req, res) => {
    try {
        const booking = await cancelBooking(
            req.params.id,
            req.user.id
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        res.json({
            message: "Booking cancelled successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    viewMyBookings,
    viewAllBookings,
    bookRoom,
    cancelMyBooking
};