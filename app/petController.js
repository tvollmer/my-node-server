var {models, relationships} = require('./db')
var User = models.User;
var Pet = models.Pet;
var Pet_User = relationships.Pet_User;
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
			});
	});
	
	app.post('/pets', function(req, res){
		let newPet = req.body;
		Pet.create(newPet)
		  	.then((upd) => {
				res.send(upd.get());
			})
			.catch(err => {
				res.writeHead( 500 );
				res.end();
				console.log('encountered an err', err);
			});
	});
	
	app.delete('/pets/:petId', function(req, res){
		let petId = req.params.petId;
		Pet.destroy({where: {id: petId}})
			.then(rowsUpdated => {
				console.log('rowsupdated was ', rowsUpdated);
				if ( rowsUpdated === 1 ){
					res.sendStatus(204);
				} else {
					let err = {id: petId, error: 'RecordNotExistsError', message: 'please verify your id.'};
					res.status(409).send(err);		
				}
			})
			.catch(err => {
				res.writeHead( 500 );
				res.end();
				console.log('encountered an err', err);
			});
	});
	
}