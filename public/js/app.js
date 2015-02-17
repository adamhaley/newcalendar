var app = angular.module("jjgym", [
	'ngRoute',
	'ngCookies',
	'ui.calendar',
	'ui.bootstrap',
	'jjgym.controllers',
	'ngAnimate'
	]).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	})
  .otherwise({ redirectTo: '/calendar'});	
	
});

