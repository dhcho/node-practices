const fs = require('fs');
const path = require('path');
const models = require('../models');

module.exports = {
    index: async function(req, res, next){
        try {
            const result = await models.Site.findOne({
                attribute: ['title', 'welcome', 'profile', 'description']
            });
            res.render('admin/main', {
                site: result
            });
        } catch(err) {
            next(err);
        }
    },
    update: async function(req, res, next){
        try {
            const file = req.file;
            const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.UPLOADIMAGE_STORE_LOCATION);
            const url = path.join(process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + path.extname(file.originalname);
            const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);

            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: 'w+'});

            const result = await models.Site.findOne({
                attribute: ['title', 'welcome', 'profile', 'description']
            });

            await models.Site.update({
                title: req.body.title || result.title,
                welcome: req.body.welcome || result.welcome,
                profile: url.replace(/\\/gi, '/') || result.profile,
                description: req.body.description || result.description
            }, {
                where: {
                }
            });

            res.redirect('/admin');
        } catch(err) {
            next(err);
        }
    }
}