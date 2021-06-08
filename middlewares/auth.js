const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }

  get m() {
    return async (ctx, next) => {
      // token 检测
      // token 开发者 传递令牌
      // 三种方式：token body header
      // http 规定身份验证机制 HttpBasicAuth
      let errMsg = 'token不合法'
      const userToken = basicAuth(ctx.req)
      if(!userToken || !userToken.name){
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      }catch(error){
        if(error.name === 'TokenExpiredError'){
          errMsg = 'token令牌已过期'
        }
        throw new global.errs.Forbidden(errMsg)
      }

      if(decode.scope < this.level){
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }

      //ctx.body = token
      const {uid, scope} = decode;
      ctx.auth = {
        uid,
        scope
      }
      await next();
    }
  }

  static verifyToken(token){
    try{
        jwt.verify(token, 
            global.config.security.secretKey)
        return true
    }
    catch (error){
        return false
    }
  }
}

module.exports = {
  Auth
}