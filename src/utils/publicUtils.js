/**
 * 通用js方法封装处理
 * Copyright (c) 2019 krd
 */


// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}


// 添加日期范围
export function addDateRange(params, dateRange, propName) {
	var search = params;
	search.params = {};
	if (null != dateRange && '' != dateRange) {
		if (typeof (propName) === "undefined") {
			search.params["beginTime"] = dateRange[0];
			search.params["endTime"] = dateRange[1];
		} else {
			search.params[propName + "BeginTime"] = dateRange[0];
			search.params[propName + "EndTime"] = dateRange[1];
		}
	}
	return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return true;
		}
	})
	return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
		Object.keys(datas).some((key) => {
			if (datas[key].dictValue == ('' + temp[val])) {
				actions.push(datas[key].dictLabel + currentSeparator);
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}



// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments,
		flag = true,
		i = 1;
	str = str.replace(/%s/g, function () {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return "";
	}
	return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || Math.min.apply(Math, data.map(item => {
		return item[parentId]
	})) || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData = cloneData.filter(father => {
		let branchArr = cloneData.filter(child => {
			//返回每一项的子级数组
			return father[id] === child[parentId]
		});
		branchArr.length > 0 ? father.children = branchArr : '';
		//返回第一层
		return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}


/**
 * 深度克隆
 * @param {*} obj 数据源
 */
export function deepClone(obj, cache = []) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	const objType = Object.prototype.toString.call(obj).slice(8, -1);

	// 考虑 正则对象的copy
	if (objType === 'RegExp') {
		return new RegExp(obj);
	}

	// 考虑 Date 实例 copy
	if (objType === 'Date') {
		return new Date(obj);
	}

	// 考虑 Error 实例 copy
	if (objType === 'Error') {
		return new Error(obj);
	}

	const hit = cache.filter((c) => c.original === obj)[0];

	if (hit) {
		return hit.copy;
	}

	const copy = Array.isArray(obj) ? [] : {};

	cache.push({
		original: obj,
		copy
	});

	Object.keys(obj).forEach((key) => {
		copy[key] = deepClone(obj[key], cache);
	});

	return copy;
}


// 获取元素尺寸
export function getEleSize(ele) {
	var ro = new ResizeObserver(entries => {
		for (let entry of entries) {
			const cr = entry.contentRect;
			console.log('entry:', entry);
			console.log('Element:', entry.target);
			console.log(`Element size: ${cr.width}px x ${cr.height}px`);
			console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
		}
	});

	// 观察一个或多个元素
	ro.observe(ele);
}


// 使用正则  this.$utils.###(##)
//正则匹配
//匹配帐号
const regUid = function (str) {
  return !RegExp(/^\w{6,11}$/).test(str);
};

// 对象排序 从小到大
// 对象，键
const sortKey = function (array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

//两个对象合并  只替换新值
const obj2Val2Obj1 = (a, b) => {
  console.log(a, b);
  return Object.keys(a)
    .map((v) => ({
      v,
      val: b[v] !== undefined ? b[v] : a[v],
    }))
    .reduce(
      (c, { v, val }) => ({
        ...c,
        [v]: val,
      }),
      {}
    );
};

//对象转数组 proxy
const setObjectList = function (obj_data) {
  let newDataList = Object.keys(obj_data).map((key) => {
    return obj_data[key];
  });

  return newDataList;
};

//存在 小数保留两位  不存在原路返回
const formatNumber = function (value) {
  if ((value + "").indexOf(".") !== -1) {
    return value.toFixed(2);
  } else {
    return value;
  }
};

//输入是否全为空
const regAir = function (value) {
  let str = value + "";
  return str.split(" ").join("").length;
};

//判断输入的内容全部为 特殊字符
const regSpec = function (str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  return !pattern.test(str);
};

const regName = function (str) {
  return !RegExp(/^[\u4e00-\u9fa5]{2,5}$/).test(str);
};

//匹配身份证
const regIDC = function (str) {
  return !RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(str);
};
//匹配手机号
const regPhone = function (str) {
  return !RegExp(/^1[345789]\d{9}$/).test(str);
};
//匹配座机
const regFixedPhone = function (str) {
  // return !RegExp(/0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8}/).test(str);
  return !RegExp(
    /(^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$)|(^([0-9]{3,4}-)?[0-9]{7,8}$)|(^([0-9]{3,4})?[0-9]{7,8}$)/
  ).test(str);
};

//匹配验证码
const regCheckNum = function (str) {
  return !RegExp(/^\d{4}$/).test(str);
};

//获取一个字符串值在指定字符串第n次出现的位置
const regFind = function (str, cha, num) {
  var x = str.indexOf(cha);

  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
};

// 提取文件后缀名
const getSuffix = function (str) {
  const fileExtension = str.substring(str.lastIndexOf(".") + 1);
  return fileExtension;
};

//删除最后一位并返回之前的
const strDeleteLast = function (str) {
  let new_str = str + "";
  return new_str.substr(0, str.length - 1);
};

//匹配邮箱格式
const regEmail = function (str) {
  return !RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str);
};


//将图片转换为Base64
const getImgToBase64 = function (url, callback) {
  console.log(url);
  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
};
//将base64转换为文件对象
const dataURLtoFile = function (dataurl, filename) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  //转换成file对象
  return new File([u8arr], filename, {
    type: mime,
  });
  //转换成成blob对象
  //return new Blob([u8arr],{type:mime});
};
//深度拷贝对象数组嵌套
const objDeepCopy = function (source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === "object"
        ? objDeepCopy(source[item])
        : source[item];
  }
  return sourceCopy;
};

//vue链接下载
export const vueLinkDown = function (link, fileName) {
  let url = link;
  fetch(url).then((res) => {
    res.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  });
};

//文件流下载
export const jsDown = function (file, fileName) {
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(new Blob([file]), {
    type: "application/octet-stream",
  });
  link.target = "_blank";
  //文件名和格式
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

//文件批量下载 防抖
const filesDownLoad = function (list) {
  for (let i = 0; i < list.length; i++) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // 防止影响页面
    iframe.style.height = 0; // 防止影响页面
    iframe.src = list[i];
    document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
    // 5分钟之后删除
    setTimeout(() => {
      iframe.remove();
    }, 5 * 60 * 1000);
  }
};

//中文汉字 ——> 数字
const strChangeNum = function (chnStr) {
  var chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  };
  var chnNameValue = {
    十: {
      value: 10,
      secUnit: false,
    },
    百: {
      value: 100,
      secUnit: false,
    },
    千: {
      value: 1000,
      secUnit: false,
    },
    万: {
      value: 10000,
      secUnit: true,
    },
    亿: {
      value: 100000000,
      secUnit: true,
    },
  };

  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var str = chnStr.split("");
  for (var i = 0; i < str.length; i++) {
    var num = chnNumChar[str[i]];
    if (typeof num !== "undefined") {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += number * unit;
      }
      number = 0;
    }
  }
  return rtn + section;
};

export default {
  regUid,
  regName,
  regIDC,
  regPhone,
  regFixedPhone,
  regCheckNum,
  regEmail,
  object_dede,
  getImgToBase64,
  dataURLtoFile,
  regAir,
  regSpec,
  objDeepCopy,
  regFind,
  strDeleteLast,
  setObjectList,
  getSuffix,
  formatNumber,
  sortKey,
  filesDownLoad,
  strChangeNum,
};
