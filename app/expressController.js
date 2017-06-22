
module.exports = function(app){
	app.get('/express', function(request, response){
		response.send('Hello from express\n');
	});
	
	app.get('/*', function(request, response){
		response.send('Hello World.\n');
	})
}






