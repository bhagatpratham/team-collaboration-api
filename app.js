const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contentRoutes = require("./routes/contentRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/content", contentRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
