function checkAuth(req, res, next) {
    if (req.session.userToLogin) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = checkAuth;