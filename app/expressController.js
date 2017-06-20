var {User, Pet} = require('./db')

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






