'use strict';
var userCtrl = require('./users');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/signup')
		.post(userCtrl.userSignupCtrl)
	app.route('/api/login')
		.post(userCtrl.userLoginCtrl) 

	app.route('/api/getAllUsers')
		.get(userCtrl.getAllUsersCtrl)
	app.route('/api/changePassword')
		.put(userCtrl.changePasswordCtrl)
}