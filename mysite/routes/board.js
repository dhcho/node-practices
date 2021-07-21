const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/board');

const router = express.Router();
router.route("/").get(controller.index);
router.route("/list/:pageNo").get(controller.list);
router.route("/search").post(controller.list);
router.route("/write").get(authorized(), controller.write);
router.route("/write").post(authorized(), controller._write);
router.route("/writereply/:groupNo").get(authorized(), controller.writeReply);
router.route("/writereply").post(authorized(), controller._writeReply);
router.route("/view/:no").get(controller.view);
router.route("/modify/:no").get(authorized(), controller.modify);
router.route("/modify/:no").post(authorized(), controller._modify);
router.route("/delete/:no").get(authorized(), controller.delete);

module.exports = router;