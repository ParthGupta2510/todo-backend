const User = require('../models/User');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const checkExisting = await User.findOne({
            name, email
        })
        if (checkExisting !== null) {
            res.status(400).json({
                message: 'Email ID already in use!'
            })
        } else {
            const user = new User({
                name, email, password
            })
            const saveUser = await user.save();
            res.status(200).json({
                message: 'User created successfully!'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json({
            userList,
            message: 'Complete user list returned!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id);
        res.status(200).json({
            user,
            message: 'User data returned!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const pwdReset = async (req, res) => {
    const id = req.params.id;
    const { oldpassword, password } = req.body

    try {
        const user = await User.findById(id);
        if (user.password === oldpassword) {
            const updatePwd = await User.findOneAndUpdate(id, {
                password
            });
            res.status(200).json({
                message: "Password changed successfully!"
            });
        } else {
            res.status(403).json({
                message: "Invalid Old Password!"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateName = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const newName = await User.findByIdAndUpdate(id, {
            name
        })
        res.status(200).json({
            message: 'Name changed successfully!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        const deleteAll = await User.deleteMany();
        res.status(200).json({
            message: 'Deleted all users!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUserData = await User.findByIdAndDelete(id);
        console.log(deleteUserData);
        res.status(200).json({
            message: 'User deleted successfully!'
        })
    } catch (error) {
        res.status(400).json({
            menubar: error.message
        })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    pwdReset,
    updateName,
    deleteAllUsers,
    deleteUserById
}