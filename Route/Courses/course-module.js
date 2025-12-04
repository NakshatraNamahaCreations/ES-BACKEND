const express = require("express");
const router = express.Router();
const courseModulesController = require("../../Controller/Courses/course-module");

router.post("/addmodules", courseModulesController.addModules);
router.get("/getallmodules", courseModulesController.getAllModules);
router.get(
  "/getmodulesbycourseid/:id",
  courseModulesController.getModuleByCourseId
);

module.exports = router;
