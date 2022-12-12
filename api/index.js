const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const HttpError = require("./models/http-error");
var cors = require("cors");
const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zmzh9gd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.log("connected to mongoDb");
  } catch (error) {
    console.log(error);
  }
};

//middlewares
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);

  throw error;
});

app.use((err, req, res, next) => {
  return res.status(err.code || 500).json({
    success: false,
    message: err.message || "An unknown occurred",
    status: err.code || 500,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Connected to backEnd !");
});
