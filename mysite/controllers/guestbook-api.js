const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    create: async function(req, res, next){
        console.log(req.body);
        // sql insert
        try {
            const result = await models.Guestbook.create(req.body);
            res.send({
                result: 'success',
                data: result
            });
        } catch(e) {
            next(e);
        }
    },
    read: async function(req, res, next){
        // sql: select... limit;
        const results = await models.Guestbook.findAll({
            attributes: ['no', 'name', 'password', 'message', 'regDate'],
            order: [
                ['no', 'DESC']
            ],
            limit: 5
        });
        res.send({
            result: 'success',
            data: results
        });
    },
    readScroll: async function(req, res, next){
        const startNo = req.body.sno || 0;
        // sql: select... limit;
        const results = await models.Guestbook.findAll({
            attributes: ['no', 'name', 'password', 'message', 'regDate'],
            where: {no: {[Op.lt]: startNo}},
            order: [
                ['no', 'DESC']
            ],
            limit: 5
        });
        res.send({
            result: 'success',
            data: results
        });
    },
    delete: async function(req, res, next){
        console.log(req.params.no + ":" + req.body.password);
        // sql delete
        const result = await models.Guestbook.destroy({
            where: {
                no: req.params.no,
                password: req.body.password
             }
        }).then(result => {
            if(result != ''){
                res.send({
                    result: 'success',
                    data: req.params.no
                });
            } else {
                res.send({
                    result: 'fail'
                });
            }
         }).catch(e => {
            next(e);
        });
    }
}