const express = require("express");
const router = express.Router();
const invitationController = require("../controllers/invitationController");

// Route for sending an invitation (protected)
router.post("/accept/:invitationId", invitationController.acceptInvitation);

module.exports = router;
