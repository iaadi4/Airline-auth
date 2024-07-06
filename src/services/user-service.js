const UserRepository  = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {  
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in the service layer.');
            throw {error};
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: "Password doesn't match"};
            }
            const newJwt = this.createToken({email: user.email, id: user.id});
            return newJwt;
        } catch (error) {
            console.log('Something went wrong in the sign in process');
            throw {error};
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with corresponding token found'};
            }
            return user.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async destroy(userId) {
        try {  
            await this.userRepository.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the service layer.');
            throw {error};
        }
    }

    createToken(user) {
        try {
            const response = jwt.sign(user, JWT_KEY, {expiresIn: '24hr'});
            return response;
        } catch (error) {
            console.log('Something went wrong in the token creation');
            throw {error};
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in the token verification');
            throw {error};
        }
    }

    checkPassword(userPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in the token verification');
            throw {error};
        }
    }

    isAdmin(userId) {
        try {
            const response =  this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log('Something went wrong in the token verification');
            throw {error};
        }
    }
}

module.exports = UserService;