const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize){
    const SiteModule = sequelize.define('Site', {
        title: {
            field: 'title',
            type: DataTypes.STRING(50),
            allowNull: true
        },
        welcome: {
            field: 'welcome',
            type: DataTypes.STRING(200),
            allowNull: true
        },
        profile: {
            field: 'profile',
            type: DataTypes.STRING(200),
            allowNull: true
        },
        description: {
            field: 'description',
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        tableName: 'site'
    });

    SiteModule.removeAttribute('id');
    return SiteModule;
}