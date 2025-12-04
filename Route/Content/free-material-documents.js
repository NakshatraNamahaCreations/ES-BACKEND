const express = require("express");
const router = express.Router();
const multer = require("multer");
const freeMaterialDocController = require("../../Controller/Content/free-material-documents");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.post(
//   "/adddocuments",
//   upload.array("materialDocuments"),
//   freeMaterialController.addDocuments
// );

router.post(
  "/adddocuments",
  upload.array("documentImage"),
  freeMaterialDocController.addDocuments
);

router.get("/getalldocument", freeMaterialDocController.getAllDocuments);
// router.put(
//   "/updatebanner/:id",
//   upload.single("bannerImage"),
//   bannerController.updateBannerById
// );
router.get("/getdocumentbyid/:id", freeMaterialDocController.getDocumentById);
router.delete("/deletedocuments/:id", freeMaterialDocController.deleteDoc);

module.exports = router;
