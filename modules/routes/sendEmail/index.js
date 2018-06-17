'use strict';
var sendEmailCtrl = require('./sendEmail');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/sendEmail')
		.post(sendEmailCtrl.sendEmailCtrl, error)	 
}