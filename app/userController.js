var {models} = require('./db')
var User = models.User;
var Pet = models.Pet;

module.exports = function(app){
	app.get('/users', function( request, response ){
		User.findAll({include:[{model: Pet}]})
			.then(users => { 
				response.send(users); 
			})
			.catch(function(err){
				response.writeHead( 500 );
				response.end();
				console.log('encountered an err', err);
			});
	});
	
	app.get('/users/:userId', function( request, response ){
		User.findById(request.params.userId, {include:[{model: Pet}]})
			.then(users => { 
				response.send(users); 
			})
			.catch(function(err){
				response.writeHead( 500 );
				response.end();
				console.log('encountered an err', err);
			});
	});
	
}