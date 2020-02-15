function listenForClicks() {
  document.addEventListener("click", (e) => {

    function youtubeSpeed(tabs) {
      let url = tabs[0].url;

      if (url.indexOf("youtube.com") === -1) {
        document.querySelector("#popup-content").classList.add("hidden");
        document.querySelector("#error-content").classList.remove("hidden");
        return;
      }

      let speedText = e.target.textContent;
      let speed = speedText.split(' ')[0];

      browser.tabs.sendMessage(tabs[0].id, {
        command: "speed-up",
        speed: speed
      });
    }

    function resetSpeed(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }

    function reportError(error) {
      console.error(`Error: ${error}`);
    }

    if (e.target.classList.contains("speed")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(youtubeSpeed)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(resetSpeed)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/speed.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
