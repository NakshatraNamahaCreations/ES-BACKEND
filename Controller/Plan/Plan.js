const Planmodel = require("../../Model/Plan/Plan");

class Plans {
  async postaddplan(req, res) {
    let {
      planName,
      imagelink,
      priceDescription,
      price,
      validPeriod,
      noOfPeriod,
      searchCount,
    } = req.body;

    try {
      let newplan = new Planmodel({
        planName,
        imagelink,
        priceDescription,
        price,
        validPeriod,
        noOfPeriod,
        searchCount,
      });

      let save = newplan.save();

      if (save) {
        return res.status(200).json({ success: "Plan added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateplan(req, res) {
    try {
      const planId = req.params.ccid;
      const {
        planName,
        imagelink,
        priceDescription,
        price,
        validPeriod,
        noOfPeriod,
        searchCount,
      } = req.body;

      const findplan = await Planmodel.findOne({
        _id: planId,
      });
      if (!findplan) {
        return res.json({ error: "No such record found" });
      }

      findplan.planName = planName || findplan.planName;
      findplan.price = price || findplan.price;
      findplan.priceDescription = priceDescription || findplan.priceDescription;
      findplan.noOfPeriod = noOfPeriod || findplan.noOfPeriod;
      findplan.validPeriod = validPeriod || findplan.validPeriod;
      findplan.imagelink = imagelink || findplan.imagelink;
      findplan.searchCount = searchCount || findplan.searchCount;

      const updateCategory = await Planmodel.findOneAndUpdate(
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

  async getallplan(req, res) {
    try {
      let plandata = await Planmodel.find();
      if (plandata.length > 0) {
        return res.status(200).json({ data: plandata });
      } else {
        return res.status(400).json({ error: "No Plan's available" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to get the Plan's" });
    }
  }

  async postdeleteplan(req, res) {
    let id = req.params.id;
    const data = await Planmodel.deleteOne({ _id: id });

    return res.status(200).json({ success: "Successfully", data: data });
  }
}

const PlansController = new Plans();
module.exports = PlansController;
