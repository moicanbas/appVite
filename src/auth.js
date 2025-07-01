export const auth = {
  isAuthenticated: () => !!localStorage.getItem("token"),
  login: () => localStorage.setItem("token", "12345-abcd-xyz"), //hashear o encriptar el token
  logout: () => localStorage.removeItem("token") 
};
