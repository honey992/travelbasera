'use strict';
var rolesCtrl = require('./roles');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/addRoles')
		.post(rolesCtrl.addRolesCtrl, error)
		.put(rolesCtrl.updateRolesCtrl, error)
	app.route('/api/addRoles/:id')
		.delete(rolesCtrl.deleteRolesCtrl, error)
	app.route('/api/getRoles')
		.get(rolesCtrl.getRolesCtrl, error)
	 
}