const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully create the user'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to create the user',
            error: err
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Signed in successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to authenticate.',
            error: err
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully deleted the user'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to delete the user',
            error: err
        });
    }
}

module.exports = {
    create,
    destroy,
    signIn
}