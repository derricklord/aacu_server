(function () {
    'use strict';
    var host = 'http://www.aacuniverse.com:3000';
    angular.module('app')
      .factory('Profile', function($http) {
        return {
          getProfile: function() {
            return $http.get(host +'/api/user/profile/');
          },
          getSpecialist: function(id) {
            return $http.get(host +'/api/user/profile/'+id);
          },          
          updateProfile: function(profileData) {
            return $http.put(host +'/api/user/profile/', profileData);
          }         
        };
      });
})();  