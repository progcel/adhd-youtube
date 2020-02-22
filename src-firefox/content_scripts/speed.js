(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    document.getElementsByTagName("video")[0].playbackRate = message.speed;

    console.log('kur za buhala');

    return Promise.resolve({sucess: true});
  });
})();
