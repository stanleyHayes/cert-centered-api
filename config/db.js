const mongoose = require("mongoose");

const connectDB = async function () {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    });
    console.log(`Server connected on host ${conn.connection.host}`);
};

module.exports = connectDB;
