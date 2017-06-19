 // Load the necessary servers.
var util = require('util');
var express = require( "express" );

const port = 3000;
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'pass1word', {
	host: 'localhost',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 1,
		idle: 10000
	}	
});

const User = sequelize.define('userPerson', {
  user_name: Sequelize.STRING,
  birthday: Sequelize.DATE
}, {
	tableName: 'my_user_persons',
	underscored: true,
	version: true
});

const Pet = sequelize.define('pet', {
	pet_name: Sequelize.STRING
}, {
	tableName: 'my_pets',
	underscored: true,
	version: true
});

const Pet_User = Pet.belongsTo(User);
const User_Pets = User.hasMany(Pet);

sequelize.sync({force: true})
  .then(() => User.create({
    user_name: 'janedoe',
    birthday: new Date(1980, 6, 20),
	pets: [{pet_name:'oreo'},{pet_name:'gema'}]
  }, {
	include: [{
		association: User_Pets
	}]
  }))
  .then(jane => {
    console.log(jane.get({
          plain: true
        }));
  });


app.get('/express', function(request, response){
	response.send('Hello from express')
});

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

app.listen(port, (err) => {
	if (err) {
	    return console.log('something bad happened', err)
	  }

	  console.log(`server is listening on ${port}`)
});









