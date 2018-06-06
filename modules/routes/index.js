'use strict';

module.exports = function(app){
	require('./users')(app);
	require('./roles')(app);
	require('./country')(app);
	require('./state')(app);
	require('./city')(app);
}