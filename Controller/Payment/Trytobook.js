const Trytobookmodal = require("../../Model/Payment/Trytobook");

class Trytobook {
  async postaddtrytobook(req, res) {
    let { name, mobilenumber, planname, price, date } = req.body;

    try {
      let newplan = new Trytobookmodal({
        name,
        mobilenumber,
        planname,
        price,
        date,
      });

      let save = newplan.save();

      if (save) {
        return res.status(200).json({ success: "Plan added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatetrytobook(req, res) {
    try {
      const planId = req.params.ccid;
      const { name, mobilenumber, planname, price, date } = req.body;

      const findplan = await Trytobookmodal.findOne({
        _id: planId,
      });
      if (!findplan) {
        return res.json({ error: "No such record found" });
      }

      findplan.name = name || findplan.name;
      findplan.mobilenumber = mobilenumber || findplan.mobilenumber;
      findplan.planname = planname || findplan.planname;
      findplan.date = date || findplan.date;

      const updateCategory = await Trytobookmodal.findOneAndUpdate(
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

  async getalltrytobook(req, res) {
    try {
      let plandata = await Trytobookmodal.find().sort({ _id: -1 });
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

  async postdeletetrytobook(req, res) {
    let id = req.params.id;
    const data = await Trytobookmodal.deleteOne({ _id: id });

    return res.status(200).json({ success: "Successfully", data: data });
  }
}

const TrytoookController = new Trytobook();
module.exports = TrytoookController;
