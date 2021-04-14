const { exchangeCodeForToken, getUserProfile} = require('../utils/github');

module.exports = class UserService {
    static async create(code) {

    const token = await exchangeCodeForToken(code);

    const profile = await getUserProfile(token);
    }
}