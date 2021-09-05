const router = require("express").Router()
const Course = require("../models/Course")
const auth = require(".././middleware/authmw")
const coursesController = require('../controller/courses-controller')
const {body} = require('express-validator');
router.post("/add-course", auth,
    body('courseName').isLength({min: 2, max: 120}),
    coursesController.addCourse)
router.get("/", auth, coursesController.getAllCourses)
router.get("/course/:id", auth, coursesController.getOneCourse)
router.patch("/edit-course/:id", auth,
    body('courseName').isLength({min: 2, max: 120}),
    coursesController.editCourse)
router.delete("/delete-course/:id", auth, coursesController.deleteCourse)
router.post("/add-task/:courseId", auth,
    body('taskType').isLength({min: 2, max: 100}),
    body('priority').isLength({ max: 30}),
    coursesController.addTask)
router.delete("/delete-task/:courseId&:taskId", auth, coursesController.deleteTask)
router.put("/edit-task/:courseId&:taskId", auth, coursesController.editTask)

module.exports = router