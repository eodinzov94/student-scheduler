const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema(
    {
        taskType: {type: String, default: "Unknown type"},
        priority: {type: String, default: "Low"},
        expectedTime: {type: Number, default: null},
        timeTook: {type: Number, default: null},
        deadline: {type: Date, default: null},
        completed: {type: Boolean, default: false}
    })

const CourseSchema = new mongoose.Schema(
    {
        courseName: {type: String, required: true,},
        userId: {type: String, required: true},
        tasks: [TaskSchema]
    }, {timestamps: true}
)
module.exports = mongoose.model("Course", CourseSchema)