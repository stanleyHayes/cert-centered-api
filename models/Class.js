const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: [true, 'Course required'],
        ref: "Course"
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    assistant: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lessons: {
        type: [Schema.Types.ObjectId],
        ref: "Lesson"
    },
    assignments: {
        type: Schema.Types.ObjectId,
        ref: "Assignment"
    },
    quizzes: {
        type: Schema.Types.ObjectId,
        ref: "Quiz"
    }
});

const Class = mongoose.model('class', ClassSchema);

module.exports = Class;