import { auth } from './auth.js';

const routes = {
    "/": "/src/views/home.html",
    "/login": "/src/views/login.html",
    "/dashboard": "/src/views/dashboard.html"
};

export async function renderRoute() {
    const path = location.hash.slice(1) || "/";
    const app = document.getElementById("app");
    const isAuth = auth.isAuthenticated();

    if (!isAuth && path !== "/login") {
        location.hash = "/login";
        return;
    }

    if (isAuth && path === "/login") {
        location.hash = "/";
        return;
    }

    const file = routes[path];
    if (!file) {
        app.innerHTML = "<h2>Página no encontrada</h2>";
        return;
    }

    try {
        const res = await fetch(file);
        const html = await res.text();
        app.innerHTML = html;
        document.getElementById("logoutBtn").style.display = isAuth ? "inline" : "none";

        if (path === "/login") {
            const form = document.getElementById("loginForm");
            const error = document.getElementById("loginError");

            form?.addEventListener("submit", (e) => {
                e.preventDefault();

                const username = form.username.value.trim();
                const password = form.password.value.trim();

                // Simulación de validación simple
                if (username === "admin" && password === "1234") {
                    auth.login();
                    location.hash = "/dashboard";
                } else {
                    error.style.display = "block";
                }
            });
        }
    } catch (err) {
        app.innerHTML = "<h2>Error al cargar la vista</h2>";
    }
}
