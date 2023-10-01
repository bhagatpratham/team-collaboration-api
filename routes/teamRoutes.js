const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const verifyToken = require("../middleware/verifyToken");

// Route for creating a team (protected)
router.post("/create", verifyToken.auth, teamController.createTeam);
router.post("/invite", teamController.inviteUser);
router.post("/accept", teamController.acceptInvitation);
module.exports = router;
