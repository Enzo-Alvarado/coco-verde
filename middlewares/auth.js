function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    // Si el usuario está autenticado, continuar con la siguiente función
    return next();
  }
  // Si no está autenticado, redirigir a la página de inicio de sesión
  res.redirect("/auth");
}

module.exports = isAuthenticated;
