const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// todo: accesschat.
const accessChat = asyncHandler(async (req, res) => {
  // this is for creating and fetching a singlechat.

  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not send with request.");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    // isGroupChat: false
    isGroupChat: false,
    $and: [
      // TODO: check whether both the user are there or not.
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password").populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "lastestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});


//todo: fetchChats

const fetchChats = asyncHandler(async(req,res)=>{
  try {
    // go through all the chats in the database, and get only those chats which the user is a part of.

    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastestMessage")
      .sort({
        updatedAt: -1,
      })
      .then(async (results)=>{
         await User.populate(results, {
           path: "lastestMessage.sender",
           select: "name pic email",
         });
         res.status(200).send(results);
      })
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const createGroupChat = asyncHandler(async(req, res)=>{
  if(!req.body.users || !req.body.name){
    return res.status(400).send({
      message: 'Please Fill Out all of the fields'
    });
  }
  else{
    // was not able to send an array in the form of json, so had to parse it first.
    var users = JSON.parse(req.body.users);

    if(users.length < 2){
      return res.status(400).send('More than 2 Users are Required To Form a Group');
    }
    // users in a group would be: me or the current user and other selected users.

    // so i have to push the current user into the chat array.
    users.push(req.user);
    // database query for creating groupchat.
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name, 
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });
      const fullGroupChat = await Chat.findOne({_id: groupChat._id})
      .populate("users", '-password')
      .populate('groupAdmin', '-password');

      res.status(200).send(fullGroupChat);
    } catch (error) {
       res.status(400);
       throw new Error(error.message);
    }
  }
});
//todo: renameGroup => chatGroupRoute
const renameGroup = ()=>{

}
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
};
