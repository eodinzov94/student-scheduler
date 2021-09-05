const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dto/user-dto')
class AuthService {
    signToken(user){
        const payload = {user: {userId: user._id, isAdmin: user.isAdmin}}
        return jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: "24h",});
    }
    async login(email, password) {
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw ApiError.BadRequest("Invalid email or password")
        }
        return this.signToken(user);
    }
    async register( email, password){
            const oldUser = await User.findOne({email});
            if (oldUser) {
                throw ApiError.BadRequest("User Already Exist. Please Login")
            }
            const encryptedPassword = await bcrypt.hash(password, 7);
            const newUser = new User(
                {
                    email:email.toLowerCase(),
                    password: encryptedPassword,
                    isAdmin:false
                })
            await newUser.save()
            return this.signToken(newUser)
    }
    async me(userId){
            const user = await User.findOne({userId});
            if(!user){
                throw ApiError.BadRequest("User does not exist")
            }
            const userDto = new UserDto(user._id,user.email,user.createdAt)
            return userDto;
    }

}
module.exports = new AuthService();