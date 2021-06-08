const Router = require('koa-router')
const {RegisterValidator} = require("../../validators/validator")
const {User} = require("../../models/user")
const router = new Router({
  prefix:'/v1/user'
})

// 注册 新增 post 更新 put 查询 get 删除 delete

router.post('/register', async (ctx) => {
  // 思维路径: 接受参数 LinValidator
  const path = ctx.params;
	// const query = ctx.request.query;
	// const header = ctx.request.header;
  // const body = ctx.request.body;
  console.log('path',path)
	//console.log('query',query)
  const v = await new RegisterValidator().validate(ctx);
  const user = {
    email:v.get('body.email'),
    password:v.get('body.password2'),
    nickname:v.get('body.nickname'),
  }
  const r = await User.create(user)
  throw new global.errs.Success();
})

module.exports = router;