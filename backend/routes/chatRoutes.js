const express = require('express');
const { accessChat, fetchChats, createGroupChat } = require('../controllers/chatControllers');
const { protectAuth } = require('../middleware/authMiddlewear');

const router = express.Router();


// todo: create routes for 
// 1. single chat, 2. groupchat

// for the single chat, we can create a new chat, we can get data or messages from chats.

// for group chat, we create a new group, we can renmae the group, we can remove people from group 


// the route for accessing and creating chat, 
router.route('/').post(protectAuth,accessChat);
// in order to get the chat.
router.route("/").get(protectAuth, fetchChats);

// group routes. 
router.route("/group").post(protectAuth, createGroupChat);
router.route("/rename").put(protectAuth, renameGroup);
// router.route("/groupremove").put(protectAuth, removeFromGroup);
// router.route("/groupadd").put(protectAuth, addToGroup);


module.exports = router;