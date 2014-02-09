angular.module('jjgym').provider('Event',function(){
		this.$get = ['$resource',function($resource){
			var Event = $resource('/api/events/:_id',{},{
				update: {
					method: 'PUT'
				}
			});
			return Event;
		}]
	});