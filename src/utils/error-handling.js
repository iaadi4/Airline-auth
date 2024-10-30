const { StatusCodes } = require('http-error-codes');

class AppErrors extends Error {
    constructor(name, message, explanation, statusCode) {
        this.message = 'Something went wrong',
        this.explanation = 'Something went wrong',
        this.name = 'AppError',
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

module.exports = AppErrors;