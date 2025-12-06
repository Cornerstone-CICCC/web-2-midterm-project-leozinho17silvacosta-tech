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
    home: "HOME",
    about: "SOBRE",
    search: "BUSCAR",
    trending: "EM ALTA",
    findBest: "ENCONTRE OS MELHORES",
    paragraph: "Navegue por vários gêneros, pegue sua pipoca e bebida favorita, fique confortável e aperte o play!"
};

const textEN = {
    home: "HOME",
    about: "ABOUT",
    search: "SEARCH",
    trending: "TRENDING",
    findBest: "FIND THE BEST",
    paragraph: "Browse through many genres, grab your popcorn, get cozy, and hit play!"
};

function updateLanguage(lang) {
    const t = lang === "PT" ? textPT : textEN;

    document.querySelector("#home-section").textContent = t.home;
    document.querySelector("#about-section").textContent = t.about;
    document.querySelector("#search-section").textContent = t.search;
    document.querySelector(".trending-section h2").textContent = t.trending;
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