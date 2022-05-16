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
  deleteStatute,
} = require("./statutesService");

router.post("/addStatutes", addStatutes);

router.post("/searchStatutes", searchStatutes);
router.get("/getAllStatutes", getAllStatutes);
router.get("/getStatutesOnly", getStatutesOnly);
router.get("/getStatuteById/:id", getStatuteById);
router.delete("/deleteStatute/:id", deleteStatute);

module.exports = router;
