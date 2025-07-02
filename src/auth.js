export const auth = {
    isAuthenticated: () => !!localStorage.getItem("token"),
    login: (token, usuario) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(usuario))
    }, //hashear o encriptar el token
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    }
};
