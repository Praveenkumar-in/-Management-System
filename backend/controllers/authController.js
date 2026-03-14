const User = require("../models/User");
const generateToken = require("../config/jwt");
const bcrypt = require("bcryptjs");

// Register Student
exports.registerStudent = async (req, res) => {

 try {

  const { name, registerNumber, password, phoneNumber } = req.body;

  const existing = await User.findOne({ registerNumber });

  if (existing) {
   return res.status(400).json({ message: "Student already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const student = await User.create({
   name,
   registerNumber,
   password: hashedPassword,
   phoneNumber,
   role: "student"
  });

  res.json({
   token: generateToken(student._id, student.role),
   user: student
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};


// Login Student
exports.loginStudent = async (req, res) => {

 try {

  const { registerNumber, password } = req.body;

  const user = await User.findOne({ registerNumber });

  if (!user) {
   return res.status(400).json({ message: "Student not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   return res.status(400).json({ message: "Invalid password" });
  }

  res.json({
   token: generateToken(user._id, user.role),
   user
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};


exports.loginAdmin = async (req, res) => {

 try {

  const { username, password } = req.body;

  if (
   username !== process.env.ADMIN_USERNAME ||
   password !== process.env.ADMIN_PASSWORD
  ) {
   return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = generateToken("admin", "admin");

  res.json({
   token,
   role: "admin"
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};