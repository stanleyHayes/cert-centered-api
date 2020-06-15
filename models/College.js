const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Department name requried'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Department image required']
    },
    provost: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Provost required']
    },
});

const College = mongoose.model('college', CollegeSchema);

module.exports = College;