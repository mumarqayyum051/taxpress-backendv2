const express = require("express");

const router = express.Router();

const {
  addCase,
  updateCase,
  searchCase,
  deleteCase,
  getAllCases,
  getCaseById,
} = require("./casesService");
var multer = require("../../utilities/multer");

var cpUpload = multer.array("file", 1);

router.post("/addCase", addCase);
router.put("/updateCase/:id", updateCase);
router.post("/searchCase", searchCase);
router.delete("/deleteCase/:id", deleteCase);
router.get("/getAllCases", getAllCases);
router.get("/getCaseById/:id", getCaseById);

module.exports = router;
