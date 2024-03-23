const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, } = require("firebase-admin/firestore");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYDlJozJHrHhj06EqFO4sUiWQVwfGHf4I",
  authDomain: "dns-manager-56fa0.firebaseapp.com",
  projectId: "dns-manager-56fa0",
  storageBucket: "dns-manager-56fa0.appspot.com",
  messagingSenderId: "991203306734",
  appId: "1:991203306734:web:7ecc5ec828e54fef2557ff",
};

// Initialize Firebase
const fireStore = initializeApp(firebaseConfig);
exports.db = getFirestore();
const userRouter = require("./routes/userRoutes");
const recordsRouter = require("./routes/recordsRouter");
const authRouter = require("./routes/authRoutes");

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/records", recordsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`No routes found for ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
