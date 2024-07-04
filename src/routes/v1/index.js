const express = require('express');

const UserController = require('../../controllers/user-controller');
const { authRequestValidator } = require('../../middlewares/index');

const router = express.Router();


router.post(
    '/signup',
    authRequestValidator.validateUserAuth,
    UserController.create
);

router.post(
    '/signin',
    authRequestValidator.validateUserAuth,
    UserController.signIn
);

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

module.exports = router;