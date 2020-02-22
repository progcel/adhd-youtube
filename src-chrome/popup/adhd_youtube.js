function listenForEdits(){
  document.addEventListener("input", (e) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      let url = tabs[0].url;
      if (url.indexOf("youtube.com") === -1) {
        document.querySelector("#popup-content").classList.add("hidden");
        document.querySelector("#error-content").classList.remove("hidden");
        return;
      }
  
      let speed = e.target.value;
      let valid = speed.match(/^[0-9](\.*[0-9]{1,2})*$/g);
      if (valid) {
        chrome.tabs.sendMessage(tabs[0].id, {speed: speed}, function(response) {
          if (response.success) {
            document.querySelector("#success-label").innerHTML = 'speed is now ' + speed;
            document.querySelector("#success-label").classList.remove("hidden");
          }
        });  
      }
    });
  });
}

chrome.tabs.executeScript({file: "content_scripts/speed.js"}, listenForEdits);
