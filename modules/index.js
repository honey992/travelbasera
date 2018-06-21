'use strict';
//var mongoose = require('mongoose');
var db = require('../config/db');

module.exports = function(app){
	require('./routes/users')(app);
	require('./routes/country')(app);
	require('./routes/state')(app);
	require('./routes/city')(app);
	require('./routes/roles')(app);
	require('./routes/banner')(app);
	require('./routes/testimonials')(app);
	require('./routes/about')(app);
	require('./routes/contact')(app);
	require('./routes/inclusions')(app);
	require('./routes/package')(app);
	require('./routes/category')(app);
	require('./routes/sendEmail')(app);
	require('./routes/termAndConditions')(app);
	require('./routes/faq')(app);
	//require('./routes/career')(app);

	db.mongoose.connection.on('connected', function (err) {
		if(err){
			console.log('Error in Mongoose COnnecrion')
		}else{
			console.log('Mongoose is connected');
		}
	})
}
