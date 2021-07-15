const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/user-api');

const router = express.Router();
router.route("/checkemail").get(controller.checkemail);

router.route("/needauth").get(auth, function(res, req){
    res.send({
        result: "success"
    })
});

module.exports = router;