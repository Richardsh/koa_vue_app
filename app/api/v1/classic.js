const Router = require('koa-router')
const router = new Router()

const { IntegerValidator } = require('../../validators/validator')

//const {HttpException} = require("../../../core/http-exception")

router.get('/v1/:id/classic/latest', (ctx, next) => {
	//const path = ctx.params;
	//const query = ctx.request.query;
	// const header = ctx.request.header;
	// const body = ctx.request.body;
	//console.log('query',query)

	const v = new IntegerValidator().validate(ctx);
	const id = v.get('path.id',parsed=false)
	console.log(id)
	// if(true){
	// 	const error = new global.errs.ParameterHttpException('没传参数',10001,400);
	// 	//const error = new Error('没传参数')
	// 	// error.errorCode = 10001
	// 	// error.status = 400
	// 	//error.requestUrl = `${ctx.method} ${ctx.path}`
	// 	throw error
	// }
	ctx.body = {
		key: 'classic_new'
	}
})

module.exports = router;