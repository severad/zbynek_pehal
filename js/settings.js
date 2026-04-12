document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.querySelector(".btn-save");
    const langSelectors = document.querySelectorAll(".lang-item");
    const settingsLang = document.querySelector("select.soft-input:nth-of-type(1)");
    const darkModeSwitch = document.querySelector(".form-check-input");
    const currencySelect = document.querySelector("select.soft-input");
    const translations = {
        en: {
            dashboardTitle: "Trading Journal Dashboard",
            totalPL: "Total P/L",
            winrate: "Winrate",
            avgWin: "Average Win",
            avgLoss: "Average Loss",
            equity: "Equity Curve",
            trades: "Trades Overview",
            settings: "Settings"
        },
        cz: {
            dashboardTitle: "PĹ™ehled obchodnĂ­ho denĂ­ku",
            totalPL: "CelkovĂ˝ Z/Z",
            winrate: "ĂšspÄ›Ĺˇnost",
            avgWin: "PrĹŻmÄ›rnĂ˝ zisk",
            avgLoss: "PrĹŻmÄ›rnĂˇ ztrĂˇta",
            equity: "KĹ™ivka kapitĂˇlu",
            trades: "PĹ™ehled obchodĹŻ",
            settings: "NastavenĂ­"
        }
    };
    function applyLanguage(lang) {
        const t = translations[lang] || translations.en;
        if(document.getElementById("title-dashboard")) document.getElementById("title-dashboard").innerText = t.dashboardTitle;
        if(document.getElementById("label-totalpl")) document.getElementById("label-totalpl").childNodes[0].textContent = t.totalPL + " ";
        if(document.getElementById("label-winrate")) document.getElementById("label-winrate").childNodes[0].textContent = t.winrate + " ";
        if(document.getElementById("label-avgwin")) document.getElementById("label-avgwin").childNodes[0].textContent = t.avgWin + " ";
        if(document.getElementById("label-avgloss")) document.getElementById("label-avgloss").childNodes[0].textContent = t.avgLoss + " ";
        if(document.getElementById("label-equity")) document.getElementById("label-equity").innerText = t.equity;
        if(document.getElementById("label-trades")) document.getElementById("label-trades").innerText = t.trades;
        localStorage.setItem("selectedLang", lang);
        const activeLangBtn = document.querySelector(".lang-btn");
        if(activeLangBtn) {
            activeLangBtn.innerHTML = lang === 'cz' 
                ? '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/330px-Flag_of_the_Czech_Republic.svg.png"> CZ' 
                : '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/330px-Flag_of_the_United_Kingdom.svg.png"> EN';
        }
    }
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("bg-dark", "text-light");
            document.body.classList.remove("bg-light", "text-dark");
        } else {
            document.body.classList.remove("bg-dark", "text-light");
            document.body.classList.add("bg-light", "text-dark");
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }
    langSelectors.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const lang = item.getAttribute("data-lang");
            applyLanguage(lang);
        });
    });
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            if (darkModeSwitch) {
                applyTheme(darkModeSwitch.checked);
            }
            if (currencySelect) {
                localStorage.setItem("currency", currencySelect.value);
            }
            const settingsLangSelect = document.querySelector("select.soft-input[style*='max-width: 200px']");
            if(settingsLangSelect) {
                const langVal = settingsLangSelect.value === "ÄŚeĹˇtina" ? "cz" : "en";
                applyLanguage(langVal);
            }

            alert("ZmÄ›ny byly ĂşspÄ›ĹˇnÄ› uloĹľeny!");
        });
    }
    const savedLang = localStorage.getItem("selectedLang") || "cz";
    const savedTheme = localStorage.getItem("theme") || "dark";

    applyLanguage(savedLang);
    applyTheme(savedTheme === "dark");
    if (darkModeSwitch) darkModeSwitch.checked = (savedTheme === "dark");
});
