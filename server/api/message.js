const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const { uploadMessages } = require('../modal/message');
router.use(bodyParser.json());

router.post('/uploadMessage', async (req, res) => {
  const { text, time, username } = req.body;
  try {
    uploadMessages(text, time, username);
    res.send('Data Sent');
  } catch (e) {
    console.log(e);
    res.send('Error sending data');
  }
});

module.exports = router;
