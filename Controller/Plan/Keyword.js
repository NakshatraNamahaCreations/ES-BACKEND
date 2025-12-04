const Keywordmodel = require("../../Model/Plan/Keyword");
const User = require("../../Model/Peoples/user");

class Keyword {
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
  //     let newasin = new Keywordmodel({
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

  async postaddkeyword(req, res) {
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
      randomGeneratedNumber,
    } = req.body;

    try {
      // Find the user
      //   const user = await User.findById(userId);
      //   if (!user) {
      //     return res.status(404).json({ error: "User not found" });
      //   }

      //   // Check if ASIN already exists for the user
      //   const existingAsin = await Keywordmodel.findOne({ asin });
      //   if (existingAsin) {
      //     return res.status(200).json({
      //       message: "ASIN already exists",
      //     });
      //   }

      sales_volume = parseFloat(sales_volume);
      if (isNaN(sales_volume)) {
        return res.status(400).json({ error: "Invalid sales_volume value" });
      }
      console.log("Parsed Sales Volume:", sales_volume);

      // Create a new ASIN entry
      let newasin = new Keywordmodel({
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
        randomGeneratedNumber,
      });

      // // Save ASIN and increment search counts
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

  async updatekeyword(req, res) {
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

      const findplan = await Keywordmodel.findOne({
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

      const updateCategory = await Keywordmodel.findOneAndUpdate(
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

  async getallkeyword(req, res) {
    try {
      let plandata = await Keywordmodel.find();
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

  async postdeletekeyword(req, res) {
    let id = req.params.id;
    const data = await Keywordmodel.deleteOne({ _id: id });

    return res.status(200).json({ success: "Successfully", data: data });
  }

  async updateSearchCountkeyword(req, res) {
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

const KeywordController = new Keyword();
module.exports = KeywordController;
