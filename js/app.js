app = angular.module("app", ['ngRoute','ui.calendar']).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	});	
	$routeProvider.otherwise({ redirectTo: '/calendar'})
});



app.controller('CalendarController', function($scope,$location){

  var server = $location.protocol() + '://' + $location.host();
  var apiPort = 2000;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
 
  $scope.eventSource = {
<<<<<<< HEAD
      url: "http://gymcalendar.herokuapp.com/events",
=======

      url: server + ":" + apiPort + "/events",
      
>>>>>>> parent of 8251080... pointed model url to gymcalendar.herokuapp.com
      currentTimezone: 'America/Los Angeles' // an option!
  };
    

  $scope.events = [];
  
  $scope.eventRender = function(){
    console.log('Hi from event render');
  }
  $scope.showLoader = function(isLoading){
    console.log('loading: ' + isLoading);
  }

	$scope.uiConfig = {
      calendar:{
        weekMode: 'variable',
        editable: false,
        firstDay: 0,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        theme:true,
        ignoreTimezone: true,
        allDaySlot: false,
        axisFormat: 'h:mmtt',
        minTime: "5:30",
        slotEventOverlap: false,
        dayClick: $scope.eventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        loading: $scope.showLoader
      }
    };

   	$scope.eventSources = [$scope.events, $scope.eventSource];
 

});
