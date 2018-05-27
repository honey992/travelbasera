var express 		= require('express');
var bodyParser 		= require('body-parser');
var logger 			= require('morgan');
var jwt				=	require('jsonwebtoken');
var multer 			= require('multer');
var crypto			= require('crypto');
var path 			= require('path');
var errorHandler    = require('errorhandler');
var app 			= express();
var server 			= require('http').createServer(app);
var errorFn         = require('./modules/error');
var middleWare      = require('./lib').middlewares;
var commonConf      = require('./config/common');
var jwtSecret       = commonConf.JWTKEY;


app.use(logger('dev'));

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb'}));

app.use(errorFn);
app.set('env','development')  ;
app.set('views', path.join(__dirname, 'public/view'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, '/')));

 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.use(function(req, res, next){
 	var _url = req.url;
 	var url_method = req.method;
 	var token = req.headers.authorization;
 	req.body.metadata = {}
 	console.log(req.method+" "+req.url);
 	debugger;
 	if((_url != '/api/login' && url_method == 'POST' )  && (_url != '/api/signup' && url_method == 'POST')){
 		var currentUser = jwt.verify(token.split('Bearer ')[1], jwtSecret);
 		req.body.metadata['created_by'] = { id:currentUser._id, name : currentUser.firstname };
 		 
 		console.log('Yes')
 	}else{
 		console.log('No')
 	}
 
next();
}
 
)

 //devlopment config
if (app.get('env') === 'development') {
    app.use(errorHandler());
}
require('./modules')(app);
 
app.all('*', function(req, res) {
    res.sendfile('public/view/index.html');  
});

server.on('error', function(err){
	process.exit(1);
}).listen(app.get('port'), function(){
	console.log('App is running at: '+app.get('port'))
});

module.exports = app;