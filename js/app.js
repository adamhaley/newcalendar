app = angular.module("app", ['ngRoute','ui.calendar']).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	})
  .otherwise({ redirectTo: '/calendar'});	
	
});

