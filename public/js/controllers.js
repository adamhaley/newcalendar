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

ctrls.controller('CalendarController', function($scope,$rootScope,$location,$modal,$http,$log,$cookies,$cookieStore,$timeout,$rootScope,$compile){

/*
  var date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();
  */ 
  $scope.eventSource = {
      url: "api/events",
      currentTimezone: 'America/Los Angeles'
  };
    
  $scope.events = [];

  $scope.$on('event:add',function(){
    console.log('in event:add handler');
    console.log(arguments);
  });
  
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

    //if event belongs to logged in user, create delete button
  

    //add popver with event details
    var eventTitle = ' <b>' +  event.title + '</b> ' + moment(event.start).format('h:mma') + ' - ' + moment(event.end).format('h:mma') + ' ' + event.usage + '%';


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

    
    
    if($scope.userId == event.user_id){
      var deleteButton = $('<div  />');
      deleteButton.addClass('glyphicon').addClass('glyphicon-remove').addClass('delete-button');
      deleteButton.attr('ng-click','deleteEvent($event, ' + event.id + ')');
      $('.fc-event-inner', element).prepend(deleteButton);
    }
    $('.fc-event-inner',element).append(detailsContainer);
    $('.fc-event-title',element).append(percContainer);
    $compile(element)($scope);

  }
  $scope.deleteEvent = function($event, id){
    var element = $($event.currentTarget);
    
    if(confirm('Delete this event?')){
      $http.delete('/api/events/' + id)
        .success(function(res){
          element.parent().parent().popover('hide');
          console.log(res);
          //gotta delete from events array if it was added that way

          $scope.myCalendar.fullCalendar('refetchEvents');
        })
        .error(function(res){
          console.log(res);
        });
    }
  }

  /**
  *Things to do after event is rendered go here
  */
  $scope.eventAfterRender = function(event, element, view){
    $(element).addClass('percent' + event.usage);
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
    if(!$scope.userId){
      return;
    }
    var rawDate = date;
    $scope.date = moment(date).format('dddd MMMM Do, YYYY');
    $scope.hour = moment(date).format('h:mma');
    $scope.hour = date;

    var ModalInstanceCtrl = function ($scope, $modalInstance, date, hour) {
      $scope.date = date;
      $scope.availability = "waiting..";
      if(view.name == "month"){
        $scope.timeStart = moment(hour).add(13,'hours').format();
        $scope.timeEnd = moment(hour).add(14,'hours').format();
      }else{
        $scope.timeStart = moment(hour).format();
        $scope.timeEnd = moment(hour).add(1,'hours').format();
      }

      $rootScope.timeStart = $scope.timeStart;
      $rootScope.timeEnd = $scope.timeEnd;

      //percentages
      $scope.percentages = [25,50,75,100];
     
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

      $scope.TimepickerCtrl = function ($scope, $rootScope) {
        $scope.date = date;

        this.changeTime = function(){

          if(!moment($scope.timeEnd).isAfter($scope.timeStart)){
            $scope.timeEnd = moment($scope.timeStart).add('minutes',30).format();
          }  
          $scope.checkGymAvailability($scope.timeStart,$scope.timeEnd); 
          $rootScope.timeStart = $scope.timeStart;
          $rootScope.timeEnd = $scope.timeEnd;
        }

        $scope.clear = function() {
          $scope.hour = null;
        };
      };

      $scope.ok = function (id) {
        console.log('form submitted');

        var data = {
          time_start: $rootScope.timeStart,
          time_end: $rootScope.timeEnd,
          usage: $('#usage').val(),
          date: rawDate,
          note: $('#note').val()
        }

        console.log(data);
        var url = '/api/events/';

        if(id != undefined){
          $http.put(url + id, data)
            .success(function(res){
              console.log(res);
              $modalInstance.close();
            })
            .error(function(res){
              console.log(res);
              $modalInstance.close();
            });    
        }else{
          $http.post('/api/events/', data)
            .success(function(res){
              console.log(res);

              var eventObj = {
                id: res.insertId,
                user_id: $scope.userId,
                title: res.title,
                description: res.description,
                start: res.time_start,
                end: res.time_end,
                usage: res.usage
              }
            
              //add to events sources model and digest so calendar is updated
             
              $modalInstance.close(eventObj);
            })
            .error(function(res){
              console.log(res);
              $modalInstance.close();
            });
        }  
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
        },
        events: function() {
          return  $scope.events;
        }
      }
    });

    modalInstance.result.then(function (data) {
      //add data to calendar
      // $scope.events.push(data);
      $scope.myCalendar.fullCalendar('refetchEvents');
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
          left: 'agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        defaultView:'agendaDay',
        theme:false,
        ignoreTimezone: false,
        allDaySlot: false,
        axisFormat: 'h:mmtt',
        minTime: "5:30",
        timeFormat:  {
          day: '',
          week:'',
          month: 'h:mmtt { - h:mmtt}'
        },
        slotEventOverlap: false,
        dayClick: $scope.eventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        eventAfterRender: $scope.eventAfterRender,
        dayClick: $scope.dayClick,
        loading: $scope.showLoader,
        allDayDefault: false,
        titleFormat: {
            month: 'MMMM yyyy',                             // September 2009
            week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d, yyyy}", // Sep 7 - 13 2009
            day: 'dddd, MMM d, yyyy'                  // Tuesday, Sep 8, 2009
        }
      }
    };


   	$scope.eventSources = [$scope.events, $scope.eventSource];
 
});
