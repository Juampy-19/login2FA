module.exports  =  {
    viewUser: (req, res) => {
        const user = req.session.userToLogin;
        res.render('viewUser', { user });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al cerrar sesión');
            }
            res.redirect('/');
        })
    }
}