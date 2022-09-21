const express = require('express');
const router =express.Router();
const {registerUser, authUser, allUsers} = require('../controllers/userControllers');
const {protectAuth} = require('../middleware/authMiddlewear');


// search user.
router.route("/").post(registerUser).get(protectAuth,allUsers)


router.post('/login',authUser);


// router.route('/').get(
//       allUsers
// )
module.exports = router;