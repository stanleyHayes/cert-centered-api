const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Department name requried'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Faculty image required']
    },
    college: {
        type: Schema.Types.ObjectId,
        ref: "College",
        required: [true, 'College required']
    }
});

const Faculty = mongoose.model('faculty', FacultySchema);

module.exports = Faculty;