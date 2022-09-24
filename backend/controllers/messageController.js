const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require('../models/messageModel');
const User = require("../models/userModel");
const sendMessage = expressAsyncHandler(async(req,res)=>{
      const {content, chatId} = req.body;
      // console.log(user);
      if(!content || !chatId){
            console.log('Invalid Data Passed Into Request');
            return res.sendStatus(400);
      }

      var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
      };
      try {
            var message = await Message.create(newMessage);
            message = await message.populate('sender', "name pic");
            message = await message.populate('chat')
            message = await User.populate(message, {
                  path:'chat.users',
                  select:'name pic email'
            });
            await Chat.findByIdAndUpdate(req.body.chatId, {
              lastestMessage: message,
            });

            res.json(message);
            // console.log(message.chat.lastestMessage);

      } catch (error) {
            res.status(400)
            throw new Error(`error occurred: ${error.message}`);
      }
});

const allMessages = expressAsyncHandler(async(req,res) => {
      try {
            const messages = await Message.find({
                  chat:req.params.chatId
            }).populate('sender', "name pic email").populate("chat");

            res.json(messages);
      } catch (error) {
            res.status(400);
            throw new Error(`error occurred: ${error.message}`);
      }
});


module.exports = {
  sendMessage,
  allMessages,
};