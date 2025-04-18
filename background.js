import fetchFilmData from "./api.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchFilmData") {
    fetchFilmData(message.title)
      .then((data) => {
        if(data.Response === "True") {
          // call list of films or initialise
          chrome.storage.local.get("FilmsHovered", (result) => {
            const filmsList = result.FilmsHovered || []

            const alreadyExists = filmsList.some(f => f.imdbID === data.imdbID)
            if(!alreadyExists){
              filmsList.push(data)
            }

            const trimmedFilmsList = filmsList.slice(-20)
        // store last hovered title and new filmsList
            chrome.storage.local.set({
              lastFilmHovered: data,
              FilmsHovered: trimmedFilmsList}, () => {
                              console.log("Saved film data and updated FilmsHovered list")
              }

            )
          })

        }
        sendResponse({ data });
      })
      .catch((err) => {
        console.error("Error fetching film data:", err);
        sendResponse({ data: null });
      });
    return true;
  }
});
