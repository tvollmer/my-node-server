const expressController = require('./expressController');
const userController = require('./userController');
const petController = require('./petController');

module.exports = function(app){
	userController(app);
	petController(app);
	expressController(app);
}