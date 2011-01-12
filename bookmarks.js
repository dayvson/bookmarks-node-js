var express = require('express');
var sys = require('sys');
var app = express.createServer();
var HomeController = require('./controllers/home').HomeController;
app.configure(function() {
    app.use(express.logger());
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.set('partials'   , __dirname + '/views/partials');
    app.use(express.staticProvider(__dirname + '/public'));
    app.set('view options', {
        layout: 'layout'
    });
});

//Rotas de controle
app.get("/", HomeController.index);
app.get('/search', HomeController.search);
app.get("/list", HomeController.listAll);
app.put("/save", HomeController.save);
app.get("/create", HomeController.create);
app.get("/remove/:id", HomeController.remove);

//Inicializa o Servidor
app.listen(3000);
console.log("Server on port %s", app.address().port);