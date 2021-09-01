const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000
const authRoute = require("./routes/auth")
const coursesRoute = require("./routes/courses")
const auth = require("./middleware/authmw");
app.use(express.json())



app.post("/", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
app.post("/admin", auth, (req, res) => {
    if (!req.user.isAdmin){
        return res.status(500).send("You are not admin");
    }
    res.status(200).send("Welcome 🙌 Admin ");
});
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute)
app.use("/api/courses", coursesRoute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})