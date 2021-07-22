import {Message,MessageBox} from 'element-ui';
export default {
/**
 * 存储sessionStorage
 */
setSession(name, content){
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
},

/**
 * 获取sessionStorage
 */
getSession(name){
    if (!name) return;
    return window.sessionStorage.getItem(name);
},
/**
 * 存储localStorage
 */
setStore(name, content){
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
},

/**
 * 获取localStorage
 */
 getStore(name){
	if (!name) return;
	return window.localStorage.getItem(name);
},

/**
 * 删除localStorage
 */
removeStore(name){
	if (!name) return;
	window.localStorage.removeItem(name);
},
/**
 * 存储cookie
 */
setCookie(objName, objValue, objHours=30){
  var str = objName + "=" + escape(objValue);
  if (objHours != null) {
      var date = new Date();
      var ms = objHours * 3600 * 1000 * 24;
      date.setTime(date.getTime() + ms);
      str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
},

/**
 * 获取cookie
 */
getCookie(objName){
  var search = objName + "="  ;
  if (document.cookie.length > 0) {
    var offset = document.cookie.indexOf(search);
    if(offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if(end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(offset, end));
    }else {
        return '';
    }
  }
  return '';
},
/**
 * 删除cookie
 */
delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if(cval!=null){
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
},
/**
 * 删除所有cookie
 */
clearCookie(){
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
  }
},
  /*获取url参数*/
  getURLParam(paras) {
  var url = window.location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  var i, j;
  for (i = 0; j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if (returnValue && returnValue.indexOf('#') > -1) {
    returnValue = returnValue.split('#')[0];
  }
  if (typeof(returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
},
/**
     * 当前时间戳
     * @return <int>        unix时间戳(秒)
     */
    CurTime: function(){
        return Date.parse(new Date())/1000;
    },
    /**
     * 时间转时间戳
     * @param  string日期格式 Y-m-d H:i:s
     * @return <int>        unix时间戳(秒)
     */
    DateToUnix: function(string) {
        var f = string.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 3);
        return (new Date(
            parseInt(d[0], 10) || null,
            (parseInt(d[1], 10) || 1) - 1,
            parseInt(d[2], 10) || null,
            parseInt(t[0], 10) || null,
            parseInt(t[1], 10) || null,
            parseInt(t[2], 10) || null
        )).getTime() / 1000;
    },
    /**
     * 时间戳转时间
     * @param format  Y-m-d H:i:s
     * @param timestamp  时间戳
     */
    UnixToDate: function(format, timestamp) {
        var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
        var pad = function(n, c){
            if((n = n + "").length < c){
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {
            1:"st",
            2:"nd",
            3:"rd",
            21:"st",
            22:"nd",
            23:"rd",
            31:"st"
        };
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var f = {
            // Day
            d: function(){
                return pad(f.j(), 2)
            },
            D: function(){
                return f.l().substr(0,3)
            },
            j: function(){
                return jsdate.getDate()
            },
            l: function(){
                return txt_weekdays[f.w()]
            },
            N: function(){
                return f.w() + 1
            },
            S: function(){
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
            },
            w: function(){
                return jsdate.getDay()
            },
            z: function(){
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
            },

            // Week
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{
                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },

            // Month
            F: function(){
                return txt_months[f.n()]
            },
            m: function(){
                return pad(f.n(), 2)
            },
            M: function(){
                return f.F().substr(0,3)
            },
            n: function(){
                return jsdate.getMonth() + 1
            },
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },

            // Year
            L: function(){
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
            },
            //o not supported yet
            Y: function(){
                return jsdate.getFullYear()
            },
            y: function(){
                return (jsdate.getFullYear() + "").slice(2)
            },

            // Time
            a: function(){
                return jsdate.getHours() > 11 ? "pm" : "am"
            },
            A: function(){
                return f.a().toUpperCase()
            },
            B: function(){
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){
                return jsdate.getHours() % 12 || 12
            },
            G: function(){
                return jsdate.getHours()
            },
            h: function(){
                return pad(f.g(), 2)
            },
            H: function(){
                return pad(jsdate.getHours(), 2)
            },
            i: function(){
                return pad(jsdate.getMinutes(), 2)
            },
            s: function(){
                return pad(jsdate.getSeconds(), 2)
            },
            //u not supported yet

            // Timezone
            //e not supported yet
            //I not supported yet
            O: function(){
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                return t;
            },
            P: function(){
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2))
            },
            //T not supported yet
            //Z not supported yet

            // Full Date/Time
            c: function(){
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
            },
            //r not supported yet
            U: function(){
                return Math.round(jsdate.getTime()/1000)
            }
        };

        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
            if( t!=s ){
                // escaped
                var ret = s;
            } else if( f[s] ){
                // a date function exists
               var ret = f[s]();
            } else{
                // nothing special
               var ret = s;
            }
            return ret;
        });
    },
    /**
     * * 对Date的扩展，将 Date 转化为指定格式的String *
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 * 年(y)可以用 1-4
     * 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new Date()).pattern("yyyy-MM-dd
     * hh:mm:ss.S")==> 2006-07-02 08:09:04.423 (new Date()).pattern("yyyy-MM-dd
     * E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new Date()).pattern("yyyy-MM-dd
     * EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new Date()).pattern("yyyy-MM-dd
     * EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new Date()).pattern("yyyy-M-d
     * h:m:s.S") ==> 2006-7-2 8:9:4.18
     *
     * 案例 dateFormatStr("yyyy-MM-dd",new Date("2019-03-25"));
     */
    dateFormatStr(format,thisTime) {
        var  thisDate =  thisTime || new Date();

        var o = {
            "M+" : thisDate.getMonth()+1, //月份
            "d+" : thisDate.getDate(), //日
            "h+" : thisDate.getHours()%12 == 0 ? 12 : thisDate.getHours()%12, //小时
            "H+" : thisDate.getHours(), //小时
            "m+" : thisDate.getMinutes(), //分
            "s+" : thisDate.getSeconds(), //秒
            "q+" : Math.floor((thisDate.getMonth()+3)/3), //季度
            "S" : thisDate.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "日",
            "1" : "一",
            "2" : "二",
            "3" : "三",
            "4" : "四",
            "5" : "五",
            "6" : "六"
        };
        if(/(y+)/.test(format)){
            format=format.replace(RegExp.$1, (thisDate.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(format)){
            format=format.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[thisDate.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return format;
    },
    /**
     * 获取项目根路径
     */
    getRootPath() {
        if(process.env.NODE_ENV == 'production'){
            // 部署服务调用正式地址

            // 获取当前网址
            var curWwwPath = window.document.location.href;
            // 获取主机地址之后的目录
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            // 获取主机地址
            var localhostPaht = curWwwPath.substring(0, pos);
            // 获取带"/"的项目名
            var projectName = pathName
                .substring(0, pathName.substr(1).indexOf('/') + 1);
            return (localhostPaht + projectName);
        }else{
            // 开发测试地址development
        }

  },
    /************************************************************计算****************************************/
    /**
     *  金额
     * @param pnumber//数
     * @param decimals//小数
     * @returns {*}
     */
  format_number(pnumber, decimals) {
        if (isNaN(pnumber) || pnumber == '') {
            var snum = new String(0);
            var sec = snum.split('.');
            var whole = parseFloat(sec[0]);

            var dot;
            var dec = new String(whole);
            dec += '.';
            dot = dec.indexOf('.');
            while (dec.length <= dot + decimals) {
                dec += '0';
            }

            return dec;
        }

        var snum = new String(pnumber);
        var sec = snum.split('.');
        var whole = parseFloat(sec[0]);
        var result = '';
        if (sec.length > 1) {
            var dec = new String(sec[1]);
            dec = String(parseFloat(sec[1]) / Math.pow(10, (dec.length - decimals)));
            dec = String(whole + Math.round(parseFloat(dec)) / Math.pow(10, decimals));
            var dot = dec.indexOf('.');
            if (dot == - 1) {
                dec += '.';
                dot = dec.indexOf('.');
            }
            while (dec.length <= dot + decimals) {
                dec += '0';
            }
            result = dec;
        } else {
            var dot;
            var dec = new String(whole);
            dec += '.';
            dot = dec.indexOf('.');
            while (dec.length <= dot + decimals) {
                dec += '0';
            }
            result = dec;
        }
        return result;
    },
    /**
     *
     * @param value 当前对象
     * @param pos 最后保留几位小数
     * @param def 超出的默认值 必须为字符串类型
     * @param max 最大
     */
    validNum(value, pos, def, max) {
        var val = value.replace(/(^\s*)|(\s*$)/g, "");
        if (val == '') {
            value = '0';
            return;
        }
        if (!isNaN(val)) {
            var num = parseFloat(val);
            if (num > max) {
                value = def;
            } else {
                var _s1 = val.split('.') [0];
                var _ss = val.split('.') [1];
                if (_s1 == '') {
                    _s1 = '0';
                }
                value = _ss == undefined ? _s1 : _s1 + '.' + (_ss.length > pos ? _ss.substring(0, pos)  : _ss);
            }
        } else {
            if (val.indexOf('.') == 0) {
                if (val.length == 1) {
                    value = val;
                } else {
                    var _ss = val.split('.') [1];
                    if (_ss.length > pos) {
                        _ss = _ss.substring(0, pos);
                    }
                    value = parseInt(_ss, 10) != NaN ? def : '0' + val;
                }
            } else {
                value = def;
            }
        }
        var __val = value;
        var __arr = __val.split('.');
        var __len = __arr.length;
        if (__len == 1) {
            value = parseFloat(__arr[0]);
        } else {
            if (__len == 2) {
                if (__arr[0] != '') {
                    var __tStr = '';
                    if (__arr[1] && __arr[1] != undefined) {
                        __tStr = __arr[1];
                    }
                    value = parseInt(__arr[0]) + '.' + __tStr;
                }
            }
        }
        var patrn=/^(NaN)$/;
        if (patrn.test(value)) {
            value = def;
            return value;
        }

        return value;
    },
  /************************************************************原生交互方法****************************************/
  /**
   * 打开一个新的webView
   * @param url 页面的链接  相对路径
   * @returns {null}
   */
  apppageNewtab(url){
      if(process.env.NODE_ENV == 'production'){// 部署服务调用正式地址 this.mobileOrdinary(this.getRootPath()+"/webpage/healthReport/"+url);

          if(this.isNulMethods(typeof apppage) && this.isNulMethods(typeof apppage.newtab)){
              apppage.newtab(this.getRootPath()+"/webpage/healthReport/"+url);
          }else{
              window.location.href=this.getRootPath()+"/webpage/mall/personalc_update.html?app=02";
          }
      }else{// 开发测试地址development
          window.location.href=url;
      }
  },
  apppageTitle(title){
    window.document.title = title;
     // if(process.env.NODE_ENV === 'production'){// 部署服务调用正式地址
         try{
           apppage.title(title);
         } catch (err){
          // alert('请升级和信康版本')
         }
   //   }
  },
   /**
     *
     * @param text  文字
     * @param img   图片类型
     * @param callback  回调
   */
  apppageAction(text,img,callback){
       //if(process.env.NODE_ENV === 'production'){// 部署服务调用正式地址
            try{
                apppage.action(text,img,callback);
            } catch (err){
            }
     //   }

  },
  /**
  * 清除浏览记录
  */
  apppageHome(){
        try{
            apppage.home();
        } catch (err){
        }
  },
  /**
   * 获取客户端PadId
  */
  apppagePadId(){
        try{
            return uji.getStringPadId();
        } catch (err){
        }
  },
/******************************************************************************************* 用户信息 ***********************************************************************************************/
    /**
     * 登录信息
     * @returns {any}
     */
    userInfo(){
        var userInfo=this.getSession("userInfo");
        return JSON.parse(userInfo);
    },
/*******************************************************************************************弹框***********************************************************************************************/
/**
 * 原生javascript实现extend
 */
extend() {
    var length = arguments.length;
    var target = arguments[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
    }
    if (length == 1) {
        target = this;
        i--;
    }
    for (var i = 1; i < length; i++) {
        var source = arguments[i];
        for (var key in source) {
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
},
 /**************************************************************************定义一个可静态调用方法的js类 验证*******************************************************/
  //检测字符串是否是特殊字符
 clearString(string){
  var pattern = new RegExp("[`~!@#$^&*()%=|{}':;',\\+[\\].<>/?~！@#￥…&*（）&;|{}【】‘；：.”“'。、？\"\/|!|#|$|%|&|\(|\)|\*|+|,|\-|.|:|<|>|\?|@|\/|\"|\'|\\|\[|\]|\^|`|\{|\=|\;|\||\}]ig")
  return pattern.test(string);
 },

 // 去除前后空格
 trim(str){
   return str.replace(/(^\s*)|(\s*$)/g, "");
 },
//校验是否全是数字
isDigit (str) {
    var patrn=/^\d+$/;
    return patrn.test(str);
},
//校验是否是整数
isInteger (str) {
    var patrn=/^([+-]?)(\d+)$/;
    return patrn.test(str);
},
//校验是否为正整数
isPlusInteger (str) {
    var patrn=/^[0-9]*[1-9][0-9]*$/;
    return patrn.test(str);
},
//校验是否为负整数
isMinusInteger (str) {
    var patrn=/^-(\d+)$/;
    return patrn.test(str);
},
//校验是否为浮点数
isFloat(str){
    var patrn=/^([+-]?)\d*\.\d+$/;
    return patrn.test(str);
},
//校验是否为正浮点数
isPlusFloat(str){
    var patrn=/^(?:[1-9][0-9]*\.[0-9]+|0\.(?!0+$)[0-9]+)$/;
    return patrn.test(str);
},
//校验是否为负浮点数
isMinusFloat(str){
    var patrn=/^-\d*\.\d+$/;
    return patrn.test(str);
},
//校验是否仅中文
isChinese(str){
    var patrn=/[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
    return patrn.test(str);
},
//校验是否仅ACSII字符
isAcsii(str){
    var patrn=/^[\x00-\xFF]+$/;
    return patrn.test(str);
},
//校验手机号码
isMobile (str) {
    var patrn = /^1[3-9][0-9]{9}$/;
    return patrn.test(str);
},
//校验电话号码
isPhone (str) {
    var patrn = /^(0[\d]{2,3}-?)\d{6,8}(-?\d{3,4})?$/;
    return patrn.test(str);
},
//校验URL地址
isUrl(str){
    var patrn= /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
    return patrn.test(str);
},
//校验电邮地址
isEmail (str) {
    var patrn = /^[\w-]+@[\w-]+(\.[\w-]+)+$/;
    return patrn.test(str);
},
//校验邮编
isZipCode (str) {
    var patrn = /^\d{6}$/;
    return patrn.test(str);
},

//校验合法时间
isDate (str) {
    if(!/\d{4}(\.|\/|\-)\d{1,2}(\.|\/|\-)\d{1,2}/.test(str)){
        return false;
    }
    var r = str.match(/\d{1,4}/g);
    if(r==null){return false;};
    var d= new Date(r[0], r[1]-1, r[2]);
    return (d.getFullYear()==r[0]&&(d.getMonth()+1)==r[1]&&d.getDate()==r[2]);
},
//校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
isString6_20(str){
    var patrn=/^(\w){6,20}$/;
    return patrn.test(str);
},
//校验字符串组合：只能输入6-20个字母+数字或下划线组合(常用手校验用户名和密码)
isStringA6_20(str){
    var patrn=/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i; /*用户名正则*/
    return patrn.test(str);
},
//身份证格式
isCreditCard(str){
    var patrn=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    return patrn.test(str);
},

//输入是否全为空
isRegAir(str) {
	return str.split(" ").join("").length
},

//是否为空
isNulCustl(str){
    if(str==null || str=='' || str==undefined){
        return true;
    }else if(typeof(str)=="undefined"){
        return true;
    }else if(str == "undefined"){
        return true;
    }else{
        return false;
    }
},
    //方法是否为空
    isNulMethods(methods){
        if(methods != 'undefined' && methods == "object"){
            return true;
        }
        if(methods != 'undefined' && methods == "function"){
            return true;
        }else{
            return false;
        }
    },
    /**
     *  判断某个元素是否在于数组里
     * @param arr 数组
     * @param value  值
     * @returns {boolean}
     */
    isInArray(arr,value){

        for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
    },
/***************************************************************************滚动条计算*******************************************************/
    /**
     *
     * @param y  设置滚动条的位置
     * @param mescrollId   滑动区域是否为body
     */
    setScrollTop(y,mescrollId) {
            var isScrollBody = (!mescrollId || mescrollId == "body"); //滑动区域是否为body
            var scrollDom = isScrollBody ? document.body : document.getElementById(mescrollId); //MeScroll的滑动区域
            if(isScrollBody) {
                document.documentElement.scrollTop = y;
                document.body.scrollTop = y;
            } else {
                scrollDom.scrollTop = y;
            }
     },
    /**
     *
     * @param mescrollId 滑动区域
     * @returns {*}
     */
     getScrollTop(mescrollId) {
         var isScrollBody = (!mescrollId || mescrollId == "body"); //滑动区域是否为body
         var scrollDom = isScrollBody ? document.body : document.getElementById(mescrollId); //MeScroll的滑动区域

        if(isScrollBody) {
            return document.documentElement.scrollTop || document.body.scrollTop;
        } else {
            if(scrollDom){
                return scrollDom.offsetTop;
           }

        }
    },

  /**
   * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
   * @param func 执行函数
   * @param wait 时间间隔
   * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
   *                如果你想禁用最后一次执行的话，传递{trailing: false}
   * @returns {Function}
   */
  throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      let now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },
  /**
   * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
   * @param func 执行函数
   * @param wait 时间间隔
   * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
   * @returns {Function}
   */
  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    let later = function() {
      let last = new Date().getTime() - timestamp; // timestamp会实时更新

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = new Date().getTime();
      let callNow = immediate && !timeout;

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  },
   /**
   * 顶部弹框
   * alertOption 统一设置
   */
  alertOption(msg,type){
      Message({
        message:msg,
        type:type || 'success',
        duration:1500,
        showClose: true, //显示关闭按钮
      })
  },
// 成功顶部弹框
  alertSuccess(msg){
    this.alertOption(msg,'success')
  },
//   警告
  alertWarning(msg){
    this.alertOption(msg,'warning')
  },
//   消息
  alertInfo(msg){
    this.alertOption(msg,'info')
  },
//   错误
  alertRrr(msg){
    this.alertOption(msg,'error')
  },
  messageBox(msg,title = '提示',callback){
    MessageBox.confirm(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback &&callback()
      }).catch(() => {});
}

}
