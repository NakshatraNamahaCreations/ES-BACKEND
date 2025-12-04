const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  editAdmin,
  deleteAdmin,
  changePassword,
} = require("../../Controller/admin/admin");

const router = express.Router();

// Register route
router.post("/register", registerAdmin);

// Login route
router.post("/login", loginAdmin);

// Edit admin details
router.put("/edit/:id", editAdmin);

// Delete admin
router.delete("/delete/:id", deleteAdmin);

// Change password
router.put("/change-password/:id", changePassword);

module.exports = router;
