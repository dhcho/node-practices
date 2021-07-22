const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/admin');
const guestbookController = require('../controllers/admin/guestbook');
const boardController = require('../controllers/admin/board');
const userController = require('../controllers/admin/user');

const router = express.Router();
router.route('/').get(authorized('ADMIN'), controller.index);
router.route('/update').post(authorized('ADMIN'), controller.update);

router.route('/user').get(userController.index);
router.route('/board').get(boardController.index);
router.route('/guestbook').get(guestbookController.index);

module.exports = router;