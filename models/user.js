var User = {};

User.orm = db.sequelize.define('User', {
	nameFirst: {
		type: Sequelize.STRING,
		field: 'name_first' 
	},
	nameLast: {
		type: Sequelize.STRING,
		field: 'name_last'
	},
	username: {
		type: Sequelize.STRING,
		field: 'username'
	},
	password: {
		type: Sequelize.STRING,
		field: 'password'
	}
	email: {
		type: Sequelize.STRING,
		field: 'email'
	},
	phone: {
		type: Sequelize.STRING,
		field: 'phone'
	}

}, {
	tableName: 'users' 
});

User.orm.hasMany(Event.orm, {as: 'Events'})

User.prototype.create = function(query, model, cb){

};

User.prototype.delete = function(id, query, cb){

};

User.prototype.read = function(query, cb){

};

User.prototype.readById = function(id, query, cb){

};

User.prototype.update = function(id, query, model, cb){

};

module.exports = User;