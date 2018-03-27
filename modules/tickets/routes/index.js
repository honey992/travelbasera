'use strict';
var addCtrl = require('./adds');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/addnew')
		.post(addCtrl.addCtrl)
		.get(addCtrl.getAdds) 
}