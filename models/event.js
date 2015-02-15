var Event = {};

Event.orm = db.sequelize.define('Event', {
	name: {
		type: db.Sequelize.STRING,
		field: 'name'
	},
	date: {
		type: db.Sequelize.STRING,
		field: 'date'
	},
	timeStart: {
		type: db.Sequelize.STRING,
		field: 'time_start'
	},
	timeEnd: {
		type: db.Sequelize.STRING,
		field: 'time_end'
	},
	comments: {
		type: db.Sequelize.STRING,
		field: 'comments'
	},
	usage: {
		type: db.Sequelize.INTEGER,
		field: 'usage'
	},
	dateCreated: {
		type: db.Sequelize.DATE,
		field: 'created_at'
	}

}, {
	tableName: 'events'
});


Event.create = function(query, model, cb){
	console.log('in event.create');
};

Event.delete = function(id, query, cb){
	console.log('in event.delete');
};

Event.read = function(query, cb){
	console.log('in event.read');
};

Event.readById = function(id, query, cb){
	console.log('in event.readById');
};

Event.update = function(id, query, model, cb){
	console.log('in event.update');
};

module.exports = Event;