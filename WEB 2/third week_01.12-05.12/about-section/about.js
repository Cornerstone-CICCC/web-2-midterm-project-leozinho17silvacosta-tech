
// LIGHT/DARK MODE:

document.addEventListener("DOMContentLoaded", () => {
    
    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }


// LANGUAGE SYSTEM (EN ↔ PT)

    const langToggle = document.getElementById("lang-toggle");

    const textPT = {
        navHome: "INÍCIO",
        navAbout: "SOBRE",
        navSearch: "BUSCAR",
        aboutTitle: "BEM-VINDO AO <br> Costa<span id='flix-color'>Flix</span>",
        aboutIntro: "CostaFlix é uma plataforma criada e focada em otimizar a experiência de consumo de filmes e séries para um público global. Nossa missão é fornecer de forma inteligente e objetiva para os usuários o conteúdo verdadeiramente imperdível. O CostaFlix é seu recurso essencial para decisões informadas no universo do streaming e da produção cinematográfica.",
        pillarsTitle: "NOSSOS PILARES",

        mission1Strong: "QUALIDADE DA INFORMAÇÃO:",
        mission1Text: "Entregamos críticas e análises honestas que vão direto ao ponto, sem enrolação e sem spoilers desnecessários.",
        mission2Strong: "NAVEGAÇÃO INTELIGENTE:",
        mission2Text: "Ajudamos você a descobrir o próximo filme favorito, seja ele um blockbuster de ação ou um clássico cult esquecido.",
        mission3Strong: "SUA PLATAFORMA, SEU JEITO:",
        mission3Text: "Com os botões de Modo Escuro e Idioma, você personaliza a experiência para que o CostaFlix seja perfeito para você."
    };

    const textEN = {
        navHome: "HOME",
        navAbout: "ABOUT",
        navSearch: "SEARCH",

        aboutTitle: "WELCOME TO <br> Costa<span id='flix-color'>Flix</span>",
        aboutIntro: "CostaFlix is a platform created and focused on optimizing the consumption experience of films and series for a global audience. Our mission is to intelligently and objectively provide users with the truly must-watch content. CostaFlix is your essential resource for informed decisions in the universe of streaming and cinematic production.",
        pillarsTitle: "OUR PILLARS",

        mission1Strong: "QUALITY INFORMATION:",
        mission1Text: "We deliver honest reviews and analyzes that get straight to the point, without fluff or unnecessary spoilers.",
        mission2Strong: "SMART NAVIGATION:",
        mission2Text: "We help you discover your next favorite movie, whatever genre you prefer.",
        mission3Strong: "YOUR PLATFORM, YOUR WAY:",
        mission3Text: "With the Dark Mode and Language buttons, you customize the experience so that CostaFlix is perfect for you."
    };

    function updateLanguage(lang) {
        const t = lang === "PT" ? textPT : textEN;

        document.querySelector("#home-section").textContent = t.navHome;
        
        const aboutSection = document.querySelector("#about-section");
        if (aboutSection) aboutSection.textContent = t.navAbout; 
        
        const searchSection = document.querySelector("#search-section");
        if (searchSection) searchSection.textContent = t.navSearch;

        document.querySelector(".about-title").innerHTML = t.aboutTitle;
        document.querySelector(".about-intro").textContent = t.aboutIntro;
        document.querySelector(".mission-title").textContent = t.pillarsTitle;

        const missionItems = document.querySelectorAll(".mission-list li");
        
        if (missionItems.length >= 3) {
            missionItems[0].querySelector("strong").textContent = t.mission1Strong;
            missionItems[0].lastChild.textContent = t.mission1Text;
            
            missionItems[1].querySelector("strong").textContent = t.mission2Strong;
            missionItems[1].lastChild.textContent = t.mission2Text;

            missionItems[2].querySelector("strong").textContent = t.mission3Strong;
            missionItems[2].lastChild.textContent = t.mission3Text;
        }

        localStorage.setItem("lang", lang);
    }

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const current = localStorage.getItem("lang") || "EN";
            const next = current === "EN" ? "PT" : "EN";
            updateLanguage(next);
        });
    }
    
    updateLanguage(localStorage.getItem("lang") || "EN");

});