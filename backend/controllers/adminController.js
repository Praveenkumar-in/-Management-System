const Token = require("../models/Token");
const { getIO } = require("../socket/socket");

// Call Next Token
exports.callNext = async (req, res) => {

 try {

  const token = await Token.findOne({ status: "waiting" })
   .sort({ tokenNumber: 1 });

  if (!token) {
   return res.json({ message: "No tokens in queue" });
  }

  token.status = "serving";
  await token.save();
  const io = getIO();

io.emit("tokenCalled", token);
io.emit("queueUpdated");
  res.json({
   message: "Token called",
   token
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};



// Call Next 10 Tokens
exports.callNextTen = async (req, res) => {

 try {

  // first 10 tokens → serving
  const servingTokens = await Token.find({ status: "waiting" })
   .sort({ tokenNumber: 1 })
   .limit(10);

  for (let token of servingTokens) {
   token.status = "serving";
   await token.save();
  }

  // next 10 tokens → notify students
  const nextTokens = await Token.find({ status: "waiting" })
   .sort({ tokenNumber: 1 })
   .limit(10);

  for (let token of nextTokens) {

   const student = await User.findById(token.studentId);

   if (student && student.phoneNumber) {

    await sendSMS(
     student.phoneNumber,
     `College Fee Queue

Your turn will come now.
Please come near the payment counter.`
    );

   }

  }

  const io = getIO();

  io.emit("queueUpdated");
  io.emit("tokenCalled", servingTokens);

  res.json({
   message: "First 10 tokens serving. Next 10 students notified."
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};



// Skip Token
exports.skipToken = async (req, res) => {

 try {

  const { tokenNumber } = req.body;

  const token = await Token.findOne({ tokenNumber });

  if (!token) {
   return res.status(404).json({ message: "Token not found" });
  }

  token.status = "skipped";

  await token.save();

  res.json({
   message: "Token skipped",
   token
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};



// Reset Queue
exports.resetQueue = async (req, res) => {

 try {

  await Token.deleteMany({});
  const io = getIO();

io.emit("queueReset");
  res.json({
   message: "Queue reset successfully"
  });

 } catch (error) {
  res.status(500).json({ message: error.message });
 }

};