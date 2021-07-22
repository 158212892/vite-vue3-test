/**
 * @author ymz
 * @date 2021/4/9
 * @Description: 校验公共方法
 */
import regular from "./regular"

let FormValidate = (function () {
  function FormValidate () {}
  /** From表单验证规则  可用于公用的校验部分 */
  FormValidate.Form = function () {
    return {
      // 金额的验证规则   不必填   填了验证
      validateIsMoney (rule, value, callback) {
        if(value){
          if(!regular.packing.money.test(value)){
            callback(new Error("请输入正确"))
          }
          callback();
        }
      },

    }
  }

  return FormValidate
}())

exports.FormValidate = FormValidate

