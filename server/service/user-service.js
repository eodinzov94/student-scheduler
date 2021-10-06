const User = require('../models/User')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dto/user-dto')
const bcrypt = require('bcryptjs')

class UserService {

    async changePassword(oldPassword,newPassword,userId) {
        const user = await User.findOne({_id: userId})
        if(!user){
            throw ApiError.BadRequest('User not found')
        }
        if(!(await bcrypt.compare(oldPassword, user.password))){
            throw ApiError.BadRequest('Previous password is wrong')
        }
        const newEncryptedPassword = await bcrypt.hash(newPassword, 7);
        user.password = newEncryptedPassword
        await user.save()
        return new UserDto(user._id, user.email, user.createdAt, user.name)
    }
    async changeName(name,userId) {
        const user = await User.findOne({_id: userId})
        if(!user){
            throw ApiError.BadRequest('User not found')
        }
        user.name = name
        await user.save()
        return new UserDto(user._id, user.email, user.createdAt, user.name)

    }
    async changeEmail(email,userId) {
        const user = await User.findOne({_id: userId})
        if(!user){
            throw ApiError.BadRequest('User not found')
        }
        const potentialUser = await User.findOne({email: email.toLowerCase()})
        if(potentialUser){
            throw ApiError.BadRequest('Email already used in other account')
        }
        user.email = email.toLowerCase()
        await user.save()
        return new UserDto(user._id, user.email, user.createdAt, user.name)
        return UserDto();
    }
}

module.exports = new UserService();