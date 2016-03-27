(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope','$auth', '$state', 'Messages'];

    /* @ngInject */
    function mainCtrl($scope, $auth, $state, Messages){
 
        $scope.isAuthenticated = isAuthenticated;
        $scope.isAdmin = isAdmin;
        $scope.logout = logout;
        
        
        function init(){
            /*
           Messages.getMessages()
                .success(function(data){
                    $scope.messages = data.messages;
                })
                .error(function(error){
                    console.log(error);
                });
                */
        }
       
        
        function logout(){
            $auth.logout();
             $("#wrapper").toggleClass("toggled");
            $state.go('login');
            
        };
        
        
        function isAuthenticated() {
          return $auth.isAuthenticated();
        };
        
        function isAdmin(){
           if($auth.isAuthenticated()){
               var payload = $auth.getPayload();
               if(payload.admin === true){
                   return true;
               }else{
                   return false;
               }  
           }else{
               return false;
           }
        }
        
        init();
    }
})();