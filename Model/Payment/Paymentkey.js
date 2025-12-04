const mongoose = require("mongoose");
//13
const paymentkey = new mongoose.Schema({
  merchantkey: {
    type: String,
  },
  saltkey: {
    type: String,
  },
  reazorpaykey_id: {
    type: String,
  },
  reazorpaykey_secret: {
    type: String,
  },
  paymenttype: {
    type: String,
  },
  itemgroupstatus: {
    type: String,
  },
});

const paymentkeyModal = mongoose.model("paymentkey", paymentkey);
module.exports = paymentkeyModal;
