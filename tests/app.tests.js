'use strict';

describe('CalendarController', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location, $httpBackend ){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('CalendarController', {
            $scope: scope,
            $location: $location,
            $httpBackend: $httpBackend

        });
    }));
    // tests start here
    it("Contains an eventSources array that is two items in length",function(){
        
        expect(scope.eventSources.length).toBe(2);
        
    });
});
