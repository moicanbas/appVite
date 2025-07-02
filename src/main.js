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
  renderRoute()
});
window.addEventListener("hashchange", renderRoute);
