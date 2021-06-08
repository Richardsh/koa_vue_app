const Router = require('koa-router')
const router = new Router({
	prefix:'/v1/classic'
})

const { IntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

//const {HttpException} = require("../../../core/http-exception")

router.get('/latest', new Auth().m, async (ctx, next) => {
	//const path = ctx.params;
	//const query = ctx.request.query;
	// const header = ctx.request.header;
	// const body = ctx.request.body;
	//console.log('query',query)

	// const v = await new IntegerValidator().validate(ctx);
	// const id = v.get('path.id',parsed=false)
	// console.log(id)
	// if(true){
	// 	const error = new global.errs.ParameterHttpException('没传参数',10001,400);
	// 	//const error = new Error('没传参数')
	// 	// error.errorCode = 10001
	// 	// error.status = 400
	// 	//error.requestUrl = `${ctx.method} ${ctx.path}`
	// 	throw error
	// }
	ctx.body = ctx.auth.uid;
})

module.exports = router;