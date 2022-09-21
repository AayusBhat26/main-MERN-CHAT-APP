const express = require('express');
const router =express.Router();
const {registerUser, authUser, allUsers} = require('../controllers/userControllers')


// search user.
router.route("/").post(registerUser).get(allUsers)


router.post('/login',authUser);



// router.route('/').get(
//       allUsers
// )
module.exports = router;