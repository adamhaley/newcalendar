app.directive("textSlideshow",['$interval', function($interval){
	return {
		scope: {
			data: "=data",
			interval: "=interval"
		},
		restrict: "C",
		template: "<div ng-repeat=\"text in data\">{{text}}</div>",
		link: function(scope, element, attrs){
			delay = scope.interval * 1000;//seconds times 1000 to get ms
			$interval(function(){
				scope.data.push(scope.data.shift());
			},delay);
		}
	}
}]);