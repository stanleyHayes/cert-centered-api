const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resource: {
        type: String
    },
    status: {

    },
    classCourse: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    }
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;