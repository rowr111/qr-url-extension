chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_DOMAIN") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const url = new URL(tabs[0].url);
        sendResponse({ domain: url.hostname });
      } catch (e) {
        sendResponse({ domain: "" });
      }
    });
    return true; // keep the message channel open
  }
});
