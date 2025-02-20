const { User, Role } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log(error);
            console.log('Something went wrong in the repository.');
            throw {error};
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository.');
            throw {error};
        }
    }

    async getById(userId) {
        try {
            const user = User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository.');
            throw {error};
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository.');
            throw {error};
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'admin'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong in the repository.');
            throw {error};
        }
    }
}

module.exports = UserRepository;