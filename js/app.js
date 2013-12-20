app = angular.module("app", ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	});	
	$routeProvider.otherwise({ redirectTo: '/login'})
});

app.controller('LoginController', function(){

});