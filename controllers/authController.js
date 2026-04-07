const User = require ('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
};

module.exports = {
    register: async (req, res) => {
        try {
            const { name, surname, email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);   
            const user = await User.create({
                surname,
                name,
                email: email.trim().toLowerCase(),
                password: hashedPassword
            });

            res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            if (err.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
            }
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const user = await User.findOne({ email: email.trim().toLowerCase() });
            if (!user) {
                return res.status(401).json({ message: "No account found with that email" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ 
                userId: user._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' });

            res.cookie('token', token, cookieOptions);

            // res.json({ token });
            res.status(200).json({
                message: "Logged in",
                user: { id: user._id, email: user.email }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    logout: async (req,res) => {
        try {
            res.clearCookie('token', cookieOptions);

            res.status(200).json({message:"Logged out"})
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}