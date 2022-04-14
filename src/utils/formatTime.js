// 传入时间戳转化为时间
export function formatTime(date) {
   var date = new Date(date);
     var YY = date.getFullYear() + '-';
     var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
     var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
     var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
     var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
     var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
     return YY + MM + DD +" "+hh + mm + ss;
}

//获取n年前的日期
export function getPassYearFormatDate(n) {
    var nowDate = new Date();
    var date = new Date(nowDate);
    date.setDate(date.getDate()- n*365);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	 // +" " + hh + mm + ss;
	
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


//   时间戳转化为年 月 日 时 分 秒 
//   number: 传入时间戳 
//   format：返回格式，支持自定义，但参数必须与formateArr里保持一致 如 formatTimeTwo(这是时间戳, "Y.M.D")

export function formatTimeTwo(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
//时间戳传化成日期
export function formatYear(date) {
    var date = new Date(date);
      var YY = date.getFullYear() + '/';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    //   var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    //   var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    //   var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD 
 }