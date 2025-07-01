import { renderRoute } from './router.js';
import { auth } from './auth.js';

window.handleLogin = () => {
  auth.login();
  location.hash = "/dashboard";
};

document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.logout();
  location.hash = "/login";
});

window.addEventListener("load", renderRoute);
window.addEventListener("hashchange", renderRoute);
