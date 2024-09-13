const express = require('express');
const session = require('express-session');
const app = express();
require('dotenv').config();

// Configuro session
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: false
}));

// Llamo a las rutas
const homeRouter = require('./routes/homeRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const viewUserRouter = require('./routes/viewUserRouter.js');

// Recursos estáticos
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Rutas
app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', viewUserRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server linstening on port http://localhost:${PORT} 🚀`);
});
