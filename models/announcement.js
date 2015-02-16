var Announcement = {};

Announcement.orm = db.sequelize.define('Announcement', {
	announcement: {
		type: db.Sequelize.STRING,
		field: 'announcement'
	}


}, {
	tableName: 'announcements',
	underscored: true
});


Announcement.create = function(query, model, cb){
	console.log('in announcement.create');
};

Announcement.delete = function(id, query, cb){
	console.log('in announcement.delete');
};

Announcement.read = function(query, cb){
	this.orm.findAll()	
	.then(function(res){

	});
};

Announcement.readById = function(id, query, cb){
	// this.orm.findById(id).then(function(obj){

	// });
};

Announcement.update = function(id, query, model, cb){
	console.log('in announcement.update');
};

module.exports = Announcement;