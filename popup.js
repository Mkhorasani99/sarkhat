function start() {
  let timeSend = document.getElementById("timeSend").value;
  console.log(timeSend);
if ( timeSend ) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {runBot: timeSend }, function(response) {});
});
} else {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {runBot: "start"}, function(response) {});
});
}
}
function stop() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {runBot: "stop"}, function(response) {});
});
}
document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
            // inject content_script to current tab
            chrome.tabs.executeScript(activeTabs[0].id, {file: '/assets/js/core/content.js', allFrames: false});
        });
    });
});

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
