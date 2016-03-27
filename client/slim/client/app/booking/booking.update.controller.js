(function () {
    'use strict';

    angular.module('app')
        .controller('bookingUpdateCtrl', ['$scope', '$stateParams','Bookings',bookingUpdateCtrl])

    function bookingUpdateCtrl($scope, $stateParams, Bookings) {

            //$scope.events = [];
            //$scope.eventSources = [$scope.events];      
            var id = $stateParams.id;     
            console.log(id);     
            
            function init(){
                Bookings.getBooking(id)
                    .then(function(booking){
                        console.log(booking);
                        $scope.booking = booking.data;
                    }, 
                    function(error){
                        console.log(error);
                    });
            }
            
            init();
            
    }
})(); 