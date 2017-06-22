var {models} = require('./db')
var User = models.User;
var Pet = models.Pet;

module.exports = function(app){
	app.get('/express', function(request, response){
		response.send('Hello from express')
	});
	
	app.get('/pets', function(request, response){
		Pet.findAll().then(pets => {
			response.send(pets);
		})
	})
}






