const models = require('../models');

module.exports = {
    joinsuccess: function(req, res){
        res.render('user/joinsuccess');
    },
    join: function(req, res){
        res.render('user/join');
    },
    _join: async function(req, res, next){
        try {
            await models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender
            });
            res.redirect('/user/joinsuccess');
        } catch(err) {
            next(err);
        }
    },
    login: function(req, res, next){
        try {
            res.render('user/login');
        } catch(e) {
            next(e);
        }
    },
    _login: async function(req, res){
        const user = await models.User.findOne({
            attributes: ['no', 'name', 'email', 'password', 'role', 'gender'],
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        if(user == null){
            res.render('user/login', Object.assign(req.body, {
                result: 'fail',
                password: ''
            }));

            return;
        }

        // 로그인 처리
        req.session.authUser = user;
        res.redirect('/');
    },
    logout: async function(req, res, next){
        try {
            // 로그아웃
            await req.session.destroy();
            res.redirect("/");
        } catch(e) {
            next(e);
        }
    },
    update: async function(req, res, next){
        try {
            const user= await models.User.findOne({
                attributes: ['no', 'email', 'name', 'gender'],
                where: {
                    no: req.session.authUser.no
                }
            });
            res.render("user/update", { user });
        } catch(e) {
            next(e);
        }
    },
    _update: async function(req, res, next){
        const {[req.body.password == '' ? 'password' : '']: remove, ...updateObject} = req.body;
        const result = await models.User.update(updateObject, {
            where: {
                no: req.session.authUser.no    
            }
        }).then(result => {
            res.redirect('/');
        }).catch(err => {
            // err.name, err.message, err.stack
            // logger.error(err.stack);
            console.error(err);
            next(err);
        });
    }
}
