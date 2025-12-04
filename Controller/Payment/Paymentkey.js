const paymentkeyModal = require("../../Model/Payment/Paymentkey");

class PaymentGroup {
  async addPaymentKeys(req, res) {
    const {
      merchantkey,
      saltkey,
      reazorpaykey_id,
      reazorpaykey_secret,
      itemgroupstatus,
      paymenttype,
    } = req.body;
    try {
      const newPayment = new paymentkeyModal({
        merchantkey,
        saltkey,
        reazorpaykey_id,
        reazorpaykey_secret,
        itemgroupstatus,
        paymenttype,
      });
      const data = await newPayment.save();
      console.log(data);
      return res
        .status(200)
        .json({ success: "Payment Keys Added Successfully", data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to add payment keys" });
    }
  }

  async getAllItemGroups(req, res) {
    try {
      const items = await paymentkeyModal.find({});
      return res.status(200).json({ allItems: items });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to retrieve items" });
    }
  }

  async getAllreazorpaypayment(req, res) {
    try {
      const activeKey = await paymentkeyModal.findOne({
        itemgroupstatus: "Active",
      });
      if (!activeKey) {
        return res
          .status(404)
          .json({ message: "No active Razorpay keys found" });
      }
      res.status(200).json({
        reazorpaykey_id: activeKey.reazorpaykey_id,
        reazorpaykey_secret: activeKey.reazorpaykey_secret,
      });
    } catch (error) {
      console.error("Error fetching payment keys:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }

  async getAnItemGroup(req, res) {
    try {
      const itemId = req.params.id;
      const findItem = await paymentkeyModal.findOne({ _id: itemId });
      if (!findItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json({ item: findItem });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ error: "Failed to retrieve item" });
    }
  }

  async editItemGroups(req, res) {
    try {
      const id = req.params.id;
      const {
        merchantkey,
        saltkey,
        reazorpaykey_id,
        reazorpaykey_secret,
        itemgroupstatus,
        paymenttype,
      } = req.body;
      const updatedData = await paymentkeyModal.findOneAndUpdate(
        { _id: id },
        {
          merchantkey,
          saltkey,
          reazorpaykey_id,
          reazorpaykey_secret,
          itemgroupstatus,
          paymenttype,
        },
        { new: true }
      );

      if (updatedData) {
        return res
          .status(200)
          .json({ message: "Updated successfully", data: updatedData });
      } else {
        return res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      console.log("Error: ", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async deleteItemGroups(req, res) {
    try {
      const itemId = req.params.id;
      const data = await paymentkeyModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(404).json({ message: "Item not found" });
      }
      await paymentkeyModal.deleteOne({ _id: itemId });
      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ error: "Failed to delete item" });
    }
  }

  async itemGroupStatus(req, res) {
    try {
      const id = req.params.id;
      const { itemgroupstatus } = req.body;
      const data = await paymentkeyModal.findOneAndUpdate(
        { _id: id },
        { itemgroupstatus },
        { new: true }
      );
      if (!data) {
        return res.status(404).json({ message: "Invalid Id" });
      }
      return res.status(200).json({ message: "Status Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
}

const paymentkeyController = new PaymentGroup();
module.exports = paymentkeyController;
