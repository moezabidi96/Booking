const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
module.exports = {
  verifyAdmin: (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      if (!req.userData.isAdmin) {
        const err = new HttpError("You are not Admin ", 401);
        return next(err);
      }

      next();
    } catch (error) {
      const err = new HttpError("You are not authorized ", 401);
      return next(err);
    }
  },

  verifyAuth: (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        const err = new HttpError("You are not authorized ", 401);
        return next(err);
      }

      const decodedToken = jwt.verify(token, process.env.JWT_KEY);

      if (!decodedToken) {
        const err = new HttpError("Token is not valid ", 401);
        return next(err);
      }

      req.userData = {
        userId: decodedToken.userId,
        isAdmin: decodedToken.isAdmin,
      };
      next();
    } catch (error) {
      const err = new HttpError("You are not authorized ", 401);
      return next(err);
    }
  },
};
