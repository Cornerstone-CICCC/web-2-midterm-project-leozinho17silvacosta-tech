// Popcorn Function:

const popcornButton = document.getElementById('popcorn-button');
popcornButton.addEventListener('click', () => {
    popcornButton.classList.add('popcorn-button');

    popcornButton.addEventListener('animationend', () => {
        popcornButton.classList.remove('popcorn-button');
    }, { once: true });
});

// Slide CostaTips Function:

let photos = ["./images/neymarcaosperfeito-movie.png", "./images/travisscoot-movie.png", "./images/growsup-movie.png", "./images/surfsup-movie.png", "./images/coco-movie.png"];
let i = 0;

function slideChange() {
  const img = document.getElementById("slide");

  img.style.opacity = 0;

  setTimeout(() => {
    i = (i + 1) % photos.length;
    img.src = photos[i];
    img.style.opacity = 1;
  }, 500);
}

setInterval(slideChange, 2500);

// Light Mode Function:

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

// LANGUAGE SYSTEM (EN ↔ PT)

const langToggle = document.getElementById("lang-toggle");

const textPT = {
    home: "INÍCIO",
    about: "SOBRE",
    search: "BUSCAR",
    searchMovies: "BUSCAR FILMES",
    trending: "EM ALTA",
    findBest: "ENCONTRE OS MELHORES",
    paragraph: "Navegue por vários gêneros, pegue sua pipoca e bebida favorita, fique confortável e aperte o play!",
    followUs: "NOS SIGA!"
};

const textEN = {
    home: "HOME",
    about: "ABOUT",
    search: "SEARCH",
    searchMovies: "SEARCH MOVIES",
    trending: "TRENDING",
    findBest: "FIND THE BEST",
    paragraph: "Browse through many genres, grab your popcorn, get cozy, and hit play!",
    followUs: "FOLLOW US!"
};

function updateLanguage(lang) {
    const t = lang === "PT" ? textPT : textEN;

    document.querySelector("#home-section").textContent = t.home;
    document.querySelector("#about-section").textContent = t.about;
    document.querySelector("#search-section").textContent = t.search;
    document.querySelector(".home-title button").textContent = t.searchMovies;
    document.querySelector(".trending-section h2").textContent = t.trending;
    document.querySelector(".social-section h5").textContent = t.followUs;
    document.querySelector(".home-title h1").innerHTML = 
        `${t.findBest} <span id="popcorn-button">🍿</span> <span id="title-movies"><span>M</span><span>O</span><span>V</span><span>I</span><span>E</span><span>S</span></span>`;

    document.querySelector(".home-title p").textContent = t.paragraph;

    localStorage.setItem("lang", lang);
}

// button language:

langToggle.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "EN";
    const next = current === "EN" ? "PT" : "EN";
    updateLanguage(next);
});

updateLanguage(localStorage.getItem("lang") || "EN");

// click informations function:

document.addEventListener('DOMContentLoaded', () => {
    const movieDetail = document.getElementById('movie-detail');
    const closeButton = document.getElementById('close-detail');
    const movieCards = document.querySelectorAll('.trending-movies > div');

    movieCards.forEach(card => {
        card.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const year = this.getAttribute('data-year');
            const genre = this.getAttribute('data-genre');
            const synopsis = this.getAttribute('data-synopsis');
            const watch = this.getAttribute('data-watch');

            document.getElementById('detail-image').src = image;
            document.getElementById('detail-title').textContent = title;
            document.getElementById('detail-year').textContent = `Year: ${year}`;
            document.getElementById('detail-genre').textContent = `Genre: ${genre}`;
            document.getElementById('detail-synopsis').textContent = `Synopsis: ${synopsis}`;
            document.getElementById('detail-watch').textContent = `Watch on: ${watch}`;
            movieDetail.classList.remove('hidden');
        });
    });

    closeButton.addEventListener('click', () => {
        movieDetail.classList.add('hidden');
    });

    movieDetail.addEventListener('click', (e) => {
        if (e.target.id === 'movie-detail') {
            movieDetail.classList.add('hidden');
        }
    });
});