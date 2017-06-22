var {models} = require('./db')
var User = models.User;
var Pet = models.Pet;

module.exports = function(app){
	app.get('/pets', function(request, response){
		Pet.findAll({
			attributes: ['id', 'pet_name', 'created_at', 'updated_at', 'version'],
			include:[{model: User}]})
			.then(pets => {
				response.send(pets);
			})
	})
	
}