var app = angular.module("jjgym", ['ngRoute','ui.calendar','jjgym.controllers']).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	})
  .otherwise({ redirectTo: '/calendar'});	
	
});

