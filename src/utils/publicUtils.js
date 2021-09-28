/**
 * 通用js方法封装处理
 * Copyright (c) 2019 krd
 */

const baseURL = process.env.VUE_APP_BASEURL;

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time.replace(new RegExp(/-/gm), "/");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  var search = params;
  search.params = {};
  if (null != dateRange && "" != dateRange) {
    if (typeof propName === "undefined") {
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
    if (datas[key].dictValue == "" + value) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  return actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == "" + temp[val]) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    });
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}

// 通用下载方法
export function download(fileName, _blank) {
  if (_blank)
    return window.open(
      baseURL +
        "/common/download?fileName=" +
        encodeURI(fileName) +
        "&delete=" +
        true
    );
  window.location.href =
    baseURL +
    "/common/download?fileName=" +
    encodeURI(fileName) +
    "&delete=" +
    true;
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
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
  id = id || "id";
  parentId = parentId || "parentId";
  children = children || "children";
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map((item) => {
        return item[parentId];
      })
    ) ||
    0;
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter((father) => {
    let branchArr = cloneData.filter((child) => {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? (father.children = branchArr) : "";
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != "" ? treeData : data;
}

/**
 * 深度克隆
 * @param {*} obj 数据源
 */
export function deepClone(obj, cache = []) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const objType = Object.prototype.toString.call(obj).slice(8, -1);

  // 考虑 正则对象的copy
  if (objType === "RegExp") {
    return new RegExp(obj);
  }

  // 考虑 Date 实例 copy
  if (objType === "Date") {
    return new Date(obj);
  }

  // 考虑 Error 实例 copy
  if (objType === "Error") {
    return new Error(obj);
  }

  const hit = cache.filter((c) => c.original === obj)[0];

  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], cache);
  });

  return copy;
}

// 获取元素尺寸
export function getEleSize(ele) {
  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect;
      console.log("entry:", entry);
      console.log("Element:", entry.target);
      console.log(`Element size: ${cr.width}px x ${cr.height}px`);
      console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
    }
  });

  // 观察一个或多个元素
  ro.observe(ele);
}

function multiDownFile(url) {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none"; // 防止影响页面
  iframe.style.height = 0; // 防止影响页面
  iframe.src = url;
  document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    iframe.remove();
  }, 5 * 60 * 1000);
}
function downFile(url, fileName, type) {
  // xxx是后台接口， yyy是后台需要的数据
  // {responseType: 'blob'}必须添加，否则下载的文件会出现乱码
  axios
    .post(
      url,
      {},
      {
        headers: {
          "Content-disposition": "attachment; filename=" + fileName,
        },
        responseType: "blob",
        baseURL: "",
      }
    )
    .then((res) => {
      if (res.status === "0") {
        let types = "";
        // 判断文件类型，补充type
        if (type === "xlsx" || type === "xls") {
          types = "application/vnd.ms-excel";
        } else if (type === "png") {
          types = "application/x-png";
        } else if (type === "jpg") {
          types = "application/x-jpg";
        } else if (type === "jpeg") {
          types = "image/jpeg";
        }
        // res.data是后台返回的二进制数据，type:types为下载的数据类型
        const blob = new Blob([res.data], {
          type: types,
        });
        const downLoadEle = document.createElement("a");
        const href = URL.createObjectURL(blob);
        downLoadEle.href = href;
        downLoadEle.style.display = "none";
        downLoadEle.download = fileName;
        document.body.appendChild(downLoadEle);
        downLoadEle.click();
        document.body.removeChild(downLoadEle);
        window.URL.revokeObjectURL(href);
      }
    });
}
