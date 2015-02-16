app.directive("textSlideshow",function($q, $interval){
	return {
		scope: {
			data: "=data"
		},
		restrict: "C",
		template: "<div ng-repeat=\"text in data\">{{text}}</div>",
		link: function(scope, element, attrs){
		
		}
	}
});