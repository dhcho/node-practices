const models = require('../models');

module.exports = {
    index: async function(req, res){
        const results = await models.Guestbook.findAll({
            attributes: ['no', 'name', 'password', 'message', 'regDate'],
            order: [
                ['no', 'DESC']
            ]
        });
        res.render('guestbook/index', {
            list: results || []
        });
    },
    add: async function(req, res){
        const result = await models.Guestbook.create({
            name: req.body.name,
            password: req.body.password,
            message: req.body.message,
            regDate: new Date()
        });
        res.redirect('/guestbook');
    },
    delete: function(req, res){
        res.render('guestbook/delete', {
            no: req.params.no || 0
        });
    },
    _delete: async function(req, res){
        const result = await models.Guestbook.destroy(
            {where: {
                no: req.body.no,
                password: req.body.password
            }
        }).then(result => {
            res.redirect('/guestbook');
        }).catch(err => {
            console.error(err);
        });
    }
}