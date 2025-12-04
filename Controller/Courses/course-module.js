const courseModuleSchema = require("../../Model/Courses/course-module");

class CourseModule {
  async addModules(req, res) {
    try {
      const moduleList = req.body.moduleItems;
      const addedModules = [];
      for (const lists of moduleList) {
        const { courseName, courseId, moduleTitle, description } = lists;
        const newModule = new courseModuleSchema({
          courseName,
          courseId,
          moduleTitle,
          description,
        });
        await newModule.save();
        addedModules.push(newModule);
      }
      res.status(200).json({
        status: true,
        success: "Modules Added",
        data: addedModules,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // async addVideoByModuleId(req, res) {
  //   try {
  //     const moduleId = req.params.id;
  //     const { name, link, description } = req.body;
  //     const findModule = await courseModuleSchema.findOne({ _id: moduleId });
  //     if (!findModule) {
  //       res.status(401).json({ error: "Module not found" });
  //     }
  //    const addObj =  findModule.videoAdd.map((newVideo)=>({
  //     _id: new ObjectId(),
  //     name, link, description,
  //     ...newVideo,
  //     }));
  //     await courseModuleSchema.findByIdAndUpdate(
  //               moduleId,
  //               { $push: { findModule.videoAdd: { $each: addObj } } },
  //               { new: true }
  //             );
  //     res.status(200).json({
  //       status: true,
  //       success: "Added",
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  // async addVideoByModuleId(req, res) {
  //   try {
  //     const moduleId = req.params.id;
  //     const { name, link, description } = req.body;
  //     console.log("Received name:", name);
  //     console.log("Received link:", link);
  //     console.log("Received description:", description);
  //     const findModule = await courseModuleSchema.findOne({ _id: moduleId });

  //     if (!findModule) {
  //       return res.status(401).json({ error: "Module not found" });
  //     }
  //     const newVideo = {
  //       _id: new ObjectId(),
  //       name: name,
  //       link: link,
  //       description: description,
  //     };

  //     // Push the new video object into the videoAdd array of the module
  //     findModule.videoAdd.push(newVideo);

  //     // Save the updated module
  //     await findModule.save();

  //     res.status(200).json({
  //       status: true,
  //       success: "Added",
  //       data: newVideo, // Returning the newly added video object
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  async getAllModules(req, res) {
    try {
      const modulesData = await courseModuleSchema.find();
      res.status(200).json({
        status: true,
        data: modulesData,
        count: modulesData.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Server Error` });
    }
  }

  async getModuleByCourseId(req, res) {
    try {
      const modulesObj = await courseModuleSchema.find({
        courseId: req.params.id,
      });
      if (!modulesObj) {
        return res.status(404).json({ message: "module not found" });
      }
      res.status(200).json({ data: modulesObj });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const courseModulesController = new CourseModule();
module.exports = courseModulesController;
