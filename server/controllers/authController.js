const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { promisify } = require("util");
const { db } = require("../app");
const AppError = require("../utils/appError");

exports.createToken = (id) => {
  return jwt.sign(id, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.protectedRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("Login to continue", 401));
  }

  const decoded = await promisify(jwt.verify)(token, "SUPER_SECRET");
  const usersRef = db.collection("users");
  const queryRef = usersRef.where("id", "==", decoded.id);
  const snapshot = await queryRef.get();
  let freshUser;
  snapshot.forEach((doc) => {
    if (!doc.data()) return;
    freshUser = doc.data();
  });

  req.user = freshUser;
  next();
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "Success" });
});
