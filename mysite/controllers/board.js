const models = require('../models');
const moment = require('moment');
const sequelize = require('sequelize');

module.exports = {
    index: async function(req, res, next){
        try{
            const startPage = 0;
            const onePageCnt = 10;
            const results = await models.Board.findAll({
                attributes: ['no', 'title', 'contents', 'regDate', 'hit', 'groupNo', 'orderNo', 'depth'],
                order: [
                    ['groupNo', 'DESC'],
                    ['order_no', 'ASC']
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
            let pageCount = Math.ceil(count/onePageCnt);

            res.render('board/list', {
                list: results,
                pageCount: pageCount,
                moment: moment
            });
        } catch(e) {
            next(e);
        }
    },
    list: async function(req, res, next){
        try{
            const Op = sequelize.Op;

            let kwd = req.body.kwd || '';
            let page = req.params.pageNo || 1;
            let startPage = 1;
            const onePageCnt = 10;
            startPage = (page - 1) * onePageCnt;

            const results = await models.Board.findAll({
                attributes: ['no', 'title', 'contents', 'regDate', 'hit', 'groupNo', 'orderNo', 'depth'],
                where:{
                    title: {
                        [Op.like]: "%" + kwd + "%"
                    }
                },
                order: [
                    ['groupNo', 'DESC'],
                    ['order_no', 'ASC']
                ],
                include: {
                    model: models.User,
                    attributes: ['no', 'name'],
                    required: true // DB Table Inner join
                },
                offset: startPage,
                limit: onePageCnt
            });
            let count = await models.Board.count({
                where:{
                    title: {
                        [Op.like]: "%" + kwd + "%"
                    }
                }
            });
            let pageCount = Math.ceil(count/onePageCnt);

            res.render('board/list', {
                list: results,
                pageCount: pageCount,
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
        });
            
        const data = await models.Board.update(
            {groupNo: result.no}, {
            where: {no: result.no}  
        });

        res.redirect('/board');
    },
    writeReply: function(req, res){
        res.render('board/writereply', {
            groupNo: req.params.groupNo
        });
    },
    _writeReply: async function(req, res, next){
        try{
            const data = await models.Board.findOne({
                attributes: ['orderNo', 'depth'],
                where: {no: req.body.groupNo}
            });

            const result = await models.Board.create(
            {
                    title: req.body.title,
                    contents: req.body.content,
                    hit: 0,
                    groupNo: req.body.groupNo,
                    orderNo: data.orderNo + 1,
                    depth: data.depth + 1,
                    userNo: req.session.authUser.no
            }).then(result => {
                res.redirect('/board');
            }).catch(e => {
                next(e);
            });
        } catch(e) {
            next(e);
        }
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