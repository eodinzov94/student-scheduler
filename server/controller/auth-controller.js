const authService = require('../service/auth-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class AuthController{
    async register(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {email, password} = req.body;
            const token = await authService.register(email, password)
            res.json({accessToken:token,resultCode:0});
        } catch (err) {
            next(err)
        }
    }
    async login(req,res,next){
        try {
            const {email, password} = req.body;
            const token = await authService.login(email,password)
            res.json({accessToken:token,resultCode:0});
        } catch (err) {
            next(err)
        }
    }
    async me(req,res,next){
        try{
            const {userId} = req.user
            const user = await authService.me(userId)
            res.json({user,resultCode:0})
        }catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController()