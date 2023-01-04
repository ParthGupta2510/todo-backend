const router = require('express').Router();

const userController = require('../controllers/user');

// Create user route
router.post('/new', userController.createUser);

// Get all users
router.get('/getAll', userController.getAllUsers);

// Get user by ID
router.get('/getOne/:id', userController.getUserById);

// Update password
router.patch('/pwdReset/:id', userController.pwdReset);

// Update by ID Method
router.patch('/updateName/:id', userController.updateName);

// Delete all users
router.delete('/deleteAll', userController.deleteAllUsers);

// Delete by ID Method
router.delete('/delete/:id', userController.deleteUserById);

module.exports = router;