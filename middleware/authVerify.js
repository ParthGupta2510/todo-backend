const jwt = require('jsonwebtoken');

exports.verifyUserToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({
        message: "Access Denied"
    })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Invalid token'
        })
    };
}

exports.isUser = async (req, res, next) => {
    const userId = req.params.userId;
    if (req.user._id === userId) {
        next();
    }
    return res.status(401).json({
        message: 'User not Authorised'
    })
}