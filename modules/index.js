'use strict';
//var mongoose = require('mongoose');
var db = require('../config/db');

module.exports = function(app){
	require('./routes/users')(app);
	require('./routes/country')(app);
	require('./routes/state')(app);
	require('./routes/roles')(app);
	require('./routes/banner')(app);
	require('./routes/testimonials')(app);
	require('./routes/about')(app);
	require('./routes/contact')(app);


	db.mongoose.connection.on('connected', function (err) {
		if(err){
			console.log('Error in Mongoose COnnecrion')
		}else{
			console.log('Mongoose is connected');
		}
	})
}