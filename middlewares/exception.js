const { HttpException } = require("../core/http-exception");
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    let test = 3 < 1
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment==='dev';
    if(isDev && !isHttpException){
      throw error;
    }
    if(isHttpException){
      console.log('isHttpException')
      ctx.body = {
        msg:error.msg,
        error_code:error.errorCode,
        request:`${ctx.method} ${ctx.path}`
      }
    }else {
      ctx.body = {
        msg: 'it is a mistake',
        error_code:999,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError;