const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User  = require('../models/userModel')
const registerUser = asyncHandler(async(req, res)=>{
  const { name, email, password, pic } = req.body;
  if(!name||!email||!password){
      res.status(404);
      throw new Error('Please Enter All the Fields');
  }
  const userExists = await User.findOne({
      email
  });
  if(userExists){
      res.status(400);
      throw new Error('User already exists');
  }
  else{
      const user = await User.create({
            name, email, password, pic
      })
      if(user){
            res.status(201).json( {
                  _id: user._id, 
                  name: user.name,
                  email: user.email, 
                  pic: user.pic,
                  token: generateToken(user._id),
            })
      }
      else{
            res.status(400);
            throw new Error('Failed to Create an User.')
      }
  }
})


const authUser = asyncHandler(async(req, res)=>{
      const {email, password} = req.body

      const user = await User.findOne({
            email
      })
      if(user &&(await user.matchPassword(password)) ){
            res.json({
                  _id: user._id,
                  name: user.name,
                  email: user.email, 
                  pic: user.pic, 
                  token: generateToken(user._id),
            })
      }
      else{
            res.status(400);
            throw new Error('Invalid Email or Password');
      }
});



// search user.
// in order to use the ,post request we need to use posr request, thats why  i will use queries here
// for exmaple: /api/user?search=someuser
const allUsers = asyncHandler(async(req,res)=>{
      const keyword  = req.query
})

module.exports = {
  registerUser,
  authUser,
  allUsers,
};
