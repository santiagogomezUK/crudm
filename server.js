const { urlencoded } = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRouter = require('./routes/usuarios.routes');
//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api', usuariosRouter);

module.exports = app;