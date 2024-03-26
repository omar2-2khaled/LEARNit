const express = require('express');
const auth = require('../auth/authController');
const router = express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);


router.post('/forgetPassword', auth.forgetPassword);
router.patch('/resetpassword/:token', auth.resetPassword);
module.exports = router;
