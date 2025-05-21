import fetchFilmData from "./api.js";

// adds context menu item for adding film to Letterboxd watchlist
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToLetterboxdWatchlist",
    title: "CineMenu: Add to Letterboxd watchlist",
    contexts: ["page", "selection"],
  });
});

// access local storage for last film hovered
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToLetterboxdWatchlist") {
    chrome.storage.get("lastFilmHovered", (result) => {
      result.lastFilmHovered;
    });
    if (film && film.Title && film.TMDBid) {
      chrome.scripting.executeScript({
        target: { tab: tab.id },
        func: (text) => {
          alert(text);
        },
        args: [film.TMDBid],
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("No hovered film found"),
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchFilmData") {
    fetchFilmData(message.title)
      .then((data) => {
        if (data.Response === "True") {
          // call list of films or initialise
          chrome.storage.local.get("filmsHovered", (result) => {
            const filmsList = result.filmsHovered || [];

            const alreadyExists = filmsList.some(
              (f) => f.imdbID === data.imdbID
            );
            if (!alreadyExists) {
              filmsList.push(data);
            }

            const trimmedFilmsList = filmsList.slice(-20);
            // store last hovered title and new filmsList
            chrome.storage.local.set(
              {
                lastFilmHovered: data,
                filmsHovered: trimmedFilmsList,
              },
              () => {
                console.log("Saved film data and updated filmsHovered list");
              }
            );
          });
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
