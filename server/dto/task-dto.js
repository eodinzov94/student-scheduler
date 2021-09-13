module.exports = class TaskDto {
    taskId;
    taskType;
    priority;
    expectedTime;
    timeTook;
    deadline;
    completed;
    key;
    createdAt;

    constructor(
        taskId, taskType, priority, expectedTime,
        timeTook, deadline, completed, createdAt) {
        this.taskId = taskId
        this.taskType = taskType
        this.priority = priority
        this.expectedTime = expectedTime
        this.timeTook = timeTook
        this.deadline = deadline
        this.completed = completed
        this.key = taskId
        this.createdAt = createdAt
    }

    static tasksToDtoArray(tasks) {
        return tasks.map(task => new TaskDto(
            task._id, task.taskType, task.priority, task.expectedTime,
            task.timeTook, task.deadline, task.completed, task.createdAt))
    }
}