
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var html = require('./routes/html');
var ejs = require('ejs');
var db = require('./db');
var login = require('./routes/login');
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

app.get('/', routes.index);
app.get('/payin', routes.payin);
app.get('/payout', routes.payout);
app.post('/create', routes.create);
app.post('/update/:id', routes.update);
app.get('/destroy/:id', routes.destroy);
app.get('/login', login.login);
app.post('/loginin', login.loginin);

// app.get('/dall', routes.destroyAll);
// app.get('/uall', routes.updateAll);
app.get('/demo', user.demo);
app.get('/bills/get', user.bills);
app.post('/bill/create', user.billCreate);
app.put('/bill/update', user.billUpdate); 
app.delete('/bill/remove', user.billRemove); 

// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

app.get('/test', html.test);
app.get('/getTodos', html.getTodos);
app.post('/todo/create', html.newTodo);
app.put('/todo/update', html.updateTodo);
app.delete('/todo/remove', html.removeTodo);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
