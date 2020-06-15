const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Department name requried'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Department image required']
    },
    hod: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Head of Department required']
    },
    phone: {
        type: String,
        required: [true, 'Department phone required']
    },
    email: {
        type: String,
        required: [true, 'Department email required']
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: [true, 'Faculty required']
    }
});

const Department = mongoose.model('department', DepartmentSchema);

module.exports = Department;