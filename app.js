const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const User = require("./Model/Peoples/user");
const Message = require("./Model/messageModel");
const Group = require("./Model/group");
const { Server } = require("socket.io");

const http = require("http");
const server = http.createServer(app);
const paymentoneController = require("./Controller/Payment/Paymentone");


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
  },
});



app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected!!!", err));

app.post("/api/pabbly/webhook", express.json({ limit: "5mb" }), (req, res, next) => {
  console.log("=== RAW WEBHOOK HIT ===");
  next();
}, paymentoneController.pabblyWebhook);

const bannerRoutes = require("./Route/Banners/banner-content");
const youtubeVideoRoutes = require("./Route/Banners/youtube-video");
const freeMaterialRoutes = require("./Route/Content/free-material");
const myCourseRoutes = require("./Route/Courses/my-course");
const courseModuleRoutes = require("./Route/Courses/course-module");
const videoModuleRoutes = require("./Route/Courses/video-module");
const imageModuleRoutes = require("./Route/Courses/image-module");
const documentModuleRoutes = require("./Route/Courses/document-module");
const zipModuleRoutes = require("./Route/Courses/zip-module");
const couponRoutes = require("./Route/Coupons/manage-coupon");
const teamRouter = require("./Route/Peoples/team");
const user = require("./Route/Peoples/user");
const ratingsandreviews = require("./Route/RatingReview/ratings-reviews");
const notification = require("./Route/Notifications/notification");
const asin = require("./Route/asinSearch");
const keyword = require("./Route/keywordSearch");
const inAppNoti = require("./Route/Notifications/inAppNotification");
const freeMaterialDocRoutes = require("./Route/Content/free-material-documents");
const freeMaterialVideoRoutes = require("./Route/Content/free-material-video");
const broadcasting = require("./Route/Notifications/BroadCasting");
const messageRoutes = require("./Route/message");
const groupRoutes = require("./Route/Group");
const chatRoutes = require("./Route/chat");
const payment = require("./Route/Payment/Payment");
const plans = require("./Route/Plan/Plan");
const Asin = require("./Route/Plan/asin");
const Keywordsarch = require("./Route/Plan/Keyword");
const adminRoutes = require("./Route/admin/admin");
const paymentkey = require("./Route/Payment/Paymentkey");
const phonepeRoute = require("./Route/Payment/phonepeRoute");
const plancouponroute = require("./Route/Coupons/Coupon");
const trytobookmodal = require("./Route/Payment/Trytobook");
const paymentone = require("./Route/Payment/Paymentone");




//admin
app.use("/api/admin", adminRoutes);

app.use("/api/banner", bannerRoutes);
app.use("/api/youtube", youtubeVideoRoutes);
app.use("/api/freematerial", freeMaterialRoutes);
app.use("/api/mycourse", myCourseRoutes);
app.use("/api/coursemodule", courseModuleRoutes);
app.use("/api/video-module", videoModuleRoutes);
app.use("/api/image-module", imageModuleRoutes);
app.use("/api/document-module", documentModuleRoutes);
app.use("/api/zip-module", zipModuleRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/team", teamRouter);
app.use("/api/users", user);
app.use("/api/ratingsandreviews", ratingsandreviews);
app.use("/api/notification", notification);
app.use("/api", asin);
app.use("/api", keyword);
app.use("/api/in-app", inAppNoti);
app.use("/api/freematerial-document", freeMaterialDocRoutes);
app.use("/api/freematerial-video", freeMaterialVideoRoutes);
app.use("/api/broadcasting", broadcasting);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/payment", payment);
app.use("/api/plans", plans);
app.use("/api", Asin);
app.use("/api", Keywordsarch);
app.use("/api/paymentkey", paymentkey);
app.use("/api", phonepeRoute);
app.use("/api", plancouponroute);
app.use("/api", trytobookmodal);
app.use("/api", paymentone);

app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: "rzp_live_gZWb9zLxROzkYB",
  key_secret: "QqMPKEZnithH2onkIQi4U7Jh",
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;
  const { userId } = req.query;

  try {
    // Log paymentId and userId for debugging
    console.log("Payment ID:", paymentId);
    console.log("User ID:", userId);
    const razorpay = new Razorpay({
     key_id: "rzp_live_gZWb9zLxROzkYB",
  key_secret: "QqMPKEZnithH2onkIQi4U7Jh",
    });

    // Fetch payment details using the Razorpay instance
    const payment = await razorpay.payments.fetch(paymentId);

    // Validate payment details
    if (!payment || payment.amount !== 100 || payment.status !== "captured") {
      return res.status(400).json({
        message: "Payment not successful or incorrect amount",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.searchLimit += 500;
    user.count = 0;
    await user.save();
    // Respond with success message
    res.json({
      message: "Payment verified and search limit updated",
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("Error verifying payment or updating user:", error);
    res.status(500).json({
      message: "Failed to verify payment and update user search limit",
    });
  }
});

// WebSocket
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register-socket", async (userID) => {
    try {
      await User.findByIdAndUpdate(userID, { socketID: socket.id });
    } catch (err) {
      console.error("Error registering socket ID:", err);
    }
  });

  socket.on("send-message", async (data) => {
    const { senderID, receiverID, groupID, content, type } = data;
    try {
      const timestamp = new Date();
      const message = new Message({
        senderID,
        receiverID: groupID || receiverID,
        groupID,
        content,
        type,
        timestamp,
      });
      await message.save();

      if (groupID) {
        const group = await Group.findById(groupID);
        if (group && group.members) {
          for (const member of group.members) {
            if (member.id !== senderID) {
              const user = await User.findById(member.id);
              if (user?.socketID) {
                io.to(user.socketID).emit("receive-message", message);
              }
            }
          }
        }
      } else {
        const receiver = await User.findById(receiverID);
        if (receiver?.socketID) {
          io.to(receiver.socketID).emit("receive-message", message);
        }
      }
      socket.emit("receive-message", message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("disconnect", async () => {
    try {
      console.log("User disconnected:", socket.id);
      await User.updateMany(
        { socketID: socket.id },
        { $unset: { socketID: 1 } }
      );
    } catch (err) {
      console.error("Error handling disconnect:", err);
    }
  });
});

// Start Server
const port = process.env.PORT || 8082;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
