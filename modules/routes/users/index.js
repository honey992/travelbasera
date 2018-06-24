'use strict';
var usersCtrl = require('./users');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/v1/api/register')
		.post(usersCtrl.registerUserCtrl, error) 
	app.route('/v1/api/login')
		.post(usersCtrl.loginUserCtrl, error) 
 
}	