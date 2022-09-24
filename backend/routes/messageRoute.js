const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageController');
const { protectAuth } = require('../middleware/authMiddlewear');
const router = express.Router();


router.route("/").post(protectAuth, sendMessage);


router.route("/:chatId").get(protectAuth, allMessages);

module.exports = router;