app = angular.module("app", ['ngRoute','ui.calendar']).config(function($routeProvider){
	$routeProvider.when('/calendar', {
		templateUrl: 'calendar.html',
		controller: 'CalendarController'
	});	
  $routeProvider.when('/tests', {
    templateUrl: 'tests.html',
    controller: 'TestController'
  });
	$routeProvider.otherwise({ redirectTo: '/calendar'});
});

app.controller('TestController', function($scope){

});

app.controller('CalendarController', function($scope,$location){

  var server = $location.protocol() + '://' + $location.host()
  , apiPort = 2000
  , date = new Date()
  , d = date.getDate()
  , m = date.getMonth()
  , y = date.getFullYear()
  ;
 
  $scope.eventSource = {
      url: "http://gymcalendar.herokuapp.com/events",
      currentTimezone: 'America/Los Angeles'
  };
    
  $scope.events = [];
  
  /**
  *scope functions
  */
  $scope.eventRender = function(){
    console.log('Hi from event render');
  }
  $scope.showLoader = function(isLoading){
    if(isLoading){
      $('#loader-screen').show();
    }else{
      $('#loader-screen').hide();
    }
  }

  /**
  *Calendar Config
  */
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
