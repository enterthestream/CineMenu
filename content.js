function handleMouseOver(event) {
  const filmTitle = event.target.textContent.trim();

  console.log(`Fetching data for: ${filmTitle}`);

  chrome.runtime.sendMessage(
    { action: "fetchFilmData", title: filmTitle },
    (response) => {
      if (response.data) {
        console.log("Film Data:", response.data);
      } else {
        console.log("No data found for this title");
      }
    }
  );
}

function detectLetterboxdTitles() {
  console.log("CineMenu content script loaded");

  const filmTitles = document.querySelectorAll(".filmtitle");

  console.log("Found filmTitles:", filmTitles.length);
  filmTitles.forEach((titleElement) => {
    titleElement.addEventListener("mouseover", handleMouseOver);
  });
}

function detectMubiTitles() {
  const observer = new MutationObserver(() => {
    const filmTitles = document.querySelectorAll(
      '.css-97xey3 h1[itemprop="name"]'
    );

    filmTitles.forEach((titleElement) => {
      if (!titleElement.hasAttribute("data-listener-added")) {
        titleElement.addEventListener("mouseover", handleMouseOver);
        titleElement.setAttribute("data-listener-added", "true");
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
const siteDetectionMap = {
  "letterboxd.com": detectLetterboxdTitles,
  "mubi.com": detectMubiTitles,
};

const hostname = window.location.hostname;

Object.keys(siteDetectionMap).forEach((site) => {
  if (hostname.includes(site)) {
    siteDetectionMap[site]();
  }
});
