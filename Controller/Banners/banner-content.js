const bannerSchema = require("../../Model/Banners/banner-content");

class Banner {
  async createBanner(req, res) {
    try {
      const { screenName, bannerType } = req.body;
      let file = req.file?.filename;
      const banner = new bannerSchema({
        screenName,
        bannerImage: file,
        bannerType,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select banner image",
        });
      }
      await banner.save();
      res.status(200).json({
        status: true,
        success: "banner created successfully",
        data: banner,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWebBanner(req, res) {
    try {
      let data = await bannerSchema.find({ bannerType: "website" });
      //   .sort(["_id", -1]);
      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async getAppBanner(req, res) {
    try {
      let data = await bannerSchema.find({ bannerType: "app" });
      //   .sort(["_id", -1]);
      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async getBannerById(req, res) {
    try {
      const banner = await bannerSchema.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // async updateBannerById(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const { screenName } = req.body;
  //     let file = req.file ? req.file.filename : null;
  //     const findBanner = await bannerSchema.findOne({ _id: id });
  //     if (!findBanner) {
  //       return res.status(401).json({ error: "No banner Found" });
  //     }
  //     findBanner.screenName = screenName || findBanner.screenName;
  //     findBanner.bannerImage = file;
  //     const updateBanner = await bannerSchema.findOneAndUpdate(
  //       { _id: id },
  //       { $set: findBanner },
  //       { new: true }
  //     );
  //     if (!updateBanner) {
  //       return res
  //         .status(404)
  //         .json({ status: false, message: "Banner not found" });
  //     }
  //     return res.status(200).json({
  //       status: true,
  //       success: "Banner updated successfully",
  //       Data: updateBanner,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  async updateBannerById(req, res) {
    try {
      const id = req.params.id;
      const { screenName } = req.body;
      let file = req.file ? req.file.filename : null;

      // Start with an empty update object
      let update = {};

      // Conditionally add screenName to the update object if it's provided
      // if (screenName !== undefined) {
      //   update.screenName = screenName;
      // }

      update.screenName = screenName || update.screenName;

      // Conditionally add bannerImage to the update object if a file is uploaded
      if (file) {
        update.bannerImage = file;
      }

      // Find the banner by ID
      const findBanner = await bannerSchema.findOne({ _id: id });
      if (!findBanner) {
        return res.status(401).json({ error: "No banner Found" });
      }

      // Update the banner with the provided fields
      const updateBanner = await bannerSchema.findOneAndUpdate(
        { _id: id },
        { $set: update }, // Use the update object here
        { new: true }
      );

      if (!updateBanner) {
        return res
          .status(404)
          .json({ status: false, message: "Banner not found" });
      }

      return res.status(200).json({
        status: true,
        success: "Banner updated successfully",
        Data: updateBanner,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteBannerById(req, res) {
    try {
      const _id = req.params.id;
      const banner = await bannerSchema.findByIdAndDelete(_id);
      if (!banner) {
        return res
          .status(404)
          .json({ status: false, message: "Banner not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Banner deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const BannerController = new Banner();
module.exports = BannerController;
