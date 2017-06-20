const expressController = require('./expressController');
const fooController = require('./fooController');

module.exports = function(app){
	expressController(app);
	fooController(app);
}