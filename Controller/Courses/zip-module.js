const ZipSchema = require("../../Model/Courses/zip-module");

class Zip {
  async addZip(req, res) {
    try {
      const { courseId, moduleId, moduleName, name, description } = req.body;
      const file = req.file.filename;
      const newZip = new ZipSchema({
        courseId,
        moduleId,
        name,
        moduleName,
        zip: file,
        description,
      });
      await newZip.save();
      res.status(200).json({
        status: true,
        success: "Zip Added",
        data: newZip,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllZip(req, res) {
    try {
      const zip = await ZipSchema.find();
      if (zip.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No zips found",
        });
      } else {
        return res.status(200).json({
          message: "success",
          count: zip.length,
          data: zip,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getZipFileByModuleId(req, res) {
    try {
      const zip = await ZipSchema.find({ moduleId: req.params.id });
      if (zip.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No zip. found for the provided module ID",
        });
      } else {
        return res
          .status(200)
          .json({ message: "Success", count: zip.length, data: zip });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const ZipController = new Zip();
module.exports = ZipController;
