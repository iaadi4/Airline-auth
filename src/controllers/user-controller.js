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

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Token is valid and user is authenticated',
            err: {}
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'User not authorized',
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

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'checked wheather user is admin or not'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'No admin access',
            error: err
        });
    }
}

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
    isAdmin
}