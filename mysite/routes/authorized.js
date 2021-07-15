module.exports = function(req, res, next){
    if(req.session.authUser == null){
        next();
        return;
    }

    if(req.accepts('html')){
        next();
        return;
    }

    res.send({
        result: "fail",
        data: null,
        message: "auth failed"
    })
}