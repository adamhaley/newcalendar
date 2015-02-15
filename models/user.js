var User = {};

User.orm = db.sequelize.define('User', {
	nameFirst: {
		type: db.Sequelize.STRING,
		field: 'name_first' 
	},
	nameLast: {
		type: db.Sequelize.STRING,
		field: 'name_last'
	},
	username: {
		type: db.Sequelize.STRING,
		field: 'username'
	},
	password: {
		type: db.Sequelize.STRING,
		field: 'password'
	},
	email: {
		type: db.Sequelize.STRING,
		field: 'email'
	},
	phone: {
		type: db.Sequelize.STRING,
		field: 'phone'
	}

}, {
	tableName: 'users' 
});

User.create = function(query, model, cb){
	console.log('in user.create');
};

User.delete = function(id, query, cb){
	console.log('in user.delete');
};

User.read = function(query, cb){
	console.log('in user.read');
};

User.readById = function(id, query, cb){
	console.log('in user.readById');
};

User.update = function(id, query, model, cb){
	console.log('in user.update');
};

module.exports = User;