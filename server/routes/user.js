const router = require("express").Router()
const auth = require(".././middleware/authmw");
const userController = require("../controller/user-controller")
const {body} = require('express-validator');

router.patch("/change-email",auth,
    body('email').isEmail(),
    userController.changeEmail);
router.patch("/change-name",auth,
    body('name').isLength({min: 1}),
    userController.changeName);
router.post("/change-password",auth,
    body('newPassword').isLength({min: 5, max: 32}),
    userController.changePassword);

module.exports = router