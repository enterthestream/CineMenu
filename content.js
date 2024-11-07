function detectLetterboxdTitles() {
  const filmTitles = document.querySelectorAll(".filmtitle");

  filmTitles.forEach((titleElement) => {
    titleElement.addEventListener("mouseover", () => {
      console.log("hovered over Letterboxd film title using map");
    });
  });
}

function detectMubiTitles() {
  const observer = new MutationObserver(() => {
    const filmTitles = document.querySelectorAll(
      '.css-97xey3 h1[itemprop="name"]'
    );

    filmTitles.forEach((titleElement) => {
      if (!titleElement.hasAttribute("data-listener-added")) {
        titleElement.addEventListener("mouseover", () => {
          console.log("hovered over Mubi film title");
        });
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
