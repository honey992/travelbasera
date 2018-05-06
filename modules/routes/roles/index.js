'use strict';
var rolesCtrl = require('./roles');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/addRoles')
		.post(rolesCtrl.addRolesCtrl)
		.put(rolesCtrl.updateRolesCtrl)
	app.route('/api/addRoles/:id')
		.delete(rolesCtrl.deleteRolesCtrl)
	app.route('/api/getRoles')
		.get(rolesCtrl.getRolesCtrl)
	 
}