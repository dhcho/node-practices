const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/admin');

const router = express.Router();
router.route('/').get(authorized('ADMIN'), controller.index);
router.route('/update').post(authorized('ADMIN'), controller.update);

module.exports = router;