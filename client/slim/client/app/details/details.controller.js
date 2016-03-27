(function () {
    'use strict';

    angular.module('app')
        .controller('detailsCtrl', ['$scope', 'Profile', 'Bookings', 'Messages', '$log', '$state', detailsCtrl])

    function detailsCtrl($scope, Profile, Bookings, Messages, $log, $state) {
            var id = $state.params.id;
            $scope.events = [];
            $scope.eventSources = [$scope.events];   
            $scope.map = { 
                center: { latitude: 37.70, longitude: -117.16 }, 
                zoom: 12 
            };
                
            $scope.options = {
                scrollwheel: false
            };
            
            $scope.markers = [];                        
            
            function init(){

                Profile.getSpecialist(id).then(function(specialist){
                    $scope.specialist = specialist.data;

                    $scope.specialist.locations.forEach(function(location){
                        var marker = {};
                        marker._id = $scope.specialist.id;
                        marker.coords = {latitude:location.loc.lat, longitude:location.loc.long};
                        $scope.markers.push(marker);                         
                    });
                    
                    $scope.map.center = {latitude:$scope.specialist.locations[0].loc.lat, longitude:$scope.specialist.locations[0].loc.long};
                });       
     
                Bookings.getBookingsById(id)
                    .then(function(bookings){
                        bookings.data.forEach(function(booking){
                            $scope.events.push({
                                title: 'Unsecured Booking',
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