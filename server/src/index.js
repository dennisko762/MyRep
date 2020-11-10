//-------simple express server setup-----------//
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const logs = require("./api/logs");

const app = express();
const port = process.env.PORT || 1337;
//------further imports--------------//

//------middlewares------------------//

mongoose.connect("mongodb://localhost/travel-log", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common")); //format: [Date] "Request / Protocol/Version" Status Code Response time in ms
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //only requests from this origin can reach the backend
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world im a json response",
  });
});

app.use("/api/logs", logs);

//not Found error-mw
//we will pass the error on to the next mw and set the status to 404
app.use((req, res, next) => {
  const error = new Error(`Not Found +${req.originalUrl}`);
  res.status(404);
  next(error);
});

//----general error handling middleware--------//
//stack provides information about the line where the error happened etc...
//stack is similar to print(strackTrace) in java
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Nothing to see, move along!"
        : error.stack,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
