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
	app.route('/api/fetchSingleUser/:id')
		.get(userCtrl.fetchUserByIdCtrl)
	app.route('/api/editUser/:id')
		.put(userCtrl.userEditCtrl)
	app.route('/api/deleteUser/:id')
		.delete(userCtrl.deleteUserCtrl)
}