const pool = require("../db");

const getAllHotels = async () => {
    const result = await pool.query(
        "SELECT * FROM hotels ORDER BY hotel_id"
    );
    return result.rows;
};

const getHotelById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM hotels WHERE hotel_id = $1",
        [id]
    );
    return result.rows[0];
};

const createHotel = async (name, city, address, description) => {
    const result = await pool.query(
        `INSERT INTO hotels (name, city, address, description)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, city, address, description]
    );
    return result.rows[0];
};

const updateHotel = async (id, name, city, address, description) => {
    const result = await pool.query(
        `UPDATE hotels
         SET name = $1,
             city = $2,
             address = $3,
             description = $4
         WHERE hotel_id = $5
         RETURNING *`,
        [name, city, address, description, id]
    );
    return result.rows[0];
};

const deleteHotel = async (id) => {
    await pool.query(
        "DELETE FROM hotels WHERE hotel_id = $1",
        [id]
    );
};

module.exports = {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
};