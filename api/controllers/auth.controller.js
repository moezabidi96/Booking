const UserModel = require("../models/User.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Could not create user, please try again ", 500);
    return next(err);
  }
  try {
    const newUser = new UserModel({ username, email, password: hashPassword });
    await newUser.save();

    res.status(200).send({
      seccuss: true,
      message: "User has been created",
    });
  } catch (error) {
    next(error);
  }
};

const logInUser = async (req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   const error = new HttpError(
  //     "Invalid inputs passed , please check your data ",
  //     422
  //   );
  //   return next(error);
  // }
  // console.log(req.body);

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: req.body.email });
  } catch (error) {
    const err = new HttpError("login failed,please try again.", 500);
    return next(err);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentiels, could not log you in.",
      401
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
  } catch (err) {
    const error = new HttpError(
      "could not log you in , please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentiels, could not log you in.",
      401
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, isAdmin: existingUser.isAdmin },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    const err = new HttpError("login failed,please try again token.", 500);
    return next(err);
  }

  const { password, isAdmin, ...otherDetails } = existingUser._doc;

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .send({
      seccuss: true,
      user: { ...otherDetails, token },
      message: "Logged in",
    });
};

exports.register = register;
exports.logInUser = logInUser;
