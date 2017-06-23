var {models} = require('./db')
var User = models.User;
var Pet = models.Pet;
//const {OptimisticLockError} = require('sequelize/lib/errors');

module.exports = function(app){
	app.get('/pets', function(request, response){
		Pet.findAll({
			attributes: ['id', 'pet_name', 'created_at', 'updated_at', 'version'],
			include:[{model: User}]})
			.then(pets => {
				response.send(pets);
			})
	});
	
	app.put('/pets/:petId', function(req, res){
		let newPetWithOldVersion = req.body;
		let petId = req.params.petId;
		let where = { id: petId, version: newPetWithOldVersion.version };
		Pet.update(
			{pet_name: newPetWithOldVersion.pet_name, version: newPetWithOldVersion.version + 1 },
			{where: where})
			.then(rowsUpdated => {
				if ( rowsUpdated[0] === 1 ){
					res.sendStatus(204);
				} else {
					//throw new OptimisticLockError({modelName: Pet, values: newPetWithOldVersion, where: where});
					let err = Object.assign({id: petId}, newPetWithOldVersion, {error: 'OptimisticLockError', message: 'either refresh your version, or verify your id.'});
					res.status(409).send(err);		
				}
			})
			.catch(err => {
				res.writeHead( 500 );
				res.end();
				console.log('encountered an err', err);
			})
	});
	
}