const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Course name required'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Course code required']
    },
    description: {
        type: String,
        required: [true, 'Course Description required']
    },
    prerequisites: {
        type: [String],
        required: ['Course prerequisites required']
    },
    image: {
        type: String,
        required: [true, 'Course image required']
    },
    departments: {
        type: [Schema.Types.ObjectId],
        ref: "Department"
    },
    skillLevel: {
        type: String,
        enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
        default: 'BEGINNER'
    },
    objectives: {
        type: [String]
    }
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;