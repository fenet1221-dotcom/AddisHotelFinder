const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail
} = require("../models/userModel");


// REGISTER USER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);


        // Create user
        const user = await createUser(
            name,
            email,
            passwordHash
        );


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// LOGIN USER
const login = async (req, res) => {
    try {

        const { email, password } = req.body;


        // Find user
        const user = await findUserByEmail(email);


        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Compare passwords
        const passwordMatch = await bcrypt.compare(
    password,
    user.password_hash
);


        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT token
        const token = jwt.sign(
            {
                id: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        res.json({
            message: "Login successful",
            token
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    register,
    login
};