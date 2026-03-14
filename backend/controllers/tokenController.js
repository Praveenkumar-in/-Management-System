const Token = require("../models/Token");
const sendSMS = require("../services/smsService");
const { getIO } = require("../socket/socket");

// Generate Token
exports.generateToken = async (req, res) => {

 try {

  const studentId = req.user._id;

  const lastToken = await Token.findOne().sort({ tokenNumber: -1 });

  let newTokenNumber = 1;

  if (lastToken) {
   newTokenNumber = lastToken.tokenNumber + 1;
  }

  const token = await Token.create({
   tokenNumber: newTokenNumber,
   studentId
  });

  const student = await User.findById(studentId);

  // Confirmation SMS
  if (student && student.phoneNumber) {
   await sendSMS(
    student.phoneNumber,
    `College Fee Queue

Your token number is ${token.tokenNumber}.
Please wait for your turn.`
   );
  }

  const io = getIO();
  io.emit("tokenGenerated", token);
  io.emit("queueUpdated");

  res.json({
   message: "Token generated",
   token
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};

// Token Status
exports.tokenStatus = async (req, res) => {

 try {

  const studentId = req.user._id;

  const token = await Token.findOne({
   studentId,
   status: "waiting"
  });

  if (!token) {
   return res.json({ message: "No active token" });
  }

  const studentsAhead = await Token.countDocuments({
   status: "waiting",
   tokenNumber: { $lt: token.tokenNumber }
  });

  // assume average payment time = 2 minutes per student
  const avgServiceTime = 2;

  const estimatedWait = studentsAhead * avgServiceTime;

  res.json({
   tokenNumber: token.tokenNumber,
   studentsAhead,
   estimatedWait: `${estimatedWait} minutes`
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};

// Queue List
exports.getQueue = async (req, res) => {

 try {

  const queue = await Token.find({ status: "waiting" })
   .sort({ tokenNumber: 1 });

  res.json(queue);

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};