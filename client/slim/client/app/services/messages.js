(function () {
    'use strict';
    var host = 'http://www.aacuniverse.com:3000';
    angular.module('app')
      .factory('Messages', function($http) {
        return {
          getMessage: function(id) {
            return $http.get(host+'/api/message/'+id);
          },
          getMessages: function(){
            return $http.get(host+'/api/message/');
          },
          postMessage: function(messageData) {
            return $http.post(host+'/api/message/', messageData);
          },
          deleteMessage: function(id){
            return $http.delete(host+'/api/message/'+id);
          },
          updateMessage: function(messageData) {
            return $http({method: 'PUT', url: host+'/api/message/'+messageData._id, data:messageData});
          },       
        };
      });
})();   