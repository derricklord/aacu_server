(function() {
    'use strict';

    angular
        .module('app')
        .controller('studentCtrl', studentCtrl);

    studentCtrl.$inject = ['$scope'];

    /* @ngInject */
    function studentCtrl($scope){
        $scope.init = init;

             
      
        function init(){

           /*     
           Messages.getMessages()
                .success(function(data){
                    console.log(data);
                   $scope.messages = data.messages;
                })
                .error(function(error){
                    console.log(error);
                });
           */     
        };
        

        
        
        init();
    }
})();