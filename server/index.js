const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000
const authRoute = require("./routes/auth")
const coursesRoute = require("./routes/courses")
const auth = require("./middleware/authmw");
const errorMiddleware = require('./middleware/errormw');
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/courses", coursesRoute)
app.use(errorMiddleware);

app.post("/", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
app.post("/admin", auth, (req, res) => {
    if (!req.user.isAdmin){
        return res.status(500).send("You are not admin");
    }
    res.status(200).send("Welcome 🙌 Admin ");
});

async function runServer(){
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log("Connected to MongoDB"))
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

runServer();