const Invitation = require("../models/Invitation");
const Team = require("../models/Team");
const User = require("../models/User");

exports.createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    const newTeam = new Team({
      name,
      members,
    });

    await newTeam.save();

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.inviteUser = async (req, res) => {
  try {
    const { teamId, userId, senderId } = req.body;

    // Check if the team and user exist
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if (!team || !user) {
      return res.status(404).json({ message: "Team or user not found" });
    }

    // Check if the sender is a member of the team (you can customize this logic)
    const senderIsMember = team.members.includes(senderId);
    if (!senderIsMember) {
      return res
        .status(403)
        .json({ message: "Access denied. Sender is not a member of the team" });
    }

    // Check if the user is already a member of the team
    const userIsMember = team.members.includes(user._id);
    if (userIsMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of the team" });
    }

    // Check if an invitation already exists for this user and team
    const existingInvitation = await Invitation.findOne({
      team: teamId,
      user: userId,
    });
    if (existingInvitation) {
      return res
        .status(400)
        .json({ message: "Invitation already sent to this user" });
    }

    const newInvitation = new Invitation({
      team: teamId,
      user: userId,
      sender: senderId,
    });

    await newInvitation.save();

    res
      .status(201)
      .json({ message: "Invitation sent successfully", newInvitation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", erroe: error.message });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId, userId } = req.body;

    // Check if the invitation and user exist
    const invitation = await Invitation.findById(invitationId);
    const user = await User.findById(userId);

    if (!invitation || !user) {
      return res.status(404).json({ message: "Invitation or user not found" });
    }

    // Update invitation status to accepted
    invitation.status = "accepted";
    await invitation.save();

    // Add user to team
    const team = await Team.findById(invitation.team._id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.members.push(userId);
    await team.save();

    // Add team to user's list of teams
    user.teams.push(team._id);
    await user.save();

    res.status(200).json({
      message: "Invitation accepted and user added to team successfully",
      team,
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
