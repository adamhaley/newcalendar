var ctrls = angular.module('jjgym.controllers',[]);

ctrls.controller('CalendarController', function($scope,$location,$modal,$log){

  var date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();
  
 
  $scope.eventSource = {
      url: "api/events",
      currentTimezone: 'America/Los Angeles'
  };
    
  $scope.events = [];
  
  /**
  *scope functions
  */
  /**
  *Before event is rendered
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

  /**
  *Things to do after event is rendered go here
  */
  $scope.eventAfterRender = function(event, element){
 
  }

  /**
  *Show spinner when loading data
  */
  $scope.showLoader = function(isLoading){
    if(isLoading){
      $('#loader-screen').show();
    }else{
      $('#loader-screen').hide();
    }
  }

  /**
  *When user clicks on a day
  */
  $scope.dayClick = function(date,allDay,evt,view){
    console.log(date);
    // $modal.modal();

    $scope.items = ['item1', 'item2', 'item3'];


    var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    var modalInstance = $modal.open({
      templateUrl: 'templates/booktime.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  
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
        dayClick: $scope.dayClick,
        loading: $scope.showLoader,
        allDayDefault: false
      }
    };

   	$scope.eventSources = [$scope.events, $scope.eventSource];
 
});
