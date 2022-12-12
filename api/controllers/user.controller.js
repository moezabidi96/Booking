const UserModel = require("../models/User.model");
const HttpError = require("../models/http-error");

const updateUser = async (req, res, next) => {
  if (!req.userData.isAdmin || req.params.id !== req.userData.id) {
    const err = new HttpError("You are not Authorized to update user ", 401);
    return next(err);
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      const error = new HttpError("User not found for update", 404);
      return next(error);
    }
    res.status(200).json({ seccuss: true, updatedUser });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (!req.userData.isAdmin || req.params.id !== req.userData.id) {
    const err = new HttpError("You are not Authorized to delete user ", 401);
    return next(err);
  }
  try {
    await UserModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ seccuss: true, message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      const error = new HttpError("User not found", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, user });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      const error = new HttpError("Sorry not found Users", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, users });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
