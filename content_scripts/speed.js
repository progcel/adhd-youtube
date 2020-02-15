(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    let videoPlayer = document.getElementsByTagName("video")[0];

    console.log('kur za buhala');

    if (message.command === "speed-up") {
      videoPlayer.playbackRate = message.speed
    } else if (message.command === "reset") {
      videoPlayer.playbackRate = 1
    }
  });
})();
