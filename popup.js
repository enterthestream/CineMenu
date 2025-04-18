document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("lastFilmHovered", ({lastFilmHovered}) => {

    if(lastFilmHovered){
        document.getElementById("film-title").textContent = lastFilmHovered.Title
        document.getElementById("film-poster").src = lastFilmHovered.Poster
    } else {
        document.getElementById("no-film").textContent = "No title hovered yet"
    }

})
})

