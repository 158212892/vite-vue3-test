/** 金额 */
export let money = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
/** 联系人电话 */
export let phone = /^1[3456789]\d{9}$/
/** 编号 */
export let number = /^[\w+-]*$/;
/** 税率 */
export let tarRate =/^(100|[1-9]?\d(\.\d\d)?)%$|0$/;
/** 手机号 */
export let mobilePhone =/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
/** 分机号 */
export let extensionSet =/(0\d{2,3}-)?\d{7,8}/;
/** 邮政编码 */
export let zipCode =/^[1-9][0-9]{5}$/;


