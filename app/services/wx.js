const util = require('util')
const axios = require('axios')

const {User} = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {
  // code 小程序生成
  // openid 唯一标识
  // code
  // appid appsecret
  // url
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)

    const result = await axios.get(url)
    if (result.status !== 200) {
        throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if (errcode){
        throw new global.errs.AuthFailed('openid获取失败:'+errmsg)
    }
    // openid
    // 档案 user uid openid 长
    // openid 

    let user = await User.getUserByOpenid(result.data.openid)
    if(!user){
        user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }

}

module.exports = {
    WXManager
}