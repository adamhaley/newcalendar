var Event = {};

Event.orm = db.sequelize.define('Event', {
	name: {
		type: Sequelize.STRING,
		field: 'name'
	},
	date: {
		type: Sequelize.STRING,
		field: 'date'
	},
	timeStart: {
		type: Sequelize.STRING,
		field: 'time_start'
	},
	timeEnd: {
		type: Sequelize.STRING,
		field: 'time_end'
	}
	comments: {
		type: Sequelize.STRING,
		field: 'comments'
	},
	usage: {
		type: Sequelize.INT,
		field: 'usage'
	},
	dateCreated: {
		type: Sequelize.DATETIME,
		field: 'created_at'
	}

}, {
	tableName: 'events'
});

Event.orm.belongsTo(User.orm)

Event.prototype.create = function(query, model, cb){

};

Event.prototype.delete = function(id, query, cb){

};

Event.prototype.read = function(query, cb){

};

Event.prototype.readById = function(id, query, cb){

};

Event.prototype.update = function(id, query, model, cb){

};

module.exports = Event;