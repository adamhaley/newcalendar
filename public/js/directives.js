app.directive("textSlideshow",['$interval', function($interval,$timeout){
	return {
		scope: {
			data: "=data",
			interval: "=interval"
		},
		restrict: "C",
		template: "<div ng-repeat=\"text in data\">{{text}}</div>",
		link: function(scope, element, attrs){
			delay = scope.interval * 1000;//seconds times 1000 to get ms
			// $el = $('div', $(element)).first();
			$interval(function(){
				scope.data.push(scope.data.shift());
				// $el.animate({left: '-100%'},200, function(){
				// 	scope.data.push(scope.data.shift());
				// 	$el.css({left: '100%'});
				// 	$el.animate({left: 0},200);
				// });
					
			},delay);
		}
	}
}]);