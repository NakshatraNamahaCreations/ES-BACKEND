const broadCastSchema = require("../../Model/Notifications/BroadCasting");

class broadCast {
  async addBroadCast(req, res) {
    try {
      const { message } = req.body;
      let file = req.file?.filename;
      const newBroadCast = new broadCastSchema({
        message,
        image: file,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      await newBroadCast.save();
      res.status(200).json({
        status: true,
        success: "Added",
        data: newBroadCast,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBroadCast(req, res) {
    try {
      const allBroadCast = (await broadCastSchema.find()).reverse(true);
      if (allBroadCast.length > 0) {
        return res.status(200).json({
          status: true,
          data: allBroadCast,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error,
      });
    }
  }

  async deleteBroadcast(req, res) {
    try {
      const id = req.params.id;
      const doc = await broadCastSchema.findOneAndDelete({ _id: id });
      if (!doc) {
        return res
          .status(404)
          .json({ status: false, message: "Broadcast not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Broadcast deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const broadCastController = new broadCast();
module.exports = broadCastController;
