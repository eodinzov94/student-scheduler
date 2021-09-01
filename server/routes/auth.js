const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const auth = require(".././middleware/authmw");

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                username,
                email:email.toLowerCase(),
                password: encryptedPassword,
                isAdmin:false
            })
        const payload = {user:{userId:newUser._id, isAdmin:newUser.isAdmin} }
        const token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );
        await newUser.save()
        console.log("New user registered " + req.body.username)
        res.status(201).json({AccessToken:token});
    } catch (err) {
        console.log(err);
    }
})

router.post("/login", async (req, res) => {

    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = {user:{userId:user._id, isAdmin:user.isAdmin} }
            const token = jwt.sign(
                payload,
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h",
                }
            );
            res.status(200).json({AccessToken:token});
        }
        else{
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }

});
router.get("/me",auth,async (req,res)=>{
    try{
        const {userId} = req.user
        const user = await User.findOne({userId});
        if(!user){
            return res.status(500).json("User not found")
        }
        const {password,...userRes} = user._doc;
        res.status(200).json(userRes)
    }catch (e) {
        res.status(500).json(e)
    }
})
module.exports = router