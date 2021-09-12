const coursesService = require('../service/courses-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const Course = require("../models/Course")


class CoursesController {
    static checkForValidationErrors(req){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw (ApiError.BadRequest('Validation Error', errors.array()))
        }
    }
    async addCourse(req, res, next) {
        try {
            CoursesController.checkForValidationErrors(req)
            const {courseName} = req.body;
            const {userId} = req.user;
            const course = await coursesService.addCourse(courseName,userId)
            res.json({course, resultCode: 0})
        } catch (err) {
            next(err)
        }
    }

    async editCourse(req, res, next) {
        try {
            CoursesController.checkForValidationErrors(req)
            const courseId = req.params.id;
            const {courseName} = req.body
            const {userId} = req.user;
            const course = await coursesService.editCourse(courseId,courseName,userId)
            res.status(200).json({course, resultCode: 0})
        } catch (err) {
            next(err)
        }
    }

    async getAllCourses(req, res, next) {
        try {
            const {userId} = req.user;
            const courses = await coursesService.getAllCourses(userId)
            res.json({courses, resultCode: 0})
        } catch (err) {
            next(err)
        }
    }

    async getOneCourse(req, res, next) {
        try {
            const courseId = req.params.id;
            const {userId} = req.user;
            const course = await coursesService.getOneCourse(courseId,userId)
            res.json({course, resultCode: 0})
        } catch (err) {
            next(err);
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const courseId = req.params.id;
            const {userId} = req.user;
            await coursesService.deleteCourse(courseId,userId)
            res.json({resultCode: 0})
        } catch (err) {
            next(err);
        }
    }

    async addTask(req, res, next) {
        try {
            CoursesController.checkForValidationErrors(req)
            const {courseId} = req.params
            const {userId} = req.user;
            const task = coursesService.generateNewTaskFromBody(req.body,userId)
            const course = await coursesService.addTask(task,courseId,userId)
            res.json({course, resultCode: 0})
        } catch (err) {
            next(err)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {courseId, taskId} = req.params
            const {userId} = req.user;
            const course = await coursesService.deleteTask(courseId,userId,taskId)
            res.json({resultCode: 0,course})
        } catch (err) {
            next(err);
        }
    }

    async editTask(req, res, next) {
        try {
            const {courseId, taskId} = req.params
            const {userId} = req.user
            const course = await Course.findOne({_id: courseId,userId, tasks: {$elemMatch: {_id: taskId}}})
            if (!course) {
                throw ApiError.BadRequest("You can edit only your task")
            }
            const fieldsToUpdate = coursesService.generateTaskFieldsToUpdateFromBody(req.body)
            const updatedCourse = await coursesService.editTask(courseId,userId,taskId,fieldsToUpdate)
             res.json({updatedCourse, resultCode: 0})
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new CoursesController()