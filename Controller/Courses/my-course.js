const myCourseSchema = require("../../Model/Courses/my-course");
const path = require("path");
class Course {
  async addCourse(req, res) {
    try {
      const {
        courseName,
        courseDescription,
        freeMaterialVideo,
        freeMaterialDocs,
        materialDocsId,
        materialVideoId,
        durationType,
        validity,
        validityPeriod,
        price,
        discount,
        effectivePrice,
        courseFeature,
      } = req.body;
      let file = req.file?.filename;
      const newCourse = new myCourseSchema({
        courseName,
        courseDescription,
        freeMaterialVideo,
        freeMaterialDocs,
        materialDocsId,
        materialVideoId,
        durationType,
        validity,
        validityPeriod,
        price,
        discount,
        effectivePrice,
        courseFeature,
        thumbnailImage: file,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select thumbnail image",
        });
      }
      await newCourse.save();
      res.status(200).json({
        status: true,
        success: "Course Added",
        data: newCourse,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAllCourse(req, res) {
    try {
      const course = await myCourseSchema.find();
      res.status(200).json({
        status: true,
        data: course,
        count: course.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Server Error` });
    }
  }
  async getCourseById(req, res) {
    try {
      const course = await myCourseSchema.findOne({ _id: req.params.id });
      if (!course) {
        return res.status(404).json({ message: "course not found" });
      }
      res.status(200).json({ data: course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // async addResource(req, res) {
  //   try {
  //     const course = await myCourseSchema.findById(req.params.id);
  //     if(!course){
  //       return res.status(404).json("No Course Found")
  //     }
  //     const { externalContent } = req.body;
  //     let file = req.files.map((file) => ({
  //       documentOrImage: file.filename,
  //       originalName: file.originalname,
  //     }));
  //     const freeMaterial = new myCourseSchema({
  //       contentType,
  //       resources: file,
  //       originalName: file.originalName,
  //     });
  //     if (!file) {
  //       return res.status(500).json({
  //         status: 500,
  //         error: "Please select documents",
  //       });
  //     }
  //     await freeMaterial.save();
  //     res.status(200).json({
  //       status: true,
  //       success: "Material Added",
  //       data: freeMaterial,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  async uploadResourceToCourse(req, res) {
    try {
      const findModule = await myCourseSchema.findOne({ _id: req.params.id });

      if (!findModule) {
        return res.status(401).json({ error: "Course not found" });
      }
      let file = req.files.map((file) => ({
        documentOrImage: file.filename,
        originalName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
        contentType: "Resource",
      }));
      if (!file || file.length === 0) {
        return res.status(400).json({
          error: "Please select at least one document or image",
        });
      }
      findModule.externalContent.push(...file);
      await findModule.save();

      res.status(200).json({
        status: true,
        success: "Added",
        data: file,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async uploadRequirementsToCourse(req, res) {
    try {
      const findModule = await myCourseSchema.findOne({ _id: req.params.id });

      if (!findModule) {
        return res.status(401).json({ error: "Course not found" });
      }
      let file = req.files.map((file) => ({
        documentOrImage: file.filename,
        originalName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
        contentType: "Important Requirement",
      }));
      if (!file || file.length === 0) {
        return res.status(400).json({
          error: "Please select at least one document or image",
        });
      }
      findModule.externalContent.push(...file);
      await findModule.save();

      res.status(200).json({
        status: true,
        success: "Added",
        data: file,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteResourcesOrimportantReq(req, res) {
    try {
      const docId = req.params.id;
      const allDocs = await myCourseSchema.find();
      for (let doc of allDocs) {
        const index = doc.externalContent.findIndex(
          (doc) => doc._id.toString() === docId
        );
        if (index !== -1) {
          doc.externalContent.splice(index, 1);
          await doc.save();
          return res.status(200).json({
            status: true,
            success: "Document deleted successfully",
          });
        }
      }
      return res
        .status(404)
        .json({ status: false, message: "Document not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCourse(req, res) {
    try {
      const courseId = req.params.id;
      const {
        courseName,
        courseDescription,
        freeMaterialVideo,
        freeMaterialDocs,
        materialDocsId,
        materialVideoId,
        durationType,
        validity,
        validityPeriod,
        price,
        discount,
        effectivePrice,
      } = req.body;
      let file = req.file ? req.file.filename : null;

      let course = await myCourseSchema.findOne({ _id: courseId });
      if (!course) {
        return res.status(404).json({
          status: 404,
          error: "Course not found",
        });
      }
      course.courseName = courseName || course.courseName;
      course.courseDescription = courseDescription || course.courseDescription;
      course.freeMaterialVideo = freeMaterialVideo || course.freeMaterialVideo;
      course.freeMaterialDocs = freeMaterialDocs || course.freeMaterialDocs;
      course.materialDocsId = materialDocsId || course.materialDocsId;
      course.materialVideoId = materialVideoId || course.materialVideoId;
      course.durationType = durationType || course.durationType;
      course.validity = validity || course.validity;
      course.validityPeriod = validityPeriod || course.validityPeriod;
      course.price = price || course.price;
      course.discount = discount || course.discount;
      course.effectivePrice = effectivePrice || course.effectivePrice;

      if (file) course.thumbnailImage = file;

      let updatedCourse = await myCourseSchema.findOneAndUpdate(
        { _id: courseId },
        course,
        { new: true }
      );
      res.status(200).json({
        status: true,
        success: "Course updated",
        data: updatedCourse,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markFeatured(req, res) {
    try {
      const _id = req.params.id;
      const course = await myCourseSchema.findByIdAndUpdate(
        _id,
        { $set: { courseFeature: true } },
        { new: true }
      );

      if (!course) {
        res.status(404).json({ error: "course not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: course,
          message: "Status changed",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }
  async removeFeatured(req, res) {
    try {
      const _id = req.params.id;
      const course = await myCourseSchema.findByIdAndUpdate(
        _id,
        { $set: { courseFeature: false } },
        { new: true }
      );

      if (!course) {
        res.status(404).json({ error: "course not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: course,
          message: "Status changed",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async publishCourse(req, res) {
    try {
      const _id = req.params.id;
      const course = await myCourseSchema.findByIdAndUpdate(
        _id,
        { $set: { coursePublish: true } },
        { new: true }
      );

      if (!course) {
        res.status(404).json({ error: "course not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: course,
          message: "Course Published",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }
  async unPublishCourse(req, res) {
    try {
      const _id = req.params.id;
      const course = await myCourseSchema.findByIdAndUpdate(
        _id,
        { $set: { coursePublish: false } },
        { new: true }
      );

      if (!course) {
        res.status(404).json({ error: "course not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: course,
          message: "Course Un Published",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }
  async deleteCourseById(req, res) {
    try {
      const _id = req.params.id;
      const course = await myCourseSchema.findByIdAndDelete(_id);
      if (!course) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const courseController = new Course();
module.exports = courseController;
