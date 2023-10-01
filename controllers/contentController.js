const Content = require("../models/Content");
const Team = require("../models/Team");

exports.createContent = async (req, res) => {
  try {
    const { title, body, teamId } = req.body;

    // Check if the team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const newContent = new Content({
      title,
      body,
      team: teamId,
    });

    await newContent.save();

    res
      .status(201)
      .json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, body } = req.body;

    // Find the content by ID
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      { title, body },
      { new: true }
    );

    res.status(200).json({
      message: "Content updated successfully",
      content: updatedContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Find the content by ID
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const deletedContent = await Content.findByIdAndDelete(contentId);

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res
      .status(200)
      .json({ message: "Content deleted successfully", deletedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
