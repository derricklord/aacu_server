(function () {
    'use strict';

    angular.module('app')
        .controller('bookingCtrl', ['$scope', 'Bookings',bookingCtrl])

    function bookingCtrl($scope, Bookings) {

            $scope.events = [];
            $scope.eventSources = [$scope.events];                
            
            function init(){
                Bookings.getBookings()
                    .then(function(bookings){
                        bookings.data.forEach(function(booking){
                            $scope.events.push({
                                title: booking.author.displayName + '- Booked',
                                start: booking.bookingDate,
                                end: booking.endDate,
                                allday: true
                            });
                        });
                    }, 
                    function(error){
                        console.log(error);
                    });
            }
            
            init();
            
    }
})(); 