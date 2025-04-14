import fetchFilmData from "./api.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchFilmData") {
    fetchFilmData(message.title)
      .then((data) => {
        sendResponse({ data });
      })
      .catch((err) => {
        console.error("Error fetching film data:", err);
        sendResponse({ data: null });
      });
    return true;
  }
});
