
// DARK/LIGHT MODE

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});


// LANGUAGE TOGGLE

const langToggle = document.getElementById("lang-toggle");
let language = localStorage.getItem("language") || "en";

function updateLanguage() {
    if (language === "pt") {
        document.querySelector("#home-section").textContent = "INÍCIO";
        document.querySelector("#neymar-genre").textContent = "DOCUMENTÁRIO";
        document.querySelector("#grownups-title").textContent = "GENTE GRANDE";
        document.querySelector("#grownups-genre").textContent = "COMÉDIA";
        document.querySelector("#travisscott-genre").textContent = "DOCUMENTÁRIO";
        document.querySelector("#surfsup-title").textContent = "TA DANDO ONDA";
        document.querySelector("#surfsup-genre").textContent = "INFANTIL / ANIMAÇÃO";
        document.querySelector("#coco-title").textContent = "VIVA: A VIDA É UMA FESTA";
        document.querySelector("#coco-genre").textContent = "INFANTIL / ANIMAÇÃO";
        document.querySelector("#battleship-genre").textContent = "FICÇÃO CIENTÍFICA / AÇÃO";
        document.querySelector("#dogpurpose-title").textContent = "4 VIDAS DE UM CACHORRO";
        document.querySelector("#dogpurpose-genre").textContent = "COMÉDIA DRAMÁTICA";
        document.querySelector("#whentheyseeus-title").textContent = "OLHOS QUE CONDENAM";
        document.querySelector("#whentheyseeus-genre").textContent = "DRAMA / HISTÓRIA REAL";
    } else {
        document.querySelector("#home-section").textContent = "HOME";
        document.querySelector("#neymar-genre").textContent = "DOCUMENTARY";
        document.querySelector("#grownups-title").textContent = "GROWN UPS";
        document.querySelector("#grownups-genre").textContent = "COMEDY";
        document.querySelector("#travisscott-genre").textContent = "DOCUMENTARY";
        document.querySelector("#surfsup-title").textContent = "SURF'S UP";
        document.querySelector("#surfsup-genre").textContent = "CHILD / ANIMATION";
        document.querySelector("#coco-title").textContent = "COCO";
        document.querySelector("#coco-genre").textContent = "CHILD / ANIMATION";
        document.querySelector("#battleship-genre").textContent = "SCIENCE FICTION / ACTION";
        document.querySelector("#dogpurpose-title").textContent = "A DOG'S PURPOSE";
        document.querySelector("#dogpurpose-genre").textContent = "COMEDY DRAMA";
        document.querySelector("#whentheyseeus-title").textContent = "WHEN THEY SEE US";
        document.querySelector("#whentheyseeus-genre").textContent = "DRAMA / REAL HISTORY";
    }
}

updateLanguage();

langToggle.addEventListener("click", () => {
    language = language === "en" ? "pt" : "en";
    localStorage.setItem("language", language);
    updateLanguage();
});

// MOVIE DETAILS

const detailSection = document.getElementById("movie-detail");
const closeDetail = document.getElementById("close-detail");

const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailYear = document.getElementById("detail-year");
const detailGenre = document.getElementById("detail-genre");
const detailSynopsis = document.getElementById("detail-synopsis");
const detailWatch = document.getElementById("detail-watch");

function openMovieDetail(movieElement) {
    const image = movieElement.getAttribute("data-image");
    const title = movieElement.getAttribute("data-title");
    const year = movieElement.getAttribute("data-year");
    const genre = movieElement.getAttribute("data-genre");
    const synopsis = movieElement.getAttribute("data-synopsis");
    const watch = movieElement.getAttribute("data-watch");

    detailImage.src = image;
    detailTitle.textContent = title;
    detailYear.innerHTML = `<span class="label">Year:</span> <span class="value">${year}</span>`;
    detailGenre.innerHTML = `<span class="label">Genre:</span> <span class="value">${genre}</span>`;
    detailSynopsis.innerHTML = `<span class="label">Synopsis:</span> <span class="value">${synopsis}</span>`;
    detailWatch.innerHTML = `<span class="label">Where to Watch:</span> <span class="value">${watch}</span>`;

    detailSection.classList.remove("hidden");
    detailSection.classList.add("visible");
}

const movies = document.querySelectorAll(".tip-movie");

movies.forEach(movie => {
    movie.addEventListener("click", () => {
        openMovieDetail(movie);
    });
});

closeDetail.addEventListener("click", () => {
    detailSection.classList.remove("visible");
    detailSection.classList.add("hidden");
});


detailSection.addEventListener("click", (e) => {
    if (e.target === detailSection) {
        detailSection.classList.remove("visible");
        detailSection.classList.add("hidden");
    }
});