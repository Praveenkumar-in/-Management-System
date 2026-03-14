const axios = require("axios");

const sendSMS = async (phoneNumber, message) => {

 try {

  await axios.post(
   "https://www.fast2sms.com/dev/bulkV2",
   {
    route: "q",
    message: message,
    language: "english",
    numbers: phoneNumber
   },
   {
    headers: {
     authorization: process.env.SMS_API_KEY
    }
   }
  );

  console.log("SMS sent successfully");

 } catch (error) {

  console.log("SMS error:", error.message);

 }

};

module.exports = sendSMS;