let lopOerder;
let tervalstop;
let delay;
let order;
chrome.storage.sync.get(['delayTime'], function(result) {
  delay = result.delayTime;
});
chrome.storage.sync.get(['orderNum'], function(result) {
  order = result.orderNum;
});

function onlinePlus() {
  let num = document.getElementById("send_order_txtCount").value;
  let pay = document.getElementById("send_order_txtPrice").value;
  tervalstop = setInterval(loperingig, delay);
  let counter = 1;
  function loperingig() {
    document.getElementById("send_order_txtCount").value = num;
    document.getElementById("send_order_txtPrice").value = pay;
    document.getElementById("send_order_btnSendOrder").click();
    if (order != 0) {
      counter ++;
      if (counter > order) {clearInterval(tervalstop);}
    }
    }
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.runBot === "stop") {
      function myStopFunction() {
      clearInterval(tervalstop);
      clearInterval(lopOerder);}
      myStopFunction();
    }
    if (request.runBot === "start") {
      onlinePlus();
    }

    if (request.runBot !== "start" || request.runBot !== "stop") {
      let timePicker = request.runBot;
      let a = timePicker.split(':');
      //let timeSend = ((+a[0]) * 60 * 60) + ((+a[1]) * 60) + (+a[2]) * 1;
      let h = (+a[0]) * 60 * 60;
      let m = (+a[1]) * 60;
      let s = (+a[2]) * 1;
      let timeSend;
      if (!s) {timeSend = h + m;}
       else {timeSend = h + m + s;}
        lopOerder = setInterval(function(){
        var date = new Date();
        var timeServer = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
        if (timeServer > timeSend) {
          onlinePlus();
          clearInterval(lopOerder);
        }
    }, 100);
}
  });
