'use strict';
var inclusionCtrl   = require('./inclusion');
var mongoose        = require('mongoose');
var lib 	   		= require('../../../lib');
var uploadFiles 	= lib.uploadFiles('ss');
var error 	        = require('../../error');



module.exports = function(app){

	app.route('/api/inclusions')
		.get(inclusionCtrl.getInclustionsCtrl, error) 
		.post(uploadFiles.upload, inclusionCtrl.addInclustionsCtrl, error) 
		.put(uploadFiles.upload, inclusionCtrl.updateInclustionsCtrl, error) 
	app.route('/api/inclusions/:id')
		.delete(inclusionCtrl.deleteInclustionsCtrl, error)
}	