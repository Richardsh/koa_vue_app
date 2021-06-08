const bcrypt = require('bcryptjs');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(!user){
      throw new global.errs.AuthFailed('账号不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if(!correct){
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user;
  }

  static async getUserByOpenid(openid){
    const user = await User.findOne({
      where:{
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  // 主键，关系型数据库
  // 主键，不能重复 不能为空
  // 自动增长id编号 1 2 3
  // 并发 很多人注册
  // 安全问题 会暴露用户编号
  // 接口保护权限访问接口 token
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type:Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      // 明文， 加密不同， 彩虹攻击
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password',psw);
    }
  },
  openid: {
    type:Sequelize.STRING(64),
    unique: true
  }
}, {sequelize, tableName: 'user'})

module.exports = { User }