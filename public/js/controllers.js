var ctrls = angular.module('jjgym.controllers',[]);

ctrls.controller('QuickBookController', function($scope){
  $scope.checkDate = function(event, element){
    $log.info(event);
  };
});

ctrls.controller('HeaderController', function($scope,$log){
  $scope.logout = function(){
    window.location="/logout";
  }

});

ctrls.controller('CalendarController', function($scope,$location,$modal,$http,$log,$cookies,$cookieStore){

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
  *Before event is rendered
  */
  $scope.eventRender = function(event, element){
    event.allDay = false;
    //add percentage indicator
    var percContainer = $('<span />');
    percContainer.addClass('fc-event-percentage');
    percContainer.text( event.usage + '%');

    var detailsContainer = $('<div />');
    detailsContainer.addClass('fc-event-details').addClass('text-center');
    detailsContainer.text(event.description);

    // console.log(event);
    //add popver with event details
    var eventTitle = ' <b>' +  event.title + '</b> ' + moment(event.start).format('h:mma') + ' - ' + moment(event.end).format('h:mma') + ' ' + event.usage + '%';

    if(event.description.length > 0){
      var options = {
        animation: true,
        trigger: 'hover',
        container: 'body',
        placement: 'auto top',
        html: true,
        title: eventTitle,
        content: event.description,
        delay:{ show: 300, hide:100}
      }
      $(element).popover(options);
    }
    
    $('.fc-event-inner',element).append(detailsContainer);
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
    
    $scope.date = moment(date).format('dddd MMMM Do, YYYY');
    $scope.hour = moment(date).format('h:mma');
    $scope.hour = date;

    var ModalInstanceCtrl = function ($scope, $modalInstance, date, hour) {
      $scope.date = date;

      // console.log(hour);
      if(view.name == "month"){
        $scope.timeStart = moment(hour).add(13,'hours').format();
        $scope.timeEnd = moment(hour).add(14,'hours').format();
      }else{
        $scope.timeStart = moment(hour).format();
        $scope.timeEnd = moment(hour).add(1,'hours').format();
      }

      /*calculate timeStart based on x position of click if month view
      */
      $scope.checkGymAvailability = function(timeStart,timeEnd){

        var url = "/api/check-availability";
        url += "?start=" + timeStart + "&end=" + timeEnd;

        console.log(url);

        var app = this;
        $http.get(url)
          .success(function(res){
            console.log(res);
            $scope.availability = res.available;
            $scope.overlappingEvents = res.overlappingEvents;
          })
          .error(function(res){
            console.log(res);
          });  
      }
     
      $scope.checkGymAvailability($scope.timeStart,$scope.timeEnd);

      $scope.TimepickerCtrl = function ($scope) {
        $scope.date = date;
        $scope.timeStart = moment(hour).format();

        $scope.changed = function () {
       
          $scope.checkGymAvailability($scope.timeStart,$scope.timeEnd);
        }
        
        $scope.clear = function() {
          $scope.hour = null;
        };
      };

      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    var modalInstance = $modal.open({
      templateUrl: 'templates/booktime.html',
      controller: ModalInstanceCtrl,
      resolve: {
        date: function() {
          return $scope.date;
        },
        hour: function() {
          return $scope.hour;
        },
        timeStart: function(){
          return $scope.timeStart;
        },
        timeEnd: function(){
          return $scope.timeEnd;
        }
      }
    });

    modalInstance.result.then(function () {
      // $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed');
    }); 
  }

  /**
  *Calendar Config
  */
	$scope.uiConfig = {
      calendar:{
        editable: false,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        defaultView:'month',
        theme:false,
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
