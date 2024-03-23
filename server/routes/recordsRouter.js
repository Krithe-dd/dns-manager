const express = require("express");
const router = express.Router();
const {
  getAllRecords,
  createRecord,
  updateRecord,
  uploadFile,
  extractFile,
  deleteRecord,
} = require("../controllers/recordsController");
const { protectedRoute } = require("../controllers/authController");

router.use(protectedRoute);
router.route("/").get(getAllRecords).post(createRecord).patch(updateRecord);
router.delete("/:id", deleteRecord);
router.post("/upload", extractFile, uploadFile);

module.exports = router;
