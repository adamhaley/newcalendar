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
  $scope.eventRender = function(event, element){
    var percContainer = $('<span />');
    percContainer.addClass('fc-event-percentage');
    percContainer.text( event.usage + '%');
    $('.fc-event-title',element).append(percContainer);
  }

  $scope.eventAfterRender = function(event, element){
 
    /*
    var parentWidth = element.parent().parent().width(),
    // $(element.parent()).css('width','100%');

   
    // $(element).append(percDiv);

    perc = event.usage * .01,
    childWidth = parentWidth * perc;
    console.log('width is ' + childWidth);

    $(element).css('margin-left', '50px');
    $(element).css('width', childWidth + 'px');
    // return $(element);

    $(element).addClass('percent' + event.usage);
    */
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
        // weekMode: 'variable',
        editable: false,
        // firstDay: 0,
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
        eventAfterRender: $scope.eventAfterRender,
        loading: $scope.showLoader
      }
    };

   	$scope.eventSources = [$scope.events, $scope.eventSource];
 
});
