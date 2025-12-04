const freeMaterialVideoSchema = require("../../Model/Content/free-material-video");

class FreeMaterialVIdeo {
  async addYouTubeLink(req, res) {
    try {
      const { thumbnailTitle, youtubeLink } = req.body;
      const link = new freeMaterialVideoSchema({
        thumbnailTitle,
        youtubeLink,
      });
      await link.save();
      res.status(200).json({
        status: true,
        success: "Link Added",
        data: link,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllVideo(req, res) {
    try {
      const video = await freeMaterialVideoSchema.find();
      res.status(200).json({
        status: true,
        data: video,
        count: video.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Server Error` });
    }
  }
  async getVideoById(req, res) {
    try {
      const video = await freeMaterialVideoSchema.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVideo(req, res) {
    try {
      const id = req.params.id;
      const video = await freeMaterialVideoSchema.findOneAndDelete({ _id: id });
      if (!video) {
        return res
          .status(404)
          .json({ status: false, message: "video not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "video deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const freeMaterialVideoController = new FreeMaterialVIdeo();
module.exports = freeMaterialVideoController;
