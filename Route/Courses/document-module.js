const express = require("express");
const router = express.Router();
const documentController = require("../../Controller/Courses/document-module");
const multer = require("multer");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/document-module"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post(
  "/adddocumentformodule",
  upload.single("document"),
  documentController.addDocument
);
// router.put(
//   "/addvideobymoduleid/:id",
//   courseModulesController.addVideoByModuleId
// );
router.get("/getalldocuments", documentController.getAllDocuments);
router.get(
  "/getdocumentbymoduleid/:id",
  documentController.getDocumentByModuleId
);

module.exports = router;
