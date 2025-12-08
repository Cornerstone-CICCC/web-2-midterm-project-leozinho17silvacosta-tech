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
        document.querySelector("#about-section").textContent = "SOBRE";
        document.querySelector(".search-section h2").textContent = "BUSCAR FILMES";
        document.getElementById("search-input").placeholder = "Digite o nome de um filme ou série...";
        document.getElementById("search-btn").textContent = "BUSCAR";
        document.querySelector(".results-section h2").textContent = "RESULTADOS";
    } else {
        document.querySelector("#home-section").textContent = "HOME";
        document.querySelector("#about-section").textContent = "ABOUT";
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