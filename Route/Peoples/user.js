const express = require("express");
const router = express.Router();
const userController = require("../../Controller/Peoples/user");
const multer = require("multer");
const protectedRoute = require("../../Middleware/protectedRoute");
const Auth = require("../../Middleware/user");
const User = require("../../Model/Peoples/user");
// console.log("userController>>>",userController);
console.log("wqkdjdbvwlkvb", userController.sendMessageHttp);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/user"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createuser",
  // upload.single("profilePicture"),
  userController.createUser
);
router.post(
  "/userlogin",
  //  protectedRoute,
  userController.userLogin
);

router.get("/getparticularuser/:id", userController.getParticularUser);
router.get("/getallusers", userController.getAllUer);
router.put("/updateuser/:id", userController.updateUser);
router.put("/purchasecourse/:id", userController.purchaseCourse);
router.put("/continuewatching/:id", userController.continueWatching);
router.put("/updateUsersearchcount/:id", userController.updateUsersearchcount);
router.delete("/deleteuser/:id", userController.deleteUser);
// router.post("/startconversations/:id", userController.startConversations);

//chat code
router.get("/auth/valid", Auth, userController.validUser);
router.post("/auth/firebaselogin",userController.userfirebaseLogin);
router.post("/auth/register", userController.register);
router.post("/auth/firebaseregister",userController.FireBaseregister);
router.post("/auth/login", userController.login);
router.get("/search?", Auth, userController.searchUsers);
router.get("/Allusers", userController.getAllUser);
router.get("/getUserDetails/:userId", userController.getUserDetails);
// router.patch("/api/users/update/:id", Auth, userController.updateInfo);

router.post("/chat-register", async (req, res) => {
  const {username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

router.post("/chat-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).send("Invalid credentials");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error during login");
  }
});




module.exports = router;
