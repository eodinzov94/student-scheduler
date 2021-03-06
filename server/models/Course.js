const mongoose = require("mongoose")
const TaskObj = {
        taskType: {type: String, default:''},
        priority: {type: String, default: "Low"},
        expectedTime: {type: Number, default: null},
        timeTook: {type: Number, default: null},
        deadline: {type: Date, default: null},
        completed: {type: Boolean, default: false},
        createdAt:{type: Date, default: Date.now()}
    }
const CourseSchema = new mongoose.Schema(
    {
        courseName: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        tasks: [TaskObj]
    }, {timestamps: true}
)
module.exports = mongoose.model("Course", CourseSchema)