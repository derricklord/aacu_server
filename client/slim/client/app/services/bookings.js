(function () {
    'use strict';
    var host = 'http://www.aacuniverse.com:3000';
    angular.module('app')
      .factory('Bookings', function($http) {
        return {
          getBooking: function(id) {
            return $http.get(host+'/api/booking/1/'+id);
          },
          getBookings: function(){
            return $http.get(host+'/api/booking/');
          },
          getRequests: function(){
            return $http.get(host+'/api/booking/requests/')  
          },
          getBookingsById: function(id){
            return $http.get(host+'/api/booking/'+id);
          },          
          postBooking: function(bookingData) {
            return $http.post(host+'/api/booking/', bookingData);
          },
          deleteBooking: function(id){
            return $http.delete(host+'/api/booking/'+id);
          },
          updateBooking: function(bookingData) {
            return $http({method: 'PUT', url: host+'/api/booking/'+bookingData._id, data:bookingData});
          }
     
        };
      });
})();   