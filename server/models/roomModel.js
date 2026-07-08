const pool = require("../db");

const getAllRooms = async () => {
    const result = await pool.query(
        "SELECT * FROM rooms ORDER BY room_id"
    );
    return result.rows;
};


const getRoomById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM rooms WHERE room_id = $1",
        [id]
    );
    return result.rows[0];
};


const createRoom = async (
    hotel_id,
    room_type,
    price_per_night,
    capacity,
    description
) => {

    const result = await pool.query(
        `INSERT INTO rooms 
        (hotel_id, room_type, price_per_night, capacity, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            hotel_id,
            room_type,
            price_per_night,
            capacity,
            description
        ]
    );

    return result.rows[0];
};


const updateRoom = async (
    id,
    room_type,
    price_per_night,
    capacity,
    description
) => {

    const result = await pool.query(
        `UPDATE rooms
        SET room_type = $1,
            price_per_night = $2,
            capacity = $3,
            description = $4
        WHERE room_id = $5
        RETURNING *`,
        [
            room_type,
            price_per_night,
            capacity,
            description,
            id
        ]
    );

    return result.rows[0];
};


const deleteRoom = async (id) => {

    await pool.query(
        "DELETE FROM rooms WHERE room_id = $1",
        [id]
    );

};


module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};