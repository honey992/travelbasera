'use strict';
//var mongoose = require('mongoose');
var db = require('../config/db');

module.exports = function(app){
	require('./users/routes')(app);
	require('./country/routes')(app);
	require('./roles/routes')(app);
	require('./tickets/routes')(app);


	db.mongoose.connection.on('connected', function (err) {
		if(err){
			console.log('Error in Mongoose COnnecrion')
		}else{
			console.log('Mongoose is connected');
		}
	})
}
