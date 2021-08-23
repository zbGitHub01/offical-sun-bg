import { getAuth , setDefaultId} from "@/utils/auth";
import { yearstimes } from "./formatedate";
import { parse } from "./parse"
import dayjs from "dayjs"
var url = process.env.VUE_APP_BASE_WS;
var ws;
var tt;
var lockReconnect = false; //避免重复连接

var websocket = {
  Init: function() {
    if ("WebSocket" in window) {
      ws = new WebSocket(url);
    } else if ("MozWebSocket" in window) {
      ws = new MozWebSocket(url);
    } else {
      console.log("您的浏览器不支持 WebSocket!");
      return;
    }
    ws.onmessage = function(e) {
      if(parse(e.data).msgCode === 11900){
        setDefaultId(parse(e.data).data.userGlobalUuid)
      }
      console.log("接收消息:" + e.data);
      heartCheck.start();
    };
    ws.onclose = function() {
      console.log("连接已关闭");
      reconnect();
    };
    ws.onopen = function() {
      console.log("连接成功");
      let id = new Date().getTime();
      let params = {
        reqCode: 11900,
        msgUuid: id,
        data: getAuth()
      };
      websocket.Send(params);
      heartCheck.start();
    };
   
    ws.onerror = function(e) {
      console.log("数据传输发生错误");
      reconnect();
    };
  },
  Send: function(params) {
    let data = {
      reqCode: params.reqCode,
      msgUuid: params.msgUuid,
      data: params.data
    };
    let msg = JSON.stringify(data);
    console.log("发送消息：" + msg);
    ws.send(msg);
        
  },
  Onmessage:function(callback){
    ws.onmessage = e=>{
      console.log("接收消息：" + e.data);
      callback && callback(e.data)
    }
  },
  getWebSocket() {
    return ws;
  },
  getStatus() {
    if (ws.readyState == 0) {
      return "未连接";
    } else if (ws.readyState == 1) {
      return "已连接";
    } else if (ws.readyState == 2) {
      return "连接正在关闭";
    } else if (ws.readyState == 3) {
      return "连接已关闭";
    }
  }
};

export default websocket;

//根据消息标识做不同的处理
function messageHandle(message) {
  let msg = JSON.parse(message);
  switch (msg.flag) {
    case "command":
      console.log("指令消息类型");
      break;
    case "inform":
      console.log("通知");
      break;
    default:
      console.log("未知消息类型");
  }
}

function reconnect() {
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt);
  tt = setTimeout(function() {
    console.log("执行断线重连...");
    websocket.Init(null);
    lockReconnect = false;
  }, 40000);
}

//心跳检测
var heartCheck = {
  timeout: 1000 *30 ,
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function() {
    console.log("开始心跳检测");
    var self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      console.log("心跳检测...");
      let id = new Date().getTime();
      let time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let params = {
        reqCode: 11100,
        msgUuid: id,
        data: {
          heartbeatTime: time,
          msg: "heartbeat"
        }
      };
      ws.send(JSON.stringify(params));
      self.serverTimeoutObj = setTimeout(function() {
        if (ws.readyState != 1) {
          ws.close();
        }
        // createWebSocket();
      }, self.timeout);
    }, this.timeout);
  }
};
