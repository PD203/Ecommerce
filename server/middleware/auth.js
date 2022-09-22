const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  
  next();
});

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const { token } = req.cookies;
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    // console.log(user.role)
    if (!roles.includes(user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
