const express = require('express');
const controller = require('../controllers/guestbook-api');

const router = express.Router();
router.route('').get(controller.read);
router.route('').post(controller.readScroll);
router.route('/delete/:no').delete(controller.delete);
router.route('/add').post(controller.create);

module.exports = router;