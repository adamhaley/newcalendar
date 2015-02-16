app.service('Announcements', function($http){
	var model = this;

	function extract(res){
		return res.data;
	}

	function cache(res){
		data = extract(res);
		return data;
	}

	model.get = function(){
		return $http.get('js/data/announcements.json').then(cache);
			
	}

});