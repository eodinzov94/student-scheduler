const router = require("express").Router()
const Course = require("../models/Course")
const auth = require(".././middleware/authmw")
router.post("/add-course", auth, async (req, res) => {
        const {courseName} = req.body;
        const {userId} = req.user;
        if (courseName && userId) {
            try {
                const course = new Course({courseName, userId})
                await course.save()
                res.status(200).json({course, resultCode: 0})
            } catch (err) {
                res.status(500).json({error: err, resultCode: 1})
            }
        } else {
            res.status(500).json({error: "courseName and userId is required", resultCode: 1})
        }

    }
)
router.get("/", auth, async (req,res)=>{
    const {userId} = req.user;
    try {
        const courses = await Course.find({userId})
        res.status(200).json({courses, resultCode: 0})
    }catch (err) {
        res.status(500).json({error: err, resultCode: 1})
    }
})
router.get("/course/:id", auth, async (req,res)=>{
    const courseId = req.params.id;
    const {userId} = req.user;
    try {
        const course = await Course.findOne({_id: courseId, userId})
        res.status(200).json({course, resultCode: 0})
    }catch (err) {
        res.status(500).json({error: err, resultCode: 1})
    }
})
router.patch("/edit-course/:id", auth, async (req, res) => {
        const courseId = req.params.id;
        const {courseName} = req.body
        const {userId} = req.user;
        if (courseId && userId && courseName) {
            try {
                const course = await Course.findById(courseId)
                if (course && course.userId === userId) {
                    course.courseName = courseName
                    await course.save()
                    res.status(200).json({course, resultCode: 0})
                } else {
                    res.status(500).json({error: "you can edit only your course", resultCode: 1})
                }
            } catch (err) {
                res.status(500).json({error: err, resultCode: 1})
            }

        } else {
            res.status(500).json({error: "courseId and userId and courseName is required", resultCode: 1})
        }

    }
)
router.delete("/delete-course/:id", auth, async (req, res) => {
        const courseId = req.params.id;
        const {userId} = req.user;
        if (courseId && userId) {
            try {
                const course = await Course.findById(courseId)
                if (course && course.userId === userId) {
                    await Course.findByIdAndDelete(courseId);
                    res.status(200).json({resultCode: 0})
                } else {
                    res.status(500).json({error: "you can delete only your course", resultCode: 1})
                }
            } catch (err) {
                res.status(500).json({error: err, resultCode: 1})
            }

        } else {
            res.status(500).json({error: "courseId and userId is required", resultCode: 1})
        }

    }
)


router.post("/add-task/:courseId", auth, async (req, res) => {
        const {courseId} = req.params
        const {taskType} = req.body;
        if (!(taskType && courseId)) {
            return res.status(500).json({error: "task type and course id is required", resultCode: 1})
        }
        const priority = req.body.priority || "Low"
        const expectedTime = req.body.expectedTime || null
        const {userId} = req.user;
        const deadline = req.body.deadline || null
        try {
            const course = await Course.findById(courseId)
            if (userId && course && course.userId === userId) {
                const task = {taskType, expectedTime, priority, deadline}
                course.tasks.push(task)
                await course.save()
                res.status(200).json({course, resultCode: 0})
            } else {
                return res.status(500).json({error: "course does not exist", resultCode: 1})
            }
        } catch (err) {
            res.status(500).json({error: err, resultCode: 1})
        }


    }
)


router.delete("/delete-task/:courseId&:taskId", auth, async (req, res) => {
        const {courseId, taskId} = req.params
        const {userId} = req.user;
        if (!(courseId && taskId && userId)) {
            return res.status(500).json({error: "All fields are required", resultCode: 1})
        }
        try {
            const course = await Course.findById(courseId)
            if (course.userId === userId) {
                course.tasks.pull({_id: taskId})
                res.status(200).json({resultCode: 0})
            } else {
                res.status(500).json({error: "You can edit only your course", resultCode: 1})
            }
        } catch (err) {
            res.status(500).json({error: err, resultCode: 1})
        }


    }
)
router.put("/edit-task/:courseId&:taskId", auth, async (req, res) => {
    const {courseId, taskId} = req.params
    const {userId} = req.user
    if (!(courseId && taskId)) {
        return res.status(500).json({error: "Query params are required", resultCode: 1})
    }
    try {
        const course = await Course.findById(courseId);
        if (course.userId !== userId) {
            return res.status(500).json({error: "You can edit only your course", resultCode: 1})
        }

        let oldTask = course.tasks.filter(t => t._id.toString() === taskId)
        if (oldTask.length === 0) {
            return res.status(500).json({error: "Task not found", resultCode: 1})
        }
        oldTask = oldTask[0]

        const updatedCourse = await Course.findOneAndUpdate(
            {_id: courseId, tasks: {$elemMatch: {_id: taskId}}},
            {
                $set: {
                    "tasks.$.taskType": req.body.taskType ? req.body.taskType : oldTask.taskType,
                    "tasks.$.priority": req.body.priority ? req.body.priority : oldTask.priority,
                    "tasks.$.expectedTime": req.body.expectedTime ? req.body.priority : oldTask.expectedTime,
                    "tasks.$.timeTook": req.body.timeTook ? req.body.timeTook : oldTask.timeTook,
                    "tasks.$.deadline": req.body.deadline ? req.body.deadline : oldTask.deadline,
                    "tasks.$.completed": req.body.completed ? req.body.priority : oldTask.completed,
                    "tasks.$.expectedTime": req.body.expectedTime ? req.body.priority : oldTask.expectedTime,
                }
            },
            {new: true,}
        );
        updatedCourse ? res.status(200).json({updatedCourse, resultCode: 0})
            : res.status(500).json({error: "Unknown error", resultCode: 1});
    } catch (err) {
        res.status(500).json({error: err, resultCode: 1})
    }
})


module.exports = router