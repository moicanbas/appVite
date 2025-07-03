import { renderRoute } from './router.js';
import { auth } from './auth.js';

window.handleLogin = () => {
  auth.login();
  location.hash = "/";
};

document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.logout();
  location.hash = "/login";
});

window.addEventListener("load", () => {
  localStorage.setItem("usuarios", JSON.stringify(
    [{
      "username": "juancho.rois",
      "name": "Juancho",
      "lastname": "Rois",
      "password": "12345",
      "role": "admin"
    }]
  )
  )
  localStorage.setItem("tareas", JSON.stringify(
    [
      {
        "id": 1,
        "titulo": "programar",
        "estado": "por hacer",
        "responsable": "Fabian",
        "descripcion": "Programar una SPA",
      },
      {
        "id": 2,
        "titulo": "cocinar",
        "estado": "en progreso",
        "responsable": "Yoelmis",
        "descripcion": "Preparar el desayuno",
      },
      {
        "id": 3,
        "titulo": "dormir",
        "estado": "hecho",
        "responsable": "Walter",
        "descripcion": "Dormir 8 horas",
      }
    ])
  )
  renderRoute()
});


window.addEventListener("hashchange", renderRoute);
