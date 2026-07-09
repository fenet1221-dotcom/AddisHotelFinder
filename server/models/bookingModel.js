const pool = require("../db");

const getMyBookings = async (userId) => {
    const result = await pool.query(
        `SELECT b.*, r.room_type, h.name AS hotel_name
         FROM bookings b
         JOIN rooms r ON b.room_id = r.room_id
         JOIN hotels h ON r.hotel_id = h.hotel_id
         WHERE b.user_id = $1
         ORDER BY b.booking_id`,
        [userId]
    );
    return result.rows;
};

const getAllBookings = async () => {
    const result = await pool.query(
        `SELECT b.*, u.name AS customer_name,
                r.room_type, h.name AS hotel_name
         FROM bookings b
         JOIN users u ON b.user_id = u.user_id
         JOIN rooms r ON b.room_id = r.room_id
         JOIN hotels h ON r.hotel_id = h.hotel_id
         ORDER BY b.booking_id`
    );
    return result.rows;
};

const createBooking = async (
    userId,
    roomId,
    checkIn,
    checkOut
) => {

    const overlap = await pool.query(
        `SELECT *
         FROM bookings
         WHERE room_id = $1
         AND status = 'confirmed'
         AND check_in_date < $3
         AND check_out_date > $2`,
        [roomId, checkIn, checkOut]
    );

    if (overlap.rows.length > 0) {
        throw new Error("Room is already booked for those dates.");
    }

    const result = await pool.query(
        `INSERT INTO bookings
        (user_id, room_id, check_in_date, check_out_date)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [userId, roomId, checkIn, checkOut]
    );

    return result.rows[0];
};

const cancelBooking = async (bookingId, userId) => {
    const result = await pool.query(
        `UPDATE bookings
         SET status='cancelled'
         WHERE booking_id=$1
         AND user_id=$2
         RETURNING *`,
        [bookingId, userId]
    );

    return result.rows[0];
};

module.exports = {
    getMyBookings,
    getAllBookings,
    createBooking,
    cancelBooking
};