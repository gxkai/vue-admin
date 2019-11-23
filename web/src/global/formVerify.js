/**
 * Created by 张强 on 2018/7/9.
 */
import elementUIVerify from 'element-ui-verify'
export default {
  install (Vue) {
    Vue.use(elementUIVerify, {
      errorMessageTemplate: {
        empty: '{alias}不能为空',
        length: '{alias}的长度必须为{length}',
        maxLength: '{alias}的长度不能超过{maxLength}',
        minLength: '{alias}的长度不能少于{minLength}',
        number: '{alias}必须为数字',
        int: '{alias}必须为整数',
        lt: '{alias}必须为小于{lt}的数字',
        lte: '{alias}必须为不大于{lte}的数字',
        gt: '{alias}必须为大于{gt}的数字',
        gte: '{alias}必须为不小于{gte}的数字',
        maxDecimalLength: '{alias}必须为小数位不大于{maxDecimalLength}的数字',
        phone: '{alias}必须为正确的手机号',
        email: '{alias}必须为正确的邮箱',
        verifyCode: '{alias}必须为正确的验证码'
      }
    })
    // 增加自定义校验规则
    // https://github.com/aweiu/element-ui-verify
    // 最大长度
    elementUIVerify.addRule('maxLength', (maxLength) => ({
      validator (rule, val, callback) {
        if ((val + '').length > maxLength) {
          const errorMessage = elementUIVerify.getErrorMessage('maxLength', maxLength)
          callback(Error(errorMessage))
        } else {
          callback()
        }
      }
    }))
  }
}
