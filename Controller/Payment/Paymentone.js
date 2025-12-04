
const axios = require("axios");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const User = require("../../Model/Peoples/user");
const Order = require("../../Model/Payment/Paymentone");
const Plan = require("../../Model/Plan/Plan");

exports.getPabblyPlans = async (req, res) => {
  try {
    const username = process.env.PABBL_USERNAME;
    const password = process.env.PABBL_PASSWORD;
    const token = Buffer.from(`${username}:${password}`).toString("base64");

    const response = await axios.get("https://payments.pabbly.com/api/v1/plans", {
      headers: { Authorization: `Basic ${token}` },
    });

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching Pabbly plans:", err.message);
    res.status(500).json({ message: "Failed to fetch plans", error: err.message });
  }
};


exports.pabblyWebhook = async (req, res) => {
  try {
    console.log("=== Pabbly Webhook Received ===");

    // Convert RAW buffer to JSON
    const raw = req.body.toString();
    console.log("RAW Body:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.log("JSON Parse Error");
      return res.status(400).json({ message: "Invalid JSON" });
    }

    console.log("Parsed Data:", data);

    // Body validation
    if (!data || Object.keys(data).length === 0) {
      console.log("Empty Body Received!");
      return res.status(400).json({ message: "Empty Body" });
    }

    // Only success webhook should continue
    if (data.status !== "success") {
      console.log("Ignoring non-success event");
      return res.status(200).json({ message: "Ignored non-success" });
    }

    // Mandatory fields
    if (!data.customer_email || !data.plan_code) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Find user
    const user = await User.findOne({ email: data.customer_email });
    if (!user) {
      console.log("User Not Found");
      return res.status(404).json({ message: "User not found" });
    }

    // Find plan
    const plan = await Plan.findOne({ plan_code: data.plan_code });
    if (!plan) {
      console.log("Plan Not Found");
      return res.status(404).json({ message: "Plan not found" });
    }

    // Save order
    const newOrder = await Order.create({
      userId: user._id,
      planId: plan._id,
      subscriptionId: data.subscription_id || null,
      paymentId: data.payment_id || null,
      amount: data.amount || 0,
      status: "success",
      paymentGateway: "pabbly",
      raw: data,
    });

    console.log("Saved Payment:", newOrder);

    // IMPORTANT: Call your API after success
    await axios.get("https://admin.proleverage.io/api/broadcasting/getallbroadcast");

    console.log("Triggered your API after success!");

    return res.status(200).json({ message: "Payment saved & API triggered" });

  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ message: "Webhook failed", error: err.message });
  }
};
