const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    // 入口
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }
  static loadConfig(path='') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath)
    global.config = config

  }
  static initLoadRouters() {
    const rootApi = `${process.cwd()}/app/api`;
    requireDirectory(module, rootApi, {visit:whenLoadModule});
    function whenLoadModule(obj) {
        if(obj instanceof Router){
          InitManager.app.use(obj.routes())
        }
    }
  }
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager;