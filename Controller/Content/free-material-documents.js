const freeMaterialDocSchema = require("../../Model/Content/free-material-documents");
const path = require("path");

class FreeMaterialDOC {
  async addDocuments(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          status: 400,
          error: "Please upload at least one file.",
        });
      }

      // Map the uploaded files to an array of objects with relevant metadata
      const files = req.files.map((file) => ({
        documentImage: file.filename,
        originalName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
      }));

      // Save all images to the database
      const images = await freeMaterialDocSchema.insertMany(files);

      res.status(200).json({
        status: true,
        success: "Images uploaded successfully",
        data: images,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllDocuments(req, res) {
    try {
      const documents = await freeMaterialDocSchema.find();
      res.status(200).json({
        status: true,
        data: documents,
        count: documents.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Server Error` });
    }
  }

  async getDocumentById(req, res) {
    try {
      const document = await freeMaterialDocSchema.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDoc(req, res) {
    try {
      const id = req.params.id;
      const doc = await freeMaterialDocSchema.findOneAndDelete({ _id: id });
      if (!doc) {
        return res
          .status(404)
          .json({ status: false, message: "Document not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // async deleteDocument(req, res) {
  //   try {
  //     const docId = req.params.id;
  //     const allDocs = await freeMaterialDocSchema.find(); // Assuming freeMaterialDocSchema is your Mongoose model
  //     // Loop through allDocs array to find the document containing the document to delete
  //     for (let doc of allDocs) {
  //       const index = doc.materialDocuments.findIndex(
  //         (doc) => doc._id.toString() === docId
  //       );
  //       if (index !== -1) {
  //         // Found the document, delete the specific document from the materialDocuments array
  //         doc.materialDocuments.splice(index, 1);
  //         await doc.save(); // Save the changes to the document
  //         return res.status(200).json({
  //           status: true,
  //           success: "Document deleted successfully",
  //         });
  //       }
  //     }
  //     // If the loop completes without finding the document
  //     return res
  //       .status(404)
  //       .json({ status: false, message: "Document not found" });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}

const freeMaterialDocController = new FreeMaterialDOC();
module.exports = freeMaterialDocController;
