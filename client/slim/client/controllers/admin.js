(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope','$auth', '$state', 'Users', 'Messages'];

    /* @ngInject */
    function adminCtrl($scope, $auth, $state, Users, Messages){
        $scope.init = init;
        $scope.delete = deleteUser;
        $scope.message = messageUser;


             
      
        function init(){    
           Users.getUsers()
                .success(function(data){
                   $scope.users = data;
                })
                .error(function(error){
                    console.log(error);
                }); 
        };
        
        function deleteUser(id){
            Users.deleteUser(id)
                .success(function(data){
                    $scope.init();
                })
                .error(function(error){
                    console.log(error);
                })
        };  
        
        function messageUser(id){
            console.log('Messaging user: ' + id);
        }     

        
        
        init();        

    }
})();