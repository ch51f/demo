/**
 * Module dependencies.
 */

var express = require('express');
// var routes = require('./routes');
var fch = require("./routes/fch");

// var todo = require('./routes/todo');
var todo = require('./routes/pg-todo');

// var login = require('./routes/login');
var login = require('./routes/pg-login');

// var bill = require('./routes/bill');
var bill = require('./routes/pg-bill');


// var bBill = require('./routes/b-bill');
var bBill = require('./routes/pg-b-bill');

var lab = require('./routes/lab');


var http = require('http');
var path = require('path');
var partials = require('express-partials');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
// app.use(routes.get_user);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

app.get('/', fch.welcome);
app.get("/index", fch.index);
app.get("/lab", fch.laboratory);
app.get("/about", fch.about);

app.get('/backbone/todos', todo.todos);
app.get('/getTodos', todo.getTodos);
app.post('/todo/create', todo.newTodo);
app.put('/todo/update', todo.updateTodo);
app.delete('/todo/remove', todo.removeTodo);

app.get('/bills/login', login.login);
app.post('/bills/loginin', login.loginin);

app.get('/bills', bill.bills);
app.get('/bills/payin', bill.payin);
app.get('/bills/payout', bill.payout);
app.post('/bills/create', bill.create);
app.post('/bills/update/:id', bill.update);
app.get('/bills/destroy/:id', bill.destroy);

app.get('/backbone/bills', bBill.index);
app.get('/backbone/bills/get', bBill.bills);
app.post('/backbone/bill/create', bBill.billCreate);
app.put('/backbone/bill/update', bBill.billUpdate); 
app.delete('/backbone/bill/remove', bBill.billRemove); 

app.get('/lab/blindify', lab.blindify);
app.get('/lab/carousel', lab.carousel);
app.get('/lab/dialog', lab.dialog);
app.get('/lab/drag', lab.drag);
app.get('/lab/gallery', lab.gallery);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
