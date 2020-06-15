const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: [true, 'Name field required']
    },
    email: {
        type: String,
        required: [true, 'Email field required'],
        unique: true,
        match: '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password field required']
    },
    level: {
        type: String,
        enum: ['100', '200', '300', '400'],
        default: '100'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['USER', 'INSTRUCTOR', 'ADMIN'],
        default: 'USER'
    },
    image: {
        type: String
    },
    indexNumber: {
        type: String,
        required: [true, 'Index Number field required']
    },
    referenceNumber: {
        type: String,
        required: [true, 'Reference Number field required']
    },
    currentCourses: {

    },
    pastCourses: {

    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;