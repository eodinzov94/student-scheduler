const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController{
    async changeEmail(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {email} = req.body;
            const user = await userService.changeEmail(email,req.user.userId)
            res.json({user,resultCode:0});
        } catch (err) {
            next(err)
        }
    }
    async changeName(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {name} = req.body;
            const user = await userService.changeName(name,req.user.userId)
            res.json({user,resultCode:0});
        } catch (err) {
            next(err)
        }
    }
    async changePassword(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {oldPassword,newPassword} = req.body;
            const user = await userService.changePassword(oldPassword,newPassword,req.user.userId)
            res.json({user,resultCode:0});
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController()