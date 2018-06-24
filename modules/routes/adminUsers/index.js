'use strict';
var userCtrl = require('./users');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/signup')
		.post(userCtrl.userSignupCtrl, error)
	app.route('/api/login')
		.post(userCtrl.userLoginCtrl, error) 
	app.route('/api/getAllUsers')
		.get(userCtrl.getAllUsersCtrl, error)
	app.route('/api/changePassword')
		.put(userCtrl.changePasswordCtrl, error)
	app.route('/api/fetchSingleUser/:id')
		.get(userCtrl.fetchUserByIdCtrl, error)
	app.route('/api/editUser/:id')
		.put(userCtrl.userEditCtrl, error)
	app.route('/api/deleteUser/:id')
		.delete(userCtrl.deleteUserCtrl, error)
}