const User = require('../model/adminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY || 'ambreshvaishya';


// Login function
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Admin User does not exist' });
        }

        // Compare the provided password with the hashed password stored in the database
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid credentials' });
        // }
		if(password != user.password){
			return res.status(400).json({ message: 'Invalid credentials' });
		}

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token : token, message: "Successfully Admin Login"});
    } catch (error) {
        console.error('Error during Admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = adminLogin ;
