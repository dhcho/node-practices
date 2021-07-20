const models = require('../models');
const moment = require('moment');
const sequelize = require('sequelize');

module.exports = {
    list: async function(req, res, next){
        try{
            const startPage = 1;
            const onePageCnt = 10;
            const results = await models.Board.findAll({
                attributes: ['no', 'title', 'contents', 'regDate', 'hit', 'groupNo', 'orderNo', 'depth'],
                order: [
                    ['no', 'DESC']
                ],
                include: {
                    model: models.User,
                    attributes: ['no', 'name'],
                    required: true // DB Table Inner join
                },
                offset: startPage,
                limit: onePageCnt
            });
            let count = await models.Board.count();
            count = Math.ceil(count/onePageCnt);

            res.render('board/list', {
                list: results,
                count: count,
                moment: moment
            });
        } catch(e) {
            next(e);
        }
    },
    write: function(req, res){
        res.render('board/write');
    },
    _write: async function(req, res, next){
        const result = await models.Board.create(
        {
                title: req.body.title,
                contents: req.body.content,
                hit: 0,
                groupNo: 0,
                orderNo: 0,
                depth: 0,
                userNo: req.session.authUser.no
        }).then(result => {
            res.redirect('/board');
        }).catch(e => {
            next(e);
        });
    },
    view: async function(req, res, next){
        try{
            const no = req.params.no;

            const results = await models.Board.findOne({
                attributes: ['no', 'title', 'contents', 'groupNo'],
                where: {no: req.params.no},
            });

            const result = await models.Board.update(
                {hit: sequelize.literal('hit + 1')}, {
                where: {no: req.params.no}  
            });

            res.render('board/view', {
                listDetail: results
            });
        } catch(e) {
            next(e);
        }
    },
    modify: async function(req, res, next){
        try {
            const listDetail= await models.Board.findOne({
                attributes: ['no', 'title', 'contents'],
                where: {
                    no: req.params.no
                }
            });
            res.render("board/modify", { listDetail });
        } catch(e) {
            next(e);
        }
    },
    _modify: async function(req, res, next){
        const result = await models.Board.update(
            { title: req.body.title, 
              contents: req.body.contents}, 
            {
            where: {
                no: req.params.no   
            }
        }).then(result => {
            res.redirect('/board');
        }).catch(err => {
            next(err);
        });
    },
    delete: async function(req, res, next){
        const result = await models.Board.destroy(
        {
            where: {
                no: req.params.no
            }
        }).then(result => {
            res.redirect('/board');
        }).catch(e => {
            next(e);
        });
    }
}