var ctrls = angular.module('jjgym.controllers',[]);

ctrls.controller('QuickBookController', function($scope){
	$scope.checkDate = function(event, element){
		$log.info(event);
	};
});

ctrls.controller('HeaderController', function($scope,$log, Announcements){

	Announcements.get()
		.then(function(data){
			$scope.announcements = data.announcements;
		});
	


	$scope.logout = function(){
		window.location="/logout";
  	}
});

ctrls.controller('CalendarController', function($scope,$rootScope,$location,$modal,$http,$log,$cookies,$cookieStore,$timeout,$rootScope,$compile,$q){

	$scope.eventSource = {
		url: "api/events",
		currentTimezone: 'America/Los Angeles'
	};
	
  	$scope.events = [];

	$scope.$on('event:add',function(){
		// console.log('in event:add handler');
		// console.log(arguments);
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

		var eventTitle = ' <b>' +  event.title + '</b> ' + moment(event.start).format('h:mma') + ' - ' + moment(event.end).format('h:mma') + ' ' + event.usage + '%';

		var options = {
			animation: true,
			trigger: 'hover',
			container: 'body',
			placement: 'auto top',
			html: true,
			title: eventTitle,
			content: event.description,
			delay:{ show: 300, hide:0}
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
		// $scope.rawDate = rawDate;
		$scope.date = moment(date).format('dddd MMMM Do, YYYY');
		$scope.hour = moment(date).format('h:mma');
		$scope.hour = date;

		var ModalInstanceCtrl = function ($scope, $modalInstance, date, hour) {
			$scope.date = date;
			$scope.availability = 0;
			$scope.usage = 0;
			
			if(view.name == "month"){
				$scope.timeStart = moment(hour).add(13,'hours').format();
				$scope.timeEnd = moment(hour).add(14,'hours').format();
			}else{
				$scope.timeStart = moment(hour).format();
				$scope.timeEnd = moment(hour).add(1,'hours').format();
			}

		
			$rootScope.timeStart = $scope.timeStart;
			$rootScope.timeEnd = $scope.timeEnd;
			

			$scope.TimepickerCtrl = function ($scope, $rootScope) {
				$scope.date = date;
				$scope.rawDate = rawDate;
				$scope.repeatEndDate = "";
				$scope.optionValues = [];

				for(i=1;i<=20;i++){
					$scope.optionValues.push(i);
				}
				this.updateRepeatEndDate = function(){
					$scope.repeatEndDate = moment(rawDate).add($scope.numWeeks,'weeks').format();
				}
				this.changeTime = function(){

				  	if(!moment($scope.timeEnd).isAfter($scope.timeStart)){
						$scope.timeEnd = moment($scope.timeStart).add('minutes',30).format();
				  	}  
				  	
					$scope.checkGymAvailability($scope.timeStart,$scope.timeEnd)
					.then(function(res){
						$scope.availability = res.data.available;
						$scope.overlappingEvents = res.data.overlappingEvents;
				 	});

					$rootScope.timeStart = $scope.timeStart;
					$rootScope.timeEnd = $scope.timeEnd;

					if($scope.repeatEndDate != ''){
						$scope.checkGymAvailabilityRange(rawDate, $scope.repeatEndDate);
					}
				}

				$scope.clear = function() {
					$scope.hour = null;
				};

				//percentages
				$scope.percentages = {
						id: 25,
						value: '25%'
					},
					{
						id: 50,
						value: '50%'
					},
					{
						id: 75,
						value: '75%'
					},
					{
						id: 100,
						value: '100%'
				};

				$scope.$watch('availability', function(newValue, oldValue){
						// console.log('availability changed, was ' + oldValue + ', now its ' + newValue);
						
						if(newValue != oldValue){
							$scope.percentages = [];

							for(i = 25; i <= newValue; i +=25){
								$scope.percentages.push({value: i});
							}

							if(newValue < $scope.usage){
								$scope.usage = newValue;
							}

							if($scope.usage == 0){
								$scope.usage = 25;
							}
						}
					}, 
					true
				);

				$scope.$watch(function(){
					return $scope.usage;
				},
				function(newValue, oldValue){
					$rootScope.usage = $scope.usage;
				});



				$scope.checkGymAvailability = function(timeStart,timeEnd,repeatingFlag){

					var url = "/api/check-availability";
					url += "?start=" + timeStart + "&end=" + timeEnd;

					var app = this;
					return $http.get(url);
					
				}

				$scope.dates = [];
		 
				$scope.checkGymAvailabilityRange = function(startDate,endDate){
					var out = {
						dates:[]
					};

					var timeStart = moment($scope.timeStart).format("HH:mm:ss");
					var timeEnd = moment($scope.timeEnd).format("HH:mm:ss");
					
					var reqArray = [];

					for(nextDate = moment(startDate); nextDate.isBefore(endDate); nextDate = nextDate.add('days',7)){

						timeStartDate = nextDate.format('YYYY-MM-DDT' + timeStart + 'Z');
						timeEndDate = nextDate.format('YYYY-MM-DDT' + timeEnd + 'Z');
							
						out.dates.push({
							timeStart: moment(timeStartDate).format(),
							timeEnd: moment(timeEndDate).format()

						});
						reqArray.push($scope.checkGymAvailability(timeStartDate,timeEndDate));
					}
					i = 0;
					$q.all(reqArray)
						.then(function(resArray){
							$scope.dates = resArray;
							available = _.map(resArray, function(res){
								return (res.data.available > 0)? res.data.available : 0;
							});
							
							$scope.availability = _.min(available);
						})
						.then(function(res){
							
							return out;
						});

				};

				$scope.checkGymAvailability($scope.timeStart,$scope.timeEnd)
					.then(function(res){
						$scope.availability = res.data.available;
						$scope.overlappingEvents = res.data.overlappingEvents;
				 	});
			};
			
			$scope.ok = function (dates) {
	
				var data = {
					time_start: $rootScope.timeStart,
					time_end: $rootScope.timeEnd,
					usage: $rootScope.usage + "",
					date: rawDate,
					note: $('#note').val()
				}

				var url = '/api/events/';

			
				if(dates.length > 0){
					var reqArray = [];

					_.each(dates,function(date,i){
						thisData = angular.copy(data);
						thisData.date = date.data.date; //weird

						reqArray.push($http.post('/api/events/', thisData ));
					});

					$q.all(reqArray)
						.then(function(resArray){
							$modalInstance.close();
						});

				}else{
					$http.post('/api/events/', data)
						.success(function(res){
					
							var eventObj = {
								id: res.insertId,
								user_id: $scope.userId,
								title: res.title,
								description: res.description,
								start: res.time_start,
								end: res.time_end,
								usage: res.usage
							}
					
							$modalInstance.close(eventObj);
						})
						.error(function(res){
							$modalInstance.close();
						});
					}
				}
		
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
			$scope.myCalendar.fullCalendar('refetchEvents');
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
