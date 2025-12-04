const ImageModule = require("../../Model/Courses/image-module");
const path = require("path");

class Image {
  async addImageModule(req, res) {
    try {
      const { courseId, moduleId, moduleName, name, description } = req.body;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
        }
      const newImage = new ImageModule({
        courseId,
        moduleId,
        moduleName,
        name,
        image: file.filename,
        description,
        originalName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
      });
      await newImage.save();
      res.status(200).json({
        status: true,
        success: "Image Added",
        data: newImage,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllImages(req, res) {
    try {
      const image = await ImageModule.find();
      if (image.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No images found",
        });
      } else {
        return res.status(200).json({
          message: "success",
          count: image.length,
          data: image,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImageByModuleId(req, res) {
    try {
      const image = await ImageModule.find({ moduleId: req.params.id });
      if (image.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No images found for the provided module ID",
        });
      } else {
        return res
          .status(200)
          .json({ message: "Success", count: image.length, data: image });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const imageController = new Image();
module.exports = imageController;
