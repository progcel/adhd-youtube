function listenForEdits() {
  document.addEventListener("input", (e) => {
    
    function speed(tabs){
      let url = tabs[0].url;
      if (url.indexOf("youtube.com") === -1) {
        document.querySelector("#popup-content").classList.add("hidden");
        document.querySelector("#error-content").classList.remove("hidden");
        return;
      }

      let speed = e.target.value;
      let valid = speed.match(/^[0-9](\.*[0-9]{1,2})*$/g);
      if (valid) {
        let result = browser.tabs.sendMessage(tabs[0].id, {
          speed: speed
        }).then(response => {
          if (response.sucess) {
            document.querySelector("#success-label").innerHTML = 'speed is now ' + speed;
            document.querySelector("#success-label").classList.remove("hidden");
          }
        });
      }
    }

    browser.tabs.query({active: true, currentWindow: true})
      .then(speed)
  })
}

browser.tabs.executeScript({file: "/content_scripts/speed.js"})
.then(listenForEdits)