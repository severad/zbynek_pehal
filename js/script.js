document.addEventListener("DOMContentLoaded", async () => {
    const STORAGE_KEYS = {
        lang: "eduLang",
        theme: "eduTheme",
        currency: "eduCurrency",
        dateFormat: "eduDateFormat"
    };

    const FLAG_CZ = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/330px-Flag_of_the_Czech_Republic.svg.png";
    const FLAG_EN = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/330px-Flag_of_the_United_Kingdom.svg.png";

    const tradeSeed = [
        { date: "2026-02-03", instrument: "NQ1!", direction: "LONG", pl: 68, symbol: "MNQH6", volume: 6, avgEntry: 25310, duration: "3m" },
        { date: "2026-02-06", instrument: "NQ1!", direction: "SHORT", pl: -34, symbol: "MNQH6", volume: 5, avgEntry: 25395, duration: "2m" },
        { date: "2026-02-10", instrument: "ES1!", direction: "LONG", pl: 52, symbol: "MESH6", volume: 7, avgEntry: 5062, duration: "4m" },
        { date: "2026-02-13", instrument: "NQ1!", direction: "LONG", pl: 96, symbol: "MNQH6", volume: 8, avgEntry: 25420, duration: "5m" },
        { date: "2026-02-17", instrument: "NQ1!", direction: "SHORT", pl: -41, symbol: "MNQH6", volume: 6, avgEntry: 25488, duration: "3m" },
        { date: "2026-02-20", instrument: "ES1!", direction: "SHORT", pl: 38, symbol: "MESH6", volume: 6, avgEntry: 5074, duration: "4m" },
        { date: "2026-02-24", instrument: "NQ1!", direction: "LONG", pl: 82, symbol: "MNQH6", volume: 7, avgEntry: 25510, duration: "4m" },
        { date: "2026-02-27", instrument: "NQ1!", direction: "SHORT", pl: -29, symbol: "MNQH6", volume: 5, avgEntry: 25580, duration: "2m" },

        { date: "2026-03-04", instrument: "ES1!", direction: "LONG", pl: 44, symbol: "MESH6", volume: 7, avgEntry: 5088, duration: "4m" },
        { date: "2026-03-07", instrument: "NQ1!", direction: "LONG", pl: 109, symbol: "MNQH6", volume: 9, avgEntry: 25640, duration: "6m" },
        { date: "2026-03-11", instrument: "NQ1!", direction: "SHORT", pl: -56, symbol: "MNQH6", volume: 7, avgEntry: 25720, duration: "3m" },
        { date: "2026-03-14", instrument: "ES1!", direction: "SHORT", pl: 31, symbol: "MESH6", volume: 5, avgEntry: 5096, duration: "3m" },
        { date: "2026-03-18", instrument: "NQ1!", direction: "LONG", pl: 126, symbol: "MNQH6", volume: 10, avgEntry: 25795, duration: "5m" },
        { date: "2026-03-21", instrument: "NQ1!", direction: "SHORT", pl: -47, symbol: "MNQH6", volume: 6, avgEntry: 25830, duration: "2m" },
        { date: "2026-03-25", instrument: "ES1!", direction: "LONG", pl: 58, symbol: "MESH6", volume: 8, avgEntry: 5104, duration: "4m" },
        { date: "2026-03-28", instrument: "NQ1!", direction: "LONG", pl: 92, symbol: "MNQH6", volume: 8, avgEntry: 25890, duration: "4m" },

        { date: "2026-04-02", instrument: "NQ1!", direction: "SHORT", pl: -33, symbol: "MNQH6", volume: 5, avgEntry: 25960, duration: "2m" },
        { date: "2026-04-06", instrument: "ES1!", direction: "LONG", pl: 49, symbol: "MESH6", volume: 6, avgEntry: 5118, duration: "3m" },
        { date: "2026-04-09", instrument: "NQ1!", direction: "LONG", pl: 116, symbol: "MNQH6", volume: 10, avgEntry: 26015, duration: "6m" },
        { date: "2026-04-12", instrument: "NQ1!", direction: "SHORT", pl: -52, symbol: "MNQH6", volume: 7, avgEntry: 26088, duration: "3m" },
        { date: "2026-04-16", instrument: "ES1!", direction: "SHORT", pl: 36, symbol: "MESH6", volume: 5, avgEntry: 5126, duration: "3m" },
        { date: "2026-04-19", instrument: "NQ1!", direction: "LONG", pl: 97, symbol: "MNQH6", volume: 8, avgEntry: 26150, duration: "5m" },
        { date: "2026-04-23", instrument: "NQ1!", direction: "SHORT", pl: -44, symbol: "MNQH6", volume: 6, avgEntry: 26210, duration: "2m" },
        { date: "2026-04-27", instrument: "ES1!", direction: "LONG", pl: 63, symbol: "MESH6", volume: 8, avgEntry: 5134, duration: "4m" },

        { date: "2026-05-03", instrument: "NQ1!", direction: "LONG", pl: 88, symbol: "MNQH6", volume: 7, avgEntry: 26280, duration: "4m" },
        { date: "2026-05-06", instrument: "NQ1!", direction: "SHORT", pl: -39, symbol: "MNQH6", volume: 5, avgEntry: 26330, duration: "2m" },
        { date: "2026-05-10", instrument: "ES1!", direction: "LONG", pl: 54, symbol: "MESH6", volume: 7, avgEntry: 5146, duration: "3m" },
        { date: "2026-05-13", instrument: "NQ1!", direction: "LONG", pl: 121, symbol: "MNQH6", volume: 10, avgEntry: 26402, duration: "6m" },
        { date: "2026-05-17", instrument: "NQ1!", direction: "SHORT", pl: -58, symbol: "MNQH6", volume: 8, avgEntry: 26490, duration: "3m" },
        { date: "2026-05-20", instrument: "ES1!", direction: "SHORT", pl: 35, symbol: "MESH6", volume: 5, avgEntry: 5158, duration: "3m" },
        { date: "2026-05-24", instrument: "NQ1!", direction: "LONG", pl: 104, symbol: "MNQH6", volume: 9, avgEntry: 26540, duration: "5m" },
        { date: "2026-05-28", instrument: "NQ1!", direction: "LONG", pl: 73, symbol: "MNQH6", volume: 6, avgEntry: 26605, duration: "4m" }
    ];

    const normalizeTrades = (sourceTrades) => sourceTrades.map((trade) => {
        const isLong = trade.direction === "LONG";
        const exitShift = trade.pl >= 0 ? (isLong ? 16 : -10) : (isLong ? -11 : 14);
        return {
            ...trade,
            openTime: trade.date,
            closeTime: trade.date,
            avgEntry: `${trade.avgEntry}`,
            avgClose: `${trade.avgEntry + exitShift}`
        };
    });

    const loadTrades = async () => {
        try {
            const response = await fetch("data/trades.sample.json", { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Unable to load sample data (${response.status})`);
            }
            const payload = await response.json();
            if (!Array.isArray(payload) || payload.length === 0) {
                throw new Error("Sample data has invalid format.");
            }
            return normalizeTrades(payload);
        } catch (error) {
            console.warn("Fallback to embedded trade seed:", error);
            return normalizeTrades(tradeSeed);
        }
    };

    const tradesData = await loadTrades();

    const translations = {
        cz: {
            "nav-dashboard": "Nástěnka",
            "nav-trades": "Obchody",
            "nav-stats": "Statistiky",
            "nav-gallery": "Journal",
            "nav-settings": "Nastavení",
            "logout": "Odhlásit",
            "dashboard-title": "Trading Journal Dashboard",
            "total-pl": "Celkové P/L",
            "winrate": "Úspěšnost",
            "avg-win": "Průměrný zisk",
            "avg-loss": "Průměrná ztráta",
            "equity-curve": "Křivka kapitálu",
            "trades-overview": "Přehled obchodů",
            "th-date": "Datum",
            "th-instrument": "Instrument",
            "th-direction": "Směr",
            "th-pl": "P/L",
            "dir-long": "Long",
            "dir-short": "Short",
            "trades-title": "Přehled obchodů",
            "closed-trades-heading": "Uzavřené obchody",
            "search-placeholder": "Hledat symbol...",
            "legend-profit": "Zisk",
            "legend-loss": "Ztráta",
            "legend-payout": "Výplata",
            "day-mon": "Po",
            "day-tue": "Ut",
            "day-wed": "St",
            "day-thu": "Ct",
            "day-fri": "Pa",
            "day-sat": "So",
            "day-sun": "Ne",
            "th-symbol": "Symbol",
            "th-volume": "Objem",
            "th-open": "Otevřeno",
            "th-entry": "Vstup",
            "th-bias": "Směr",
            "th-duration": "Trvání",
            "th-close": "Zavřeno",
            "th-avgclose": "Výstup",
            "th-profit": "Zisk",
            "stats-title-main": "Statistiky",
            "stats-alltime": "Celé období",
            "stats-sync": "Synchronizovat",
            "stats-best": "Nejlepší obchod",
            "stats-worst": "Nejhorší obchod",
            "stats-avgwin": "Průměrný zisk",
            "stats-avgloss": "Průměrná ztráta",
            "stats-trades": "Počet obchodů",
            "stats-contracts": "Kontrakty",
            "stats-winrate": "Úspěšnost",
            "stats-pf": "Profit Factor",
            "stats-equity": "Křivka kapitálu",
            "gallery-title-main": "Journal",
            "gallery-add-title": "Zaznamenej si trade",
            "gallery-add-btn": "Ulozit zaznam",
            "gallery-your-title": "Tvoje zaznamy",
            "journal-pick-btn": "Vyber screenshoty tradu",
            "journal-no-file": "Neni vybran zadny soubor",
            "journal-files-selected": "souboru vybrano",
            "settings-title": "Nastavení",
            "settings-sub": "Uprav profil, vychozi obchodni nastaveni a predvolby aplikace.",
            "profile": "Profil",
            "profile-badge": "Simulovany",
            "profile-desc": "Osobni obchodni denik",
            "username": "Uzivatelske jmeno",
            "email": "E-mail",
            "new-password": "Nove heslo",
            "change-btn": "Zmenit",
            "trading-defaults": "Vychozi nastaveni",
            "currency": "Mena",
            "currency-sub": "Vyber jak se ma zobrazovat P/L v aplikaci.",
            "risk-per-trade": "Vychozi riziko na obchod",
            "risk-sub": "Pouzije se pro budouci sablony obchodu.",
            "daily-loss": "Denni limit ztraty",
            "max-loss": "Maximalni ztrata",
            "profit-target": "Cilovy zisk",
            "app-prefs": "Predvolby aplikace",
            "dark-mode": "Tmavy rezim",
            "dark-mode-sub": "Lepse pro obchodovani v noci.",
            "language": "Jazyk",
            "lang-sub": "Vyber jazyk rozhrani.",
            "date-format": "Format data",
            "date-sub": "Ovlivnuje obchody, statistiky i kalendar.",
            "weekly-summary": "Tydenni souhrn",
            "weekly-summary-sub": "Dostavej tydenni vykonnostni recap.",
            "danger-zone": "Nebezpecna zona",
            "reset-trades": "Resetovat vsechny obchody",
            "reset-trades-sub": "Odstrani vsechny obchody z deniku.",
            "delete-acc": "Smazat ucet",
            "delete-acc-sub": "Tato akce je trvala.",
            "save-btn": "Ulozit zmeny",
            "save-confirmed": "Ulozeno",
            "save-success": "Nastavení byla úspěšně uložena.",
            "login-title": "Přihlášení",
            "auth-hero-title": "EduTrade",
            "auth-hero-subtitle": "Vždy se můžeš zlepšit",
            "auth-theme-btn": "Změnit pozadí",
            "auth-about-btn": "Video",
            "about-video-help": "Sem nahraj sve video o projektu.",
            "video-mute-btn": "Ztlumit zvuk",
            "video-unmute-btn": "Zapnout zvuk",
            "login-btn": "Přihlásit se",
            "register-link": "Registrovat",
            "no-account": "Nemáš účet?",
            "password": "Heslo",
            "email-placeholder": "zadej email",
            "password-placeholder": "zadej heslo",
            "register-title": "Registrace",
            "register-btn": "Registrovat",
            "has-account": "Už máš účet?",
            "login-link": "Přihlásit se",
            "import-title": "Import dat",
            "import-sub": "Importuj data z CSV nebo Excel souboru.",
            "import-card-text": "Sem prijde rozhrani pro import.",
            "import-nav": "Import",
            "auth-required": "Zadej email a heslo.",
            "register-success": "Registrace probehla uspesne.",
            "gallery-no-image": "Vyber aspon jeden obrazek.",
            "gallery-delete-confirm": "Opravdu chces tento obrazek smazat?",
            "gallery-delete-btn": "Smazat",
            months: ["Leden", "Unor", "Brezen", "Duben", "Kveten", "Cerven", "Cervenec", "Srpen", "Zari", "Rijen", "Listopad", "Prosinec"]
        },
        en: {
            "nav-dashboard": "Dashboard",
            "nav-trades": "Trades",
            "nav-stats": "Statistics",
            "nav-gallery": "Journal",
            "nav-settings": "Settings",
            "logout": "Logout",
            "dashboard-title": "Trading Journal Dashboard",
            "total-pl": "Total P/L",
            "winrate": "Winrate",
            "avg-win": "Average Win",
            "avg-loss": "Average Loss",
            "equity-curve": "Equity Curve",
            "trades-overview": "Trades Overview",
            "th-date": "Date",
            "th-instrument": "Instrument",
            "th-direction": "Direction",
            "th-pl": "P/L",
            "dir-long": "Long",
            "dir-short": "Short",
            "trades-title": "Trades Overview",
            "closed-trades-heading": "Closed Trades",
            "search-placeholder": "Search symbol...",
            "legend-profit": "Profit",
            "legend-loss": "Loss",
            "legend-payout": "Payout",
            "day-mon": "Mon",
            "day-tue": "Tue",
            "day-wed": "Wed",
            "day-thu": "Thu",
            "day-fri": "Fri",
            "day-sat": "Sat",
            "day-sun": "Sun",
            "th-symbol": "Symbol",
            "th-volume": "Volume",
            "th-open": "Open",
            "th-entry": "Entry",
            "th-bias": "Bias",
            "th-duration": "Duration",
            "th-close": "Close",
            "th-avgclose": "Exit",
            "th-profit": "Profit",
            "stats-title-main": "Statistics",
            "stats-alltime": "All Time",
            "stats-sync": "Sync",
            "stats-best": "Best Trade",
            "stats-worst": "Worst Trade",
            "stats-avgwin": "Avg. Win",
            "stats-avgloss": "Avg. Loss",
            "stats-trades": "No. of Trades",
            "stats-contracts": "Contracts",
            "stats-winrate": "Win Rate",
            "stats-pf": "Profit Factor",
            "stats-equity": "Equity Curve",
            "gallery-title-main": "Journal",
            "gallery-add-title": "Record Your Trade",
            "gallery-add-btn": "Save Trade Record",
            "gallery-your-title": "Your Journal Entries",
            "journal-pick-btn": "Choose trade screenshots",
            "journal-no-file": "No file selected",
            "journal-files-selected": "files selected",
            "settings-title": "Settings",
            "settings-sub": "Customize profile, trading defaults and app preferences.",
            "profile": "Profile",
            "profile-badge": "Simulated",
            "profile-desc": "Personal trading journal",
            "username": "Username",
            "email": "Email",
            "new-password": "New password",
            "change-btn": "Change",
            "trading-defaults": "Trading Defaults",
            "currency": "Currency",
            "currency-sub": "Choose how P/L is displayed in the app.",
            "risk-per-trade": "Default risk per trade",
            "risk-sub": "Used for future trade templates.",
            "daily-loss": "Daily loss limit",
            "max-loss": "Max loss limit",
            "profit-target": "Profit target",
            "app-prefs": "App Preferences",
            "dark-mode": "Dark Mode",
            "dark-mode-sub": "Better for trading at night.",
            "language": "Language",
            "lang-sub": "Choose the UI language.",
            "date-format": "Date format",
            "date-sub": "Affects trades, statistics and calendar.",
            "weekly-summary": "Weekly Summary",
            "weekly-summary-sub": "Receive a weekly performance recap.",
            "danger-zone": "Danger Zone",
            "reset-trades": "Reset all trades",
            "reset-trades-sub": "Removes all trades from your journal.",
            "delete-acc": "Delete account",
            "delete-acc-sub": "This action is permanent.",
            "save-btn": "Save Changes",
            "save-confirmed": "Saved",
            "save-success": "Settings were saved successfully.",
            "login-title": "Login",
            "auth-hero-title": "EduTrade",
            "auth-hero-subtitle": "You can always improve",
            "auth-theme-btn": "Change Background",
            "auth-about-btn": "Video",
            "about-video-help": "Upload your project video here.",
            "video-mute-btn": "Mute",
            "video-unmute-btn": "Unmute",
            "login-btn": "Sign in",
            "register-link": "Register",
            "no-account": "No account?",
            "password": "Password",
            "email-placeholder": "enter email",
            "password-placeholder": "enter password",
            "register-title": "Register",
            "register-btn": "Create account",
            "has-account": "Already have an account?",
            "login-link": "Sign in",
            "import-title": "Import Data",
            "import-sub": "Import your data from CSV or Excel.",
            "import-card-text": "Import interface will be added here.",
            "import-nav": "Import",
            "auth-required": "Enter email and password.",
            "register-success": "Registration successful.",
            "gallery-no-image": "Please select at least one image.",
            "gallery-delete-confirm": "Are you sure you want to delete this image?",
            "gallery-delete-btn": "Delete",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    };

    Object.assign(translations.cz, {
        "tip-total-pl": "Součet zisku a ztrát ze všech obchodů.",
        "tip-winrate": "Procento obchodů, které skončily ziskem.",
        "tip-avg-win": "Průměrný zisk z jednoho ziskového obchodu.",
        "tip-avg-loss": "Průměrná ztráta z jednoho ztrátového obchodu.",
        "tip-equity-curve": "Vývoj tvých výsledků v čase po jednotlivých obchodech.",
        "tip-date": "Datum, kdy byl obchod uzavren.",
        "tip-instrument": "Trh nebo aktivum, které jsi obchodoval.",
        "tip-direction": "Směr obchodu: Long = růst, Short = pokles.",
        "tip-pl": "Profit/Loss, tedy zisk nebo ztrata obchodu.",
        "tip-closed-trades": "Historie uzavrenych obchodu s detaily.",
        "tip-symbol": "Burzovni zkratka instrumentu.",
        "tip-volume": "Pocet kontraktu nebo velikost pozice.",
        "tip-open-time": "Kdy byl obchod otevren.",
        "tip-entry": "Prumerna vstupni cena.",
        "tip-bias": "Planovany nebo skutecny smer obchodu.",
        "tip-duration": "Jak dlouho byl obchod otevreny.",
        "tip-close-time": "Kdy byl obchod uzavren.",
        "tip-avg-close": "Prumerna vystupni cena.",
        "tip-profit": "Konecny vysledek obchodu v penezich.",
        "tip-best-trade": "Nejziskovejsi jednotlivy obchod.",
        "tip-worst-trade": "Nejztratovejsi jednotlivy obchod.",
        "tip-number-of-trades": "Celkovy pocet obchodu v prehledu.",
        "tip-contracts": "Soucet vsech zobchodovanych kontraktu.",
        "tip-profit-factor": "Poměr hrubého zisku k hrubé ztrátě."
    });

    Object.assign(translations.en, {
        "tip-total-pl": "Total profit and loss across all trades.",
        "tip-winrate": "Percentage of trades that ended in profit.",
        "tip-avg-win": "Average profit from one winning trade.",
        "tip-avg-loss": "Average loss from one losing trade.",
        "tip-equity-curve": "How your results evolve over time trade by trade.",
        "tip-date": "Date when the trade was closed.",
        "tip-instrument": "Market or asset you traded.",
        "tip-direction": "Trade direction: Long = up, Short = down.",
        "tip-pl": "Profit/Loss result of a trade.",
        "tip-closed-trades": "History of closed trades with details.",
        "tip-symbol": "Exchange symbol of the instrument.",
        "tip-volume": "Number of contracts or position size.",
        "tip-open-time": "When the trade was opened.",
        "tip-entry": "Average entry price.",
        "tip-bias": "Planned or actual trade direction.",
        "tip-duration": "How long the trade stayed open.",
        "tip-close-time": "When the trade was closed.",
        "tip-avg-close": "Average exit price.",
        "tip-profit": "Final trade result in money.",
        "tip-best-trade": "Single most profitable trade.",
        "tip-worst-trade": "Single largest losing trade.",
        "tip-number-of-trades": "Total number of trades in this view.",
        "tip-contracts": "Sum of all traded contracts.",
        "tip-profit-factor": "Gross profit divided by gross loss."
    });
    const getLang = () => localStorage.getItem(STORAGE_KEYS.lang) || "cz";
    const getTheme = () => localStorage.getItem(STORAGE_KEYS.theme) || "dark";
    const getDateFormat = () => localStorage.getItem(STORAGE_KEYS.dateFormat) || "DD.MM.YYYY";
    const isSettingsPage = () => Boolean(document.getElementById("settingsLanguageSelect"));

    const t = (key, lang = getLang()) => {
        const dict = translations[lang] || translations.en;
        return dict[key] || translations.en[key] || key;
    };

    const formatNumber = (value) => {
        const n = Number(value) || 0;
        const locale = getLang() === "cz" ? "cs-CZ" : "en-US";
        return new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
    };

    const formatPl = (value, withCurrency = true) => {
        const n = Number(value) || 0;
        const prefix = n >= 0 ? "+" : "-";
        const formatted = formatNumber(Math.abs(n));
        return withCurrency ? `${prefix}${formatted} USD` : `${prefix}${formatted}`;
    };

    const formatDateBySetting = (value) => {
        if (!value) return "";
        const parts = String(value).split("-");
        if (parts.length !== 3) return value;
        const [year, month, day] = parts;
        const mode = getDateFormat();
        if (mode === "YYYY-MM-DD") return `${year}-${month}-${day}`;
        if (mode === "MM/DD/YYYY") return `${month}/${day}/${year}`;
        return `${day}.${month}.${year}`;
    };

    const chartInstances = {};
    const saveSound = new Audio(encodeURI("sound/Check button MP.mp3"));
    saveSound.preload = "auto";
    try {
        saveSound.load();
    } catch {
    }

    const buildEquitySeries = (data) => {
        let running = 0;
        return data.map((trade) => {
            running += trade.pl;
            return running;
        });
    };

    const drawLineChart = (canvasId, labels, values) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Chart === "undefined") return;

        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }

        const color = "#3b82f6";
        chartInstances[canvasId] = new Chart(canvas.getContext("2d"), {
            type: "line",
            data: {
                labels,
                datasets: [{
                    data: values,
                    borderColor: color,
                    backgroundColor: "rgba(59,130,246,0.2)",
                    fill: true,
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        ticks: { color: "#9aa4bf" },
                        grid: { color: "rgba(154,164,191,0.18)" }
                    },
                    x: {
                        ticks: { color: "#9aa4bf" },
                        grid: { color: "rgba(154,164,191,0.12)" }
                    }
                }
            }
        });
    };

    const applyTheme = (theme) => {
        const isLight = theme === "light";
        document.body.classList.toggle("light-mode", isLight);
        document.body.classList.toggle("bg-dark", !isLight);
        document.body.classList.toggle("text-light", !isLight);
        document.body.classList.toggle("text-dark", isLight);
        localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    };

    const applyTranslations = () => {
        const lang = getLang();

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            const translated = t(key, lang);
            const infoTip = el.querySelector(".info-tip");

            if (!infoTip) {
                el.textContent = translated;
                return;
            }

            const infoTipMarkup = infoTip.outerHTML;
            el.innerHTML = `${translated} ${infoTipMarkup}`;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            el.setAttribute("placeholder", t(key, lang));
        });

        document.querySelectorAll("[data-i18n-value]").forEach((el) => {
            const key = el.getAttribute("data-i18n-value");
            el.setAttribute("value", t(key, lang));
        });

        document.querySelectorAll("[data-i18n-title]").forEach((el) => {
            const key = el.getAttribute("data-i18n-title");
            el.setAttribute("title", t(key, lang));
        });

        const langBtn = document.getElementById("active-lang") || document.querySelector(".lang-btn");
        if (langBtn) {
            const isCz = lang === "cz";
            if (langBtn.closest(".auth-toolbar")) {
                langBtn.textContent = isCz ? "CZ" : "EN";
            } else {
                langBtn.innerHTML = `<img src="${isCz ? FLAG_CZ : FLAG_EN}"> ${isCz ? "CZ" : "EN"}`;
            }
        }

        const settingsLangSelect = document.getElementById("settingsLanguageSelect");
        if (settingsLangSelect) {
            settingsLangSelect.value = lang;
        }

        document.dispatchEvent(new CustomEvent("app:language-changed", { detail: { lang } }));
    };

    const updateUI = () => {
        applyTheme(getTheme());
        applyTranslations();

        const darkSwitch = document.getElementById("darkModeSwitch");
        if (darkSwitch) {
            darkSwitch.checked = getTheme() === "dark";
        }

        const currencySelect = document.getElementById("currencySelect");
        if (currencySelect) {
            currencySelect.value = localStorage.getItem(STORAGE_KEYS.currency) || "USD";
        }

        const dateFormatSelect = document.getElementById("dateFormatSelect");
        if (dateFormatSelect) {
            dateFormatSelect.value = getDateFormat();
        }
    };

    const initSidebarToggle = () => {
        const toggle = document.getElementById("header-toggle");
        const nav = document.getElementById("nav-bar");
        const header = document.getElementById("header");
        const bodyPd = document.getElementById("body-pd");

        if (!toggle || !nav || !header || !bodyPd) return;

        toggle.addEventListener("click", () => {
            nav.classList.toggle("sidebarshow");
            toggle.classList.toggle("bx-x");
            bodyPd.classList.toggle("body-pd");
            header.classList.toggle("body-pd");
        });
    };

    const renderDashboard = () => {
        const tbody = document.getElementById("dashboardTradesBody");
        if (!tbody) return;

        const dashboardTrades = tradesData.slice(-3).reverse();
        tbody.innerHTML = dashboardTrades.map((trade) => {
            const isWin = trade.pl >= 0;
            const sideClass = trade.direction === "LONG" ? "trade-side-long" : "trade-side-short";
            const rowClass = isWin ? "trade-row-win" : "trade-row-loss";
            return `
            <tr class="${rowClass}">
                <td>${formatDateBySetting(trade.date)}</td>
                <td>${trade.instrument}</td>
                <td><span class="trade-side ${sideClass}" data-i18n="${trade.direction === "LONG" ? "dir-long" : "dir-short"}">${t(trade.direction === "LONG" ? "dir-long" : "dir-short")}</span></td>
                <td><span class="trade-pl ${isWin ? "trade-pl-win" : "trade-pl-loss"}">${formatPl(trade.pl, false)}</span></td>
            </tr>
        `;
        }).join("");

        const total = tradesData.reduce((sum, trade) => sum + trade.pl, 0);
        const wins = tradesData.filter((trade) => trade.pl > 0);
        const losses = tradesData.filter((trade) => trade.pl < 0);

        const totalPL = document.getElementById("totalPL");
        const winrate = document.getElementById("winrate");
        const avgWin = document.getElementById("avgWin");
        const avgLoss = document.getElementById("avgLoss");

        if (totalPL) totalPL.textContent = formatPl(total);
        if (winrate) winrate.textContent = `${Math.round((wins.length / tradesData.length) * 100)} %`;
        if (avgWin) avgWin.textContent = formatPl(wins.length ? wins.reduce((s, t) => s + t.pl, 0) / wins.length : 0);
        if (avgLoss) avgLoss.textContent = formatPl(losses.length ? losses.reduce((s, t) => s + t.pl, 0) / losses.length : 0);

        const dashboardChartData = tradesData.slice(-16);
        drawLineChart("equityChart", dashboardChartData.map((trade) => formatDateBySetting(trade.date)), buildEquitySeries(dashboardChartData));
    };

    const renderStatistics = () => {
        if (!document.getElementById("val-best")) return;

        const wins = tradesData.filter((trade) => trade.pl > 0);
        const losses = tradesData.filter((trade) => trade.pl < 0);
        const grossProfit = wins.reduce((sum, trade) => sum + trade.pl, 0);
        const grossLossAbs = Math.abs(losses.reduce((sum, trade) => sum + trade.pl, 0));

        const best = Math.max(...tradesData.map((trade) => trade.pl));
        const worst = Math.min(...tradesData.map((trade) => trade.pl));
        const avgWin = wins.length ? grossProfit / wins.length : 0;
        const avgLoss = losses.length ? losses.reduce((sum, trade) => sum + trade.pl, 0) / losses.length : 0;
        const winRate = tradesData.length ? (wins.length / tradesData.length) * 100 : 0;
        const profitFactor = grossLossAbs ? grossProfit / grossLossAbs : 0;

        document.getElementById("val-best").textContent = formatPl(best);
        document.getElementById("val-worst").textContent = formatPl(worst);
        document.getElementById("val-avgwin").textContent = formatPl(avgWin);
        document.getElementById("val-avgloss").textContent = formatPl(avgLoss);
        document.getElementById("val-trades").textContent = String(tradesData.length);
        document.getElementById("val-contracts").textContent = String(tradesData.reduce((sum, trade) => sum + trade.volume, 0));
        document.getElementById("val-winrate").textContent = `${Math.round(winRate)}%`;
        document.getElementById("val-pf").textContent = profitFactor.toFixed(2);

        drawLineChart("equityChart", tradesData.map((trade) => formatDateBySetting(trade.date)), buildEquitySeries(tradesData));
    };

    let viewDate = new Date(`${tradesData[tradesData.length - 1].date}T00:00:00`);

    const renderCalendar = () => {
        const grid = document.getElementById("calendar-grid");
        const title = document.getElementById("calendar-month-title");
        if (!grid || !title) return;

        const lang = getLang();
        const monthNames = translations[lang].months;
        title.textContent = `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
        grid.innerHTML = "";

        const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
        const startingPoint = firstDay === 0 ? 6 : firstDay - 1;

        const monthlySummary = tradesData.reduce((acc, trade) => {
            const tradeDate = new Date(`${trade.date}T00:00:00`);
            if (tradeDate.getFullYear() !== viewDate.getFullYear() || tradeDate.getMonth() !== viewDate.getMonth()) {
                return acc;
            }

            const day = tradeDate.getDate();
            if (!acc[day]) {
                acc[day] = { pl: 0, count: 0 };
            }

            acc[day].pl += trade.pl;
            acc[day].count += 1;
            return acc;
        }, {});

        for (let i = 0; i < startingPoint; i += 1) {
            grid.innerHTML += "<div class=\"cal-day empty\"></div>";
        }

        for (let d = 1; d <= daysInMonth; d += 1) {
            const dayTrade = monthlySummary[d];
            if (!dayTrade) {
                grid.innerHTML += `
                    <div class=\"cal-day\">
                        <div class=\"cal-day-number\">${d}</div>
                    </div>
                `;
                continue;
            }

            const statusClass = dayTrade.pl > 60 ? "cal-profit" : dayTrade.pl < 0 ? "cal-loss" : "cal-payout";
            const intensityClass = Math.abs(dayTrade.pl) >= 120 ? "cal-heat-3" : Math.abs(dayTrade.pl) >= 70 ? "cal-heat-2" : "cal-heat-1";
            const signedValue = dayTrade.pl >= 0 ? `+${formatNumber(dayTrade.pl)}` : `-${formatNumber(Math.abs(dayTrade.pl))}`;

            grid.innerHTML += `
                <div class=\"cal-day ${statusClass} ${intensityClass}\">
                    <div class=\"cal-day-number\">${d}</div>
                    <div class=\"cal-day-value\">${signedValue}</div>
                    <div class=\"cal-day-badge\">${dayTrade.count}x</div>
                    <span class=\"cal-day-dot\"></span>
                </div>
            `;
        }
    };

    const renderTradesTable = (data) => {
        const tbody = document.getElementById("closedTradesBody");
        if (!tbody) return;

        tbody.innerHTML = data.map((trade) => {
            const biasKey = trade.direction === "LONG" ? "dir-long" : "dir-short";
            const isWin = trade.pl >= 0;
            const rowClass = isWin ? "trade-row-win" : "trade-row-loss";
            const sideClass = trade.direction === "LONG" ? "trade-side-long" : "trade-side-short";
            return `
                <tr class="${rowClass}">
                    <td><strong>${trade.symbol}</strong></td>
                    <td>${trade.volume}</td>
                    <td class="muted">${formatDateBySetting(trade.openTime)}</td>
                    <td>${trade.avgEntry}</td>
                    <td><span class="trade-side ${sideClass}">${t(biasKey)}</span></td>
                    <td class="muted">${trade.duration}</td>
                    <td class="muted">${formatDateBySetting(trade.closeTime)}</td>
                    <td>${trade.avgClose}</td>
                    <td><span class="trade-pl ${isWin ? "trade-pl-win" : "trade-pl-loss"}">${formatPl(trade.pl, false)}</span></td>
                </tr>
            `;
        }).join("");
    };

    const initTradesPage = () => {
        const prevBtn = document.getElementById("cal-prev");
        const nextBtn = document.getElementById("cal-next");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                viewDate.setMonth(viewDate.getMonth() - 1);
                renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                viewDate.setMonth(viewDate.getMonth() + 1);
                renderCalendar();
            });
        }

        const searchInput = document.getElementById("tradeSearch");
        const sortSelect = document.getElementById("tradeSort");
        let currentSort = "date_desc";
        let currentQuery = "";

        const sortTrades = (data, sortMode) => {
            const sorted = data.slice();
            switch (sortMode) {
                case "date_asc":
                    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case "pl_desc":
                    sorted.sort((a, b) => b.pl - a.pl);
                    break;
                case "pl_asc":
                    sorted.sort((a, b) => a.pl - b.pl);
                    break;
                case "date_desc":
                default:
                    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
            }
            return sorted;
        };

        const applyTradesFilters = () => {
            const filtered = tradesData.filter((trade) =>
                trade.symbol.toLowerCase().includes(currentQuery)
            );
            renderTradesTable(sortTrades(filtered, currentSort));
        };

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                currentQuery = e.target.value.toLowerCase().trim();
                applyTradesFilters();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                currentSort = e.target.value;
                applyTradesFilters();
            });
        }

        renderCalendar();
        applyTradesFilters();
    };

    const rerenderDynamicViews = () => {
        renderDashboard();
        renderStatistics();
        if (document.getElementById("closedTradesBody")) {
            renderTradesTable(tradesData.slice().reverse());
        }
    };

    const initLanguageControls = () => {
        document.querySelectorAll(".lang-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const nextLang = item.getAttribute("data-lang");
                if (!nextLang) return;
                localStorage.setItem(STORAGE_KEYS.lang, nextLang);
                applyTranslations();
                rerenderDynamicViews();
                if (document.getElementById("calendar-grid")) {
                    renderCalendar();
                }
            });
        });
    };

    const initThemeControls = () => {
        const darkSwitch = document.getElementById("darkModeSwitch");
        if (!darkSwitch) return;

        darkSwitch.addEventListener("change", () => {
            if (!isSettingsPage()) {
                applyTheme(darkSwitch.checked ? "dark" : "light");
            }
        });
    };

    const initAuthPageControls = () => {
        const authThemeToggle = document.getElementById("authThemeToggle");
        if (!authThemeToggle) return;

        authThemeToggle.addEventListener("click", () => {
            const nextTheme = getTheme() === "dark" ? "light" : "dark";
            localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
            updateUI();
            rerenderDynamicViews();
        });
    };

    const initAboutVideoControls = () => {
        const aboutVideo = document.getElementById("aboutVideo");
        const volumeToggle = document.getElementById("videoVolumeToggle");
        if (!aboutVideo || !volumeToggle) return;

        const updateVolumeButton = () => {
            volumeToggle.textContent = aboutVideo.muted ? t("video-unmute-btn") : t("video-mute-btn");
        };

        volumeToggle.addEventListener("click", () => {
            aboutVideo.muted = !aboutVideo.muted;
            updateVolumeButton();
        });

        updateVolumeButton();
        document.addEventListener("app:language-changed", updateVolumeButton);
    };

    const initSettingsSave = () => {
        const saveBtn = document.querySelector(".btn-save");
        if (!saveBtn) return;

        let saveResetTimer = null;
        const settingsLangSelect = document.getElementById("settingsLanguageSelect");
        const darkSwitch = document.getElementById("darkModeSwitch");
        const currencySelect = document.getElementById("currencySelect");
        const dateFormatSelect = document.getElementById("dateFormatSelect");

        if (settingsLangSelect) settingsLangSelect.value = getLang();
        if (darkSwitch) darkSwitch.checked = getTheme() === "dark";
        if (currencySelect) currencySelect.value = localStorage.getItem(STORAGE_KEYS.currency) || "USD";
        if (dateFormatSelect) dateFormatSelect.value = getDateFormat();

        saveBtn.addEventListener("click", () => {
            if (currencySelect) {
                localStorage.setItem(STORAGE_KEYS.currency, currencySelect.value);
            }

            if (settingsLangSelect) {
                localStorage.setItem(STORAGE_KEYS.lang, settingsLangSelect.value);
            }

            if (darkSwitch) {
                localStorage.setItem(STORAGE_KEYS.theme, darkSwitch.checked ? "dark" : "light");
            }

            if (dateFormatSelect) {
                localStorage.setItem(STORAGE_KEYS.dateFormat, dateFormatSelect.value);
            }

            updateUI();
            rerenderDynamicViews();
            const showSavedState = () => {
                saveBtn.textContent = `\u2713 ${t("save-confirmed")}`;
                saveBtn.classList.add("btn-success");
                saveBtn.classList.remove("btn-save");

                if (saveResetTimer) {
                    window.clearTimeout(saveResetTimer);
                }

                saveResetTimer = window.setTimeout(() => {
                    saveBtn.textContent = t("save-btn");
                    saveBtn.classList.remove("btn-success");
                    saveBtn.classList.add("btn-save");
                }, 1400);
            };

            let endedHandled = false;
            const onEnded = () => {
                if (endedHandled) return;
                endedHandled = true;
                saveSound.removeEventListener("ended", onEnded);
                showSavedState();
            };

            saveSound.removeEventListener("ended", onEnded);
            saveSound.addEventListener("ended", onEnded);

            try {
                saveSound.pause();
                saveSound.currentTime = 0;
                saveSound.play().catch(() => {
                    onEnded();
                });
            } catch {
                onEnded();
            }

            window.setTimeout(() => {
                if (!endedHandled) {
                    onEnded();
                }
            }, 3000);
        });
    };

    window.appI18n = {
        getLang,
        t
    };

    window.appTrades = tradesData;

    initSidebarToggle();
    initLanguageControls();
    initThemeControls();
    initAuthPageControls();
    initAboutVideoControls();
    initSettingsSave();
    updateUI();
    initTradesPage();
    renderDashboard();
    renderStatistics();
});