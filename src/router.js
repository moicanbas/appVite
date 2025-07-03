import { auth } from './auth.js';
import { editTask } from './controllers/crudFunctions.js';

let usuarios = JSON.parse(localStorage.getItem("usuarios"))
let userLoggeado = JSON.parse(localStorage.getItem("user"))
let tasks = JSON.parse(localStorage.getItem("tareas"))

const routes = {
    "/": "/src/views/home.html",
    "/login": "/src/views/login.html",
    "/register": "/src/views/register.html",
    "/task": "/src/views/task.html",
};

export async function renderRoute() {
    const path = location.hash.slice(1) || "/";
    const app = document.getElementById("app");
    const isAuth = auth.isAuthenticated();

    if (!isAuth && path !== "/login") {
        if (path !== "/register") {
            location.hash = "/login";
            return;
        }
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
                usuarios.forEach(usuario => {
                    if (usuario.username === username && usuario.password === password) {
                        auth.login("12345-asdvc2-987msd", usuario);
                        location.hash = "/";
                        return
                    } else {
                        error.style.display = "block";
                    }
                })
            });

            document.getElementById("sign-up").addEventListener("click", () => {
                location.hash = "/register"
            })
        }

        if (path === "/register") {
            const form = document.getElementById("registerForm");
            form?.addEventListener("submit", (e) => {
                e.preventDefault();

                const username = form.username.value.trim();

                // Simulación de validación simple
                const userExist = usuarios.find(usuario => usuario.username === username)
                if (userExist) {
                    alert(`${username} ya existe, intenta con otro`)
                } else {
                    usuarios.push(
                        {
                            "username": username,
                            "password": form.password.value.trim(),
                            "name": form.name.value.trim(),
                            "lastname": form.lastname.value.trim(),
                            "role": "gestor",
                        }
                    )
                    localStorage.setItem("usuarios", JSON.stringify(usuarios))
                    alert(`${username} se creó exitosamente!`)
                    form.reset()
                    location.hash = "/login"
                }
            });
        }

        if (path === "/") {
            if (userLoggeado.role === "admin") {
                document.getElementById("create-tasks").hidden = false

                const tbody = document.querySelector("#tasks-table tbody");
                tbody.innerHTML = "";

                tasks.forEach(task => {
                    const fila = document.createElement("tr");

                    fila.innerHTML = `
                            <td>${task.id}</td>
                            <td>${task.titulo}</td>
                            <td>${task.estado}</td>
                            <td>${task.responsable}</td>
                            <td>${task.descripcion}</td>
                            <td>
                                <button class="btn-editar" data-id="${task.id}">Editar</button>
                                <button onclick="eliminarUsuario(${task.id})">Eliminar</button>
                            </td>
                        `;

                    tbody.appendChild(fila);
                });
                
                tbody.querySelectorAll('.btn-editar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.dataset.id;
                        editTask(id);
                    });
                });
            }

        }
    } catch (err) {
        app.innerHTML = "<h2>Error al cargar la vista</h2>";
    }
}
