const asyncHandler = require("express-async-handler");
const { db } = require("../app");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/appError");
const multer = require("multer");
const csv = require("csv-parser");

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

exports.getAllRecords = asyncHandler(async (req, res, next) => {
  const recordsRef = db.collection("records");
  const snapshot = await recordsRef.get();
  let recordsArray = [];
  snapshot.forEach((doc) => {
    recordsArray.push({ ...doc.data(), docId: doc.id });
  });
  res.status(200).json({
    message: "Success",
    records: recordsArray,
  });
});

exports.createRecord = asyncHandler(async (req, res, next) => {
  const { body } = req;
  let response;
  const newRecord = {
    ...body,
    id: uuid(),
  };
  try {
    response = await db.collection("records").add(newRecord);
  } catch (error) {
    return next(new AppError("Unable create record, try again later", 400));
  }
  res.status(201).json({
    message: "Success",
    data: newRecord,
  });
});

exports.updateRecord = asyncHandler(async (req, res, next) => {
  const { body } = req;
  let response;
  try {
    const recordsRef = db.collection("records").doc(body.docId);
    response = await recordsRef.update(body);
  } catch (error) {
    return next(new AppError("Unable to update, try later", 400));
  }

  res.status(201).json({
    message: "Success",
    response,
  });
});

exports.extractFile = upload.single("file");

exports.uploadFile = asyncHandler(async (req, res, next) => {
  const { body, file } = req;
  let csvData = file.buffer.toString();

  const results = [];
  csv({ headers: true })
    .on("data", (data) => results.push(data))
    .on("end", () => {})
    .write(csvData);

  const formattedData = results
    .map((row, index) => {
      if (index === 0) return;
      return {
        domain: row._0,
        recordType: row._1,
        ip: row._2,
      };
    })
    .filter(Boolean);

  formattedData.forEach((data) => {
    let response = db.collection("records").add({ ...data, id: uuid() });
  });
  res.status(201).json({
    message: "Success",
    formattedData,
  });
});

exports.deleteRecord = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  try {
    let res = await db.collection("records").doc(id).delete();
  } catch (error) {
    return next(new AppError("Unable to delete, try later", 400));
  }
  res.status(200).json({
    message: "Success",
  });
});
