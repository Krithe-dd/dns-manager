const asyncHandler = require("express-async-handler");
const { db } = require("../app");
const { v4: uuid } = require("uuid");
const { createToken } = require("./authController");

exports.login = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const usersRef = db.collection("users");
  const queryRef = usersRef.where("email", "==", req.body.email);
  const snapshot = await queryRef.get();

  snapshot.forEach((doc) => {
    if (body.password === doc.data().password) {
      const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      let token = createToken({ id: doc.data().id });

      res.cookie("jwt", token, cookieOptions);
      res.status(200).json({
        message: "Success",
        user: doc.data(),
        token,
      });
    } else {
      res.status(200).json({
        message: "Error",
      });
    }
  });
});
exports.register = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();
  let emailExists;
  snapshot.forEach((doc) => {
    if (body.email === doc.data().email) {
      emailExists = true;
      res.status(200).json({
        message: "Duplicate",
      });
      return;
    }
  });
  if (!emailExists) {
    const newUser = db.collection("users").doc(body.name);
    newUser.set({
      id: uuid(),
      name: body.name,
      password: body.password,
      email: body.email,
    });

    res.status(201).json({
      message: "Success",
    });
  }
});
