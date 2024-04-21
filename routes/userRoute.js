const express = require('express');
const auth = require('../auth/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);

router.use(auth.protect);
router.post('/forgetPassword', auth.forgetPassword);
router.patch('/resetpassword/:token', auth.resetPassword);

router.get('/me', userController.getUser);
router.patch('/updateMe', userController.getMe, userController.updateMe);
router.patch('/deleteMe', userController.getMe, userController.deleteMe);
router.patch('/updatePassword', userController.getMe, auth.updatePassword);

router.use(auth.restrictedTo('admin'));

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
