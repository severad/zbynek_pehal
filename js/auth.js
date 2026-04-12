const getText = (key) => {
    if (window.appI18n && typeof window.appI18n.t === "function") {
        return window.appI18n.t(key);
    }

    const fallback = {
        "auth-required": "Zadej email a heslo.",
        "register-success": "Registrace probehla uspesne."
    };

    return fallback[key] || key;
};

const showToast = (message) => {
    let toast = document.getElementById("app-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.className = "app-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    window.setTimeout(() => {
        toast.classList.remove("show");
    }, 1700);
};

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        if (email && password) {
            localStorage.setItem("user", email);
            window.location.href = "dashboard.html";
            return;
        }

        showToast(getText("auth-required"));
    });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        if (email && password) {
            localStorage.setItem("user", email);
            showToast(getText("register-success"));
            window.location.href = "dashboard.html";
            return;
        }

        showToast(getText("auth-required"));
    });
}

const user = localStorage.getItem("user");
const welcomeUser = document.getElementById("welcomeUser");
if (welcomeUser) {
    if (!user) {
        window.location.href = "index.html";
    } else {
        welcomeUser.textContent = `Vitej, ${user}`;
    }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
}
