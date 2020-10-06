// Saves options to chrome.storage
function save_options() {
  var delay = document.getElementById('delay').value;
  var order = document.getElementById('order').value;
  chrome.storage.sync.set({
    delayTime: delay,
    orderNum: order
      }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = "block";
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
      status.style.display = "none";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    delayTime: '524',
    orderNum: '0'
  }, function(items) {
    document.getElementById('delay').value = items.delayTime;
    document.getElementById('order').value = items.orderNum;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
