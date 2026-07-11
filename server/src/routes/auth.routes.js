const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to your profile",
    user: req.user,
  });
});

module.exports = router;