var {User, Pet} = require('./db')

module.exports = function(app){
	app.get('/*', function( request, response ){
		// Create a SUPER SIMPLE response.

		User.findAll({raw:true,include:[{model: Pet}]}) // doesn't return the result quite the way I had expected
		.then(users => {
		    //console.log(users)
			response.writeHead( 200, {"content-type": "text/plain"} );
			response.write( "Hellow world from AWS!\n");
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