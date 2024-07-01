const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  personalInfo: String,
  education: [],
  workExperience: [],
  skills: [],
  languages: [],
  otherSkills: [],
  profilePicture: String,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
