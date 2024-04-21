const express = require('express');
const auth = require('../auth/authController');
const router = express.Router();

router.route('/')
    .get()
    .post()

router.route('/:id')
    .patch()
    .delete()
