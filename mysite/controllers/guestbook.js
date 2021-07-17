const models = require('../models');
const moment = require('moment');

module.exports = {
    index: async function(req, res, next){
        try{
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'password', 'message', 'regDate'],
                order: [
                    ['no', 'DESC']
                ]
            });
            res.render('guestbook/index', {
                guestbooks: results,
                moment: moment
            });
        } catch(e) {
            next(e);
        }
    },
    delete: function(req, res){
        res.render('guestbook/delete', {
            no: req.params.no || 0
        });
    },
    _delete: async function(req, res, next){
        const result = await models.Guestbook.destroy(
        {
            where: {
                no: req.body.no,
                password: req.body.password
            }
        }).then(result => {
            res.redirect('/guestbook');
        }).catch(e => {
            next(e);
        });
    },
    add: async function(req, res, next){
        try {
            await models.Guestbook.create(req.body);
            res.redirect('/guestbook');
        } catch(e) {
            next(e);
        }
    },
    spa: async function(req, res, next){
        try{
            res.render('guestbook/spa-rending');
        } catch(e) {
            next(e);
        }
    }
}