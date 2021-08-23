let date = new Date();
date.getYear(); //获取当前年份(2位)
date.getFullYear(); //获取完整的年份(4位)
date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
date.getDate(); //获取当前日(1-31)
date.getDay(); //获取当前星期X(0-6,0代表星期天)
date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
date.getHours(); //获取当前小时数(0-23)
date.getMinutes(); //获取当前分钟数(0-59)
date.getSeconds(); //获取当前秒数(0-59)
date.getMilliseconds(); //获取当前毫秒数(0-999)
date.toLocaleDateString(); //获取当前日期
date.toLocaleTimeString(); //获取当前时间
date.toLocaleString(); //获取日期与时间
export function formatedate() {
  let mytime =
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日";
  return mytime;
}
export function formate() {
  let mytime =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return mytime;
}
export function time(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return y + "-" + m;
}
export function formatehours() {
  let mytime =
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日" +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return mytime;
}
export function yearstimes(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  let mytime = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  return mytime;
}
export function foreara(data) {
  data.map(item => {
    if (item.children.length === 0) {
      item.children = undefined;
    } else {
      item.children.map(value => {
        if (value.children.length === 0) {
          value.children = undefined;
        } else {
          value.children.map(items => {
            if (items.children.length === 0) {
              items.children = undefined;
            } else {
            }
          });
        }
      });
    }
  });
  return data;
}

export function infor(x, y) {
  let resultList = [];
  for (let i = 0; i < x.length; i++) {
    let obj =  x[i];
    let num = obj.name;
    for (let j = 0; j < y.length; j++) {
      let aj = y[j];
      let n = aj.name;
      if (n === num) {
        resultList.push(obj)
      }
    }
  }
  return resultList
}

//来源截取
export function foresoure(data) {
  data.map(item => {
    if (item.childList.length === 0) {
      item.childList = undefined;
    } else {
      item.childList.map(value => {
        if (value.childList.length === 0) {
          value.childList = undefined;
        } else {
          value.childList.map(items => {
            if (items.childList.length === 0) {
              items.childList = undefined;
            } else {
            }
          });
        }
      });
    }
  });
  return data;
}
//数组不同
export function uninfor(x, y) {
  let intersection = x.filter(v => y.includes(v))
  let difference = x.concat(y).filter(v => !x.includes(v) || !y.includes(v))
    return difference
}

export function beformonth() {
  let arr = []
  let DayOne = new Date().setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 2)) //获取当月月初
  let today = new Date().getTime()
  let lastTime = formatTime(DayOne)
  let newDay = formatTime(today)
  arr.push(lastTime)
  arr.push(newDay)
  return arr
}

function formatTime(time) {
    return new Date(time).toISOString().split('T')[0];
}