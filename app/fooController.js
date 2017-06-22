var {models} = require('./db')
var User = models.User;
var Pet = models.Pet;

module.exports = function(app){
	app.get('/*', function( request, response ){
		User.findAll({include:[{model: Pet}]}) // doesn't return the result quite the way I had expected
			.then(users => {
			    //console.log(users)
				response.writeHead( 200, {"content-type": "text/plain"} );
				response.write( "Hellow world from AWS! Again!\n");
				response.write("users : " + JSON.stringify(users) + "\n")
				response.end();
			})
			.catch(function(err){
				response.writeHead( 500 );
				response.end();
				console.log('encountered an err', err);
			});
	});
	
}