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

            const token = jwt.sign({ 
                userId: user._id, 
                role: user.role}, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' });

            res.cookie('token', token, {...cookieOptions, maxAge: 1000 * 60 * 60 * 24});

            res.status(201).json({ user: { id: user._id, email: user.email, name: user.name, surname: user.surname }, message: "User registered successfully" });
        } catch (err) {
            if (err.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
            }
            console.error('Register failed:', err);
            res.status(500).json({message: 'Error registering user' });
        }
    },

    guest: async(req, res) => {
        try{
            const hashedPassword = await bcrypt.hash('random', 10);  
            const guest= {
                name: 'Guest',
                surname: 'User',
                email: `guest_${Date.now()}@guest.local`,
                password: hashedPassword,
                role: 'guest',
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }

            const guestUser = await User.create(guest);

            const token = jwt.sign({ 
                userId: guestUser._id,
                role: guestUser.role}, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' });

            res.cookie('token', token, {...cookieOptions, maxAge: 1000 * 60 * 60 * 24});

            // res.json({ token });
            res.status(200).json({
                message: "Logged in",
                user: { 
                    id: guestUser._id,
                    email: guestUser.email,
                    name: guestUser.name,
                    surname: guestUser.surname}});
            }catch(err){
                console.error('Guest login failed:', err);
                res.status(500).json({message: 'Error logging in as guest'})
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
                user: { id: user._id, email: user.email,name: user.name, surname: user.surname}
            });
        } catch (err) {
            console.error('Login failed:', err);
            res.status(500).json({ message: 'Error logging in' });
        }
    },
    logout: async (req, res) => {
        try {
            const token = req.cookies.token 

            if(token){
                try{
                    const payload = jwt.verify(token, process.env.JWT_SECRET)
                    if(payload.role === 'guest'){
                        await User.deleteOne({_id: payload.userId});
                    }
                }catch(err){
                        console.error('Guest cleanup failed during logout:', err)
                }
            }

            res.clearCookie('token', cookieOptions);

            res.status(200).json({message: "Logged out" })
        } catch (err) {
            console.error('Logout failed:', err);
            res.status(500).json({ message: 'Error logging out' });
        }
    },
    me: async (req, res) => {
        try{
            res.status(200).json({
                message: "Logged in",
                user: req.user
            });
        }catch(err){
            console.error('Fetch current user failed:', err);
            res.status(500).json({ message: 'Error fetching current user' });
        }
    }
}