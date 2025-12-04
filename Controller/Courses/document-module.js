const DocumentSchema = require("../../Model/Courses/document-module");
const path = require("path");

class Document {
  async addDocument(req, res) {
    try {
      const { courseId, moduleId, name, moduleName, description } = req.body;
      const file = req.file;
       if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const newDocument = new DocumentSchema({
        courseId,
        moduleId,
        moduleName,
        name,
        document: file.filename,
        description,
        originalName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
      });
      await newDocument.save();
      res.status(200).json({
        status: true,
        success: "Document Added",
        data: newDocument,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllDocuments(req, res) {
    try {
      const document = await DocumentSchema.find();
      if (document.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No documents found",
        });
      } else {
        return res.status(200).json({
          message: "success",
          count: document.length,
          data: document,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentByModuleId(req, res) {
    try {
      const document = await DocumentSchema.find({ moduleId: req.params.id });
      if (document.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No documents found for the provided module ID",
        });
      } else {
        return res
          .status(200)
          .json({ message: "Success", count: document.length, data: document });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const documentController = new Document();
module.exports = documentController;
