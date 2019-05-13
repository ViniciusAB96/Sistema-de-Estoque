const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();
const users = require('./routes/users');
const estoque = require('./routes/estoque');

//conectando com o MongoDB utilizando mongoose
mongoose.connect(config.database);

// On connection.

mongoose.connection.on('connected', () =>{
    console.log('Database conectado: ' + config.database);
});

//On Error
mongoose.connection.on('error', () =>{
    console.log('Database erro: ' + err);
});


//Número da porta
const port = 9855;

//Cors Midleware
app.use(cors()); //utilizando cors para liberar acesso para qualquer domínio. Sem isso eu não consigo acessar a minha aplicação fora do mesmo domínio


//Colocando os arquivos estáticos necessários.
app.use(express.static(path.join(__dirname, 'public')));


//Body Parser Middleware
app.use(bodyParser.json());


//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);





app.use('/users', users);
app.use('/estoque', estoque);
//Index
app.get('/', (req, res) => {
    res.send("Endpoint inválido");
});


//Start sever
app.listen(port, () => {
    console.log("Servidor iniciado na porta: 9855");
})


