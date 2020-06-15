const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const errorHandler = require("./middlewares/error");

const server = express();
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");

//connect to mongo database
connectDB();

// const limiter = rateLimit({
//     windowMs: 1000 * 60 * 60,
//     max: 100
// });
//import route middleware
const authentication = require("./routes/authentication");
const users = require("./routes/users");
const classes = require("./routes/classes");
const colleges = require("./routes/colleges");
const courses = require("./routes/courses");
const departments = require("./routes/departments");
const faculties = require("./routes/faculties");


//mount middleware
server.use(cors());
server.use(helmet());
// server.use(limiter);
server.use(express.json());
server.use(hpp({ checkBody: true, checkQuery: true }));
server.use(xss());
server.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
    server.use(morgan("dev"));
}

//mount routes
server.use("/api/v1/auth", authentication);
server.use("/api/v1/classes", classes);
server.use("/api/v1/users", users);
server.use("/api/v1/colleges", colleges);
server.use("/api/v1/courses", courses);
server.use("/api/v1/departments", departments);
server.use("/api/v1/faculties", faculties);


server.use(errorHandler);

const PORT = process.env.PORT || 8000;

const listeningServer = server.listen(PORT, function() {
    console.log(`Server connected in ${process.env.NODE_ENV} on port ${PORT}`);
});

listeningServer.on('unhandledRejection', function(error, promise) {
    if (error) {
        listeningServer.close(function() {
            process.exit(1);
        })
    }
});