const express = require("express");

const router = express.Router();
var multer = require("../../utilities/multer");
var cpUpload = multer.array("file", 1);
const {
  addStatutes,
  searchStatutes,
  getAllStatutes,
  getStatutesOnly,
  getStatuteById,
} = require("./statutesService");

router.post("/addStatutes", addStatutes);

router.post("/searchStatutes", searchStatutes);
router.get("/getAllStatutes", getAllStatutes);
router.get("/getStatutesOnly", getStatutesOnly);
router.get("/getStatuteById/:id", getStatuteById);

module.exports = router;
