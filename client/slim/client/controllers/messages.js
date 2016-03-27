(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('messageCtrl', messageCtrl);

    messageCtrl.$inject = ['$scope', '$auth', 'Messages'];

    /* @ngInject */
    function messageCtrl($scope, $auth,  Messages){
        $scope.init = init;

             
      
        function init(){

                
           Messages.getMessages()
                .success(function(data){
                    console.log(data);
                   $scope.messages = data.messages;
                })
                .error(function(error){
                    console.log(error);
                });
                
        };
        

        
        
        init();
    }
})();