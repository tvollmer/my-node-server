const Sequelize = require('sequelize');

console.log('called once here');

const sequelize = new Sequelize('postgres', 'postgres', 'pass1word', {
	host: 'localhost',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 1,
		idle: 10000
	}	
});

const User = sequelize.define('user', {
  user_name: Sequelize.STRING,
  birthday: Sequelize.DATE
}, {
	underscored: true,
	version: true
});

const Pet = sequelize.define('pet', {
	pet_name: Sequelize.STRING
}, {
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
  }, {include: [{association: User_Pets}]}))
  .then(jane => {
    console.log(jane.get({plain: true}));
  })
  .then(() => User.create({
	user_name: 'unnerjoe',
	birthday: new Date(1962, 7, 5),
	pets: [{pet_name:'bugs'}, {pet_name:'dolly'}, {pet_name:'roger'}]
  }, {include: [{association: User_Pets}]}))
  .then(unner => {
    console.log(unner.get({plain:true}));	
  });

module.exports.models = {
	User,
	Pet
};

module.exports.relationships = {
	Pet_User,
	User_Pets
}