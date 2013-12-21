app = angular.module("app", ['ngRoute','ui.calendar']).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	});	
	$routeProvider.otherwise({ redirectTo: '/calendar'})
});



app.controller('CalendarController', function($scope){


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
   
    $scope.eventSource = {
            // url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            url: "http://localhost:2000/events",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Los Angeles' // an option!
    };
    /*
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Los Angeles' // an option!
    };
    */
    /*
   	$scope.events = [
   		{title: 'All Day Event',start: new Date(y, m, 1)},
      	{title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      	{id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      	{id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      	{title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      	{title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	];
	*/
	$scope.events = [];

	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

   	$scope.eventSources = [$scope.events, $scope.eventSource];
 

});