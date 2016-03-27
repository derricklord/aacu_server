(function () {
    'use strict';
    
    angular.module('app')
      .factory('Users', function($http) {
        var host = 'http://www.aacuniverse.com:3000';
        return {
          getUser: function(id) {
            return $http.get(host+'/api/user/'+id);
          },
          getUsers: function(){
            return $http.get(host+'/api/user');
          },
          getListings: function(){
            return $http.get(host+'/api/user/listings');  
          },
          signupUser: function(signupData) {
            return $http.post(host+'/auth/signup', signupData);
          },
          sendMessage: function(messageData){
              return $http.post(host+'/api/message/', messageData);
          },
          deleteUser: function(id){
            return $http.delete(host+'/api/user/'+id);
          },
          updateUser: function(userData) {
            return $http.put(host+'/api/user/'+userData._id, userData);
          },
          addRole: function(id, role){
            return $http.post(host+'api/user/'+id+'/role');
          },
          enableListing: function(id){
              return $http({method: 'PUT', url: '/api/user/'+id+'/specialist'});
          },
          enableAdmin: function(id){
              return $http({method: 'PUT', url: '/api/user/'+id+'/admin'});
          }                           
        };
      });
})();   