const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password, {
  dialect: 'mysql',
  host,
  port,
  define: {
    // create_time update_time 
    timestamps: true,
    paranoid: true, //delete_time
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    undercored: true
  }
})
//force 在生产环境一定要改成false
sequelize.sync({
  force: true
});

module.exports = {
  sequelize
}