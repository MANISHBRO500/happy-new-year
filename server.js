const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();

// Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to send Happy New Year message to multiple recipients
app.post('/send-message', async (req, res) => {
  // Hardcoded recipient list (Indian numbers)
  const recipients = [
    '+919556469372',
    '+919437950075',
    '+917205457059',
    '+917008023590',
    '+918260641403',
    '+917735116679',
    '+919776801828',
    '+917855890993',
    '+918658457398',
    '+917205749200',
    '+917077219062',
    '+917847818993',
    '+919943068668',
    '+917681812578',
    '+919937692880',
  ];

  // Message to be sent
  const message = "🎉 Happy New Year! 🎆 Wishing you a wonderful year ahead filled with joy and success!";

  try {
    // Send SMS to all recipients
    const sendPromises = recipients.map((recipient) =>
      client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: recipient,
      })
    );

    await Promise.all(sendPromises); // Wait for all messages to be sent

    res.status(200).send({ success: `Message sent to ${recipients.length} recipients!` });
  } catch (error) {
    res.status(500).send({ error: `Failed to send messages: ${error.message}` });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
