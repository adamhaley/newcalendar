app.directive("textSlideshow",['$interval', function($interval){
	return {
		scope: {
			data: "=data",
			interval: "=interval",
		},
		restrict: "C",
		template: "<div ng-model=\"currentItem\" class=\"text-item\"></div>",
		link: function(scope, element, attrs){	
			function runInterval(){
				
				delay = scope.interval * 1000;//seconds times 1000 to get ms
				
				scope.currentItem = scope.data[scope.i];
				scope.i = 0;
				$el = $(element).find('.text-item')
					.text(scope.data[scope.i]);
				scope.i++;

				//now start the interval
				$interval(function(){
					if(scope.i == (scope.data.length-1)){
						scope.i = 0;
					}else{
						scope.i++;
					}	
					// $el = $(element).find('.text-item');
					$el.fadeOut(600,function(){
							$(this).html(scope.data[scope.i]);
						})
						.delay(500)
						.fadeIn(300);
						
				}, delay);
			}

			started = false;
			scope.$watch('data',function(newValue){
				if(started || newValue == undefined){
					return;
				}else{
					runInterval();
					started = true;
				}
			});
		}
	}
}]);