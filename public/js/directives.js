app.directive("textSlideshow",['$interval', function($interval,$timeout){
	return {
		scope: {
			data: "=data",
			interval: "=interval",
		},
		restrict: "C",
		template: "<div ng-model=\"currentItem\" class=\"text-item\">{{currentItem}}</div>",
		link: function(scope, element, attrs){	
			function runInterval(){
				scope.i = 0;
				delay = scope.interval * 1000;//seconds times 1000 to get ms
				scope.currentItem = scope.data[scope.i];
			
				$interval(function(){
					if(scope.i == scope.data.length){
						scope.i = 0;
					}else{
						scope.i++;
					}	
					$el = $(element).find('.text-item');
					$el.
					$el.animate({opacity: 0},200,function(){
							
							setTimeout(function(){scope.currentItem = scope.data[scope.i];$el.animate({opacity: 1},200);},100);
						});

					// $timeout(function(){scope.currentItem = scope.data[scope.i];scope.shown = true;},500);
					
					// console.log(scope.i);
					// scope.data.push(scope.data.shift());					
				},delay);
			}

			started = false;
			scope.$watch('data',function(newValue){
				if(started){
					return;
				}else if(newValue == undefined){
					return;
				}else{
					runInterval();
					started = true;
				}
			});
		}
	}
}]);