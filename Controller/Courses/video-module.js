const VideoModule = require("../../Model/Courses/video-module");

class Video {
  async addVideo(req, res) {
    try {
      const { courseId, moduleId, moduleName, name, videoLink, description } =
        req.body;
      const newVideo = new VideoModule({
        courseId,
        moduleId,
        moduleName,
        name,
        videoLink,
        description,
      });
      await newVideo.save();
      res.status(200).json({
        status: true,
        success: "Video Added",
        data: newVideo,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllVideos(req, res) {
    try {
      const video = await VideoModule.find();
      if (video.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No videos found",
        });
      } else {
        return res.status(200).json({
          message: "success",
          count: video.length,
          data: video,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVideoByModuleId(req, res) {
    try {
      const video = await VideoModule.find({
        moduleId: req.params.id,
      });
      if (!video) {
        return res.status(404).json({
          status: 404,
          message: "No videos found for the provided module ID",
        });
      } else {
        return res.status(200).json({
          message:
            "video modules, so it conatins courseId, moduleId,moduleName,name,videoLink,description,",
          count: video.length,
          data: video,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const videoController = new Video();
module.exports = videoController;
