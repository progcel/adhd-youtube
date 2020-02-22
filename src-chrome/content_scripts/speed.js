chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  document.getElementsByTagName("video")[0].playbackRate = message.speed;

  console.log('kur za buhala');

  sendResponse({
    success: true
  });
});