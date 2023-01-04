const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    // check for existing user
    const emailExists = await User.findOne({email});
    if (emailExists) {
        res.status(400).json({
            message: 'Email already exists'
        });
        return;
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({
        name, email, password: hashedPassword
    });

    try {
        const saveUser = await user.save();
        res.status(200).json({
            message: "User created!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if email exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({
            message: "Incorrect Email ID"
        });
        
        // checking password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({
            message: "Incorrect Password"
        });
        
        // generating token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '30min'});

        // sending back the token
        res.header("auth-token", token)
        .status(200).json({
            message: "Login Successful"
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} 

module.exports = {
    signup,
    login
}