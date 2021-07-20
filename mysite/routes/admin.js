const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/admin');

const router = express.Router();
router.route('').get(controller.index);
router.route('/upload').post(authorized('ADMIN'), controller.upload);
router.route('/delete/:no').get(authorized('ADMIN'), controller.delete);

module.exports = router;