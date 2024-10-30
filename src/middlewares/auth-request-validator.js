const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Email or password missing in signup form'
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.userId) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'userId not found'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
};