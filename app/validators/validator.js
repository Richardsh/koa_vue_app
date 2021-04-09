const { LinValidator, Rule } = require('../../core/lin-validator')
class IntegerValidator extends LinValidator {
  constructor(){
    super()
    this.id = [
      new Rule('isInt', '请输入正整数', { min:1 })
    ]
  }
}
module.exports = {
  IntegerValidator
}