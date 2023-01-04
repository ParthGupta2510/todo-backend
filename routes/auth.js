const router = require('express').Router();
const authController = require('../controllers/auth');

// signup user
router.post("/signup", authController.signup);

// login user
router.post("/login", authController.login);

module.exports = router;