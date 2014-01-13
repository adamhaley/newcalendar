var ctrls = angular.module('jjgym.controllers',[]);

ctrls.controller('CalendarController', function($scope,$location){

  var date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();
  
 
  $scope.eventSource = {
      // url: "http://gymcalendar.herokuapp.com/events",
      url: "api/events",
      currentTimezone: 'America/Los Angeles'
  };
    
  $scope.events = [];
  
  /**
  *scope functions
  */
  $scope.eventRender = function(event, element){
    event.allDay = false;
    //add percentage indicator
    var percContainer = $('<span />');
    percContainer.addClass('fc-event-percentage');
    percContainer.text( event.usage + '%');

    // console.log(event);
    //add popver with event details
    var eventTitle = ' <b>' +  event.title + '</b> ' + moment(event.start).format('h:mma') + ' - ' + moment(event.end).format('h:mma') + ' ' + event.usage + '%';

    var options = {
      animation: true,
      trigger: 'hover',
      container: 'body',
      placement: 'auto right',
      html: true,
      title: eventTitle,
      content: event.description,
      delay:{ show: 300, hide:100}
    }
    $(element).popover(options);

    $('.fc-event-title',element).append(percContainer);
  }

  $scope.eventAfterRender = function(event, element){
 
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
        loading: $scope.showLoader,
        allDayDefault: false
      }
    };

   	$scope.eventSources = [$scope.events, $scope.eventSource];
 
});
