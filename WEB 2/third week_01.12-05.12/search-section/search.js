// DARK/LIGHT MODE

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);


// LANGUAGE TOGGLE

const langToggle = document.getElementById("lang-toggle");
let language = localStorage.getItem("language") || "en";

function updateLanguage() {
    if (language === "pt") {
        document.querySelector("#home-section").textContent = "INÍCIO";
        document.querySelector(".search-section h2").textContent = "BUSCAR FILMES";
        document.getElementById("search-input").placeholder = "Digite o nome de um filme ou série...";
        document.getElementById("search-btn").textContent = "BUSCAR";
        document.querySelector(".results-section h2").textContent = "RESULTADOS";
    } else {
        document.querySelector("#home-section").textContent = "HOME";
        document.querySelector(".search-section h2").textContent = "SEARCH MOVIES";
        document.getElementById("search-input").placeholder = "Type a movie or TV show name...";
        document.getElementById("search-btn").textContent = "SEARCH";
        document.querySelector(".results-section h2").textContent = "⬇";
    }
}

langToggle.addEventListener("click", () => {
    language = language === "en" ? "pt" : "en";
    localStorage.setItem("language", language);
    updateLanguage();
});

updateLanguage();

// SEARCH FUNCTIONALITY

const API_KEY = "090f2bc2178d70e1f4f5062e7656f9c4";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

// SEARCH BUTTON FUNCTION:

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query.length < 1) return;
    fetchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
});

function fetchMovies(query) {
    resultsContainer.innerHTML = "<p>Loading...</p>";

    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=${language}`)
        .then(res => res.json())
        .then(data => displayResults(data.results))
        .catch(() => {
            resultsContainer.innerHTML = "<p>Error loading results.</p>";
        });
    }

function displayResults(results) {
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    resultsContainer.innerHTML = results.map(item => {
        const title = item.title || item.name;
        const poster = item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : "./images/no-image.png";

        return `
            <div class="result-card">
                <img src="${poster}" alt="${title}">
                <h3>${title}</h3>
            </div>
        `;
    }).join("");
}

function displayResults(results) {
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    resultsContainer.innerHTML = results.map(item => {
        const title = item.title || item.name;
        const poster = item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : "./images/no-image.png";

        return `
            <div class="result-card" data-id="${item.id}" data-type="${item.media_type}">
                <img src="${poster}" alt="${title}">
                <h3>${title}</h3>
            </div>
        `;
    }).join("");

    enableCardClick();
}

function enableCardClick() {
    const cards = document.querySelectorAll(".result-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const movieId = card.dataset.id;
            const type = card.dataset.type;

            fetchDetails(movieId, type);
        });
    });
}

function fetchDetails(id, type) {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=${language}`)
        .then(res => res.json())
        .then(data => showModal(data))
        .catch(() => alert("Error."));
}

function showModal(data) {
    const modal = document.getElementById("movie-modal");

    document.getElementById("modal-title").textContent = data.title || data.name;
    document.getElementById("modal-year").textContent =
        (data.release_date || data.first_air_date || "").slice(0, 4);
    document.getElementById("modal-overview").textContent =
        data.overview || "No description available.";

    document.getElementById("modal-poster").src =
        data.poster_path
            ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
            : "./images/no-image.png";

    modal.classList.remove("hidden");
}

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("movie-modal").classList.add("hidden");
});