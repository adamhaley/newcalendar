describe("CalendarController",function(){
	beforeEach(function(){
		angular.module('jjgym.controllers',[]);
	});
	var ctrl, scope;
	// inject the $controller and $rootScope services
	// in the beforeEach block
	// beforeEach(inject(function($controller,$scope,$rootScope,$location,$modal,$http,$log,$cookies,$cookieStore,$timeout,$rootScope,$compile,$q) {
	// 	// Create a new scope that's a child of the $rootScope
	// 	scope = $rootScope.$new();
	// 	// Create the controller
	// 	ctrl = $controller('CalendarController', {
	//   		$scope: scope
	// 	});
	// }));

	it("has an event source ",function(){
		expect($scope.eventSource.not.toBe(undefined));
	});

	it("event source url should be api/events",function(){
		expect($scope.eventSource.toBe('api/events'));
	});
});