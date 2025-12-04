const express = require("express");
const Auth = require("../Middleware/user.js");
const router = express.Router();
const chatControllers = require("../Controller/chatControllers.js");

// import {
//   accessChats,
//   fetchAllChats,
//   creatGroup,
//   renameGroup,
//   addToGroup,
//   removeFromGroup,
// } from "../Controller/chatControllers.js";

router.post("/", Auth, chatControllers.accessChats);
router.get("/", Auth, chatControllers.fetchAllChats);
router.post("/group", Auth, chatControllers.creatGroup);
router.patch("/group/rename", Auth, chatControllers.renameGroup);
router.patch("/groupAdd", Auth, chatControllers.addToGroup);
router.patch("/groupRemove", Auth, chatControllers.removeFromGroup);
router.delete("/removeuser", Auth);

module.exports = router;
