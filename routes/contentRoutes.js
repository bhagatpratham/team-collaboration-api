// routes/contentRoutes.js
const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const verifyToken = require("../middleware/verifyToken");
const roleMiddleware = require("../middleware/checkUserRole");
const checkUserRole = require("../middleware/checkUserRole");

// Route for creating content (protected)
router.post("/create", verifyToken.auth, contentController.createContent);

// Route for updating content (protected)
router.put(
  "/update/:contentId",
  verifyToken.auth,
  checkUserRole(["admin", "member"]),
  contentController.updateContent
);

// Route for deleting content (protected)
router.delete(
  "/delete/:contentId",
  verifyToken.auth,
  checkUserRole(["admin", "member"]),
  contentController.deleteContent
);

module.exports = router;
