const Asinmodel = require("../../Model/Plan/asin");
const User = require("../../Model/Peoples/user");

class Asins {
  // async postaddasin(req, res) {
  //   let {
  //     category,
  //     sales_volume,
  //     product_price,
  //     asin,
  //     product_title,
  //     product_star_rating,
  //     product_num_ratings,
  //     product_url,
  //     product_photo,
  //     userId,
  //   } = req.body;

  //   try {
  //     let newasin = new Asinmodel({
  //       category,
  //       sales_volume,
  //       product_price,
  //       asin,
  //       product_title,
  //       product_star_rating,
  //       product_num_ratings,
  //       product_url,
  //       product_photo,
  //       userId,
  //     });

  //     const user = await User.findById(userId);

  //     let save = newasin.save();

  //     user.searchcount += 1;
  //     await user.save();

  //     if (save) {
  //       return res
  //         .status(200)
  //         .json({ success: "asin data added successfully" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async postaddasin(req, res) {
    let {
      category,
      sales_volume,
      product_price,
      asin,
      product_title,
      product_star_rating,
      product_num_ratings,
      product_url,
      product_photo,
      userId,
    } = req.body;

    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if ASIN already exists for the user
      const existingAsin = await Asinmodel.findOne({ asin, userId });
      if (existingAsin) {
        return res.status(200).json({
          message: "ASIN already exists, no search count increment.",
        });
      }

      // Create a new ASIN entry
      let newasin = new Asinmodel({
        category,
        sales_volume,
        product_price,
        asin,
        product_title,
        product_star_rating,
        product_num_ratings,
        product_url,
        product_photo,
        userId,
      });

      // // Save ASIN and increment search count
      await newasin.save();
      // user.searchcount += 1;
      // await user.save();

      return res.status(200).json({
        success: "ASIN data added successfully and search count updated.",
      });
    } catch (error) {
      console.error("Error in postaddasin: ", error);
      return res.status(500).json({ error: "Unable to add ASIN data." });
    }
  }

  async updateasin(req, res) {
    try {
      const planId = req.params.ccid;
      const {
        category,
        sales_volume,
        product_price,
        asin,
        product_title,
        product_star_rating,
        product_num_ratings,
        product_url,
        product_photo,
      } = req.body;

      const findplan = await Asinmodel.findOne({
        _id: planId,
      });
      if (!findplan) {
        return res.json({ error: "No such record found" });
      }

      findplan.category = category || findplan.category;
      findplan.sales_volume = sales_volume || findplan.sales_volume;
      findplan.product_price = product_price || findplan.product_price;
      findplan.asin = asin || findplan.asin;
      findplan.product_title = product_title || findplan.product_title;
      findplan.product_star_rating =
        product_star_rating || findplan.product_star_rating;
      findplan.product_num_ratings =
        product_num_ratings || findplan.product_num_ratings;
      findplan.product_url = product_url || findplan.product_url;
      findplan.product_photo = product_photo || findplan.product_photo;

      const updateCategory = await Asinmodel.findOneAndUpdate(
        { _id: planId },
        findplan,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }

  async getalasin(req, res) {
    try {
      let plandata = await Asinmodel.find();
      if (plandata.length > 0) {
        return res.status(200).json({ data: plandata });
      } else {
        return res.status(400).json({ error: "No Asin data available" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to get the Plan's" });
    }
  }

  async getoneasin(req, res) {
    try {
      const { asin } = req.params;
      let asindata = await Asinmodel.findOne({ asin });
      if (asindata != null) {
        return res.status(200).json({ data: asindata });
      } else {
        return res.status(400).json({ error: "No Asin data available" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to get the Plan's" });
    }
  }

  async postdeleteasin(req, res) {
    let id = req.params.id;
    const data = await Asinmodel.deleteOne({ _id: id });

    return res.status(200).json({ success: "Successfully", data: data });
  }

  async updateSearchCount(req, res) {
    const { userId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.searchcount += 1;
      await user.save();

      return res
        .status(200)
        .json({ success: "Search count updated successfully." });
    } catch (error) {
      console.error("Error updating search count:", error);
      return res.status(500).json({ error: "Unable to update search count." });
    }
  }
}

const AsinsController = new Asins();
module.exports = AsinsController;
