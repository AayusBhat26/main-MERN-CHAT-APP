// todo: schema: => chatname, userList,isGroupchat lastestMessage, (if groud), who is the group admin, 

const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  chatName: {
    type: String,
    trim: true,
  },
  users: [
    {
      // todo: how to get the id of user.
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps:true});


const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;