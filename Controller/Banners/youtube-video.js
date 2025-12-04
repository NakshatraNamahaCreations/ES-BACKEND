const youtubeVideoSchema = require("../../Model/Banners/youtube-video");

class youtubeVideo {
  async createYoutubeVideo(req, res) {
    try {
      const { title, link, description } = req.body;
      let file = req.file?.filename;
      const video = new youtubeVideoSchema({
        title,
        thumbnailImage: file,
        link,
        description,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select thumbnail image",
        });
      }
      await video.save();
      res.status(200).json({
        status: true,
        success: "Created successfully",
        data: video,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllVideos(req, res) {
    try {
      let data = await youtubeVideoSchema.find();
      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async deleteVideo(req, res) {
    try {
      const _id = req.params.id;
      const video = await youtubeVideoSchema.findByIdAndDelete(_id);
      if (!video) {
        return res
          .status(404)
          .json({ status: false, message: "Video not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const youtubeVideoController = new youtubeVideo();
module.exports = youtubeVideoController;
