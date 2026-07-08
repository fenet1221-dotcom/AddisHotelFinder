const pool = require("../db");

// Create a new user
const createUser = async (name, email, passwordHash, role = "customer") => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, email, passwordHash, role]
    );

    return result.rows[0];
};


// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};


// Find user by ID
const findUserById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};