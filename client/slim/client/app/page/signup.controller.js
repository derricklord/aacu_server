(function () {
    'use strict';

    angular.module('app.page')
        .controller('signupCtrl', ['$scope', '$auth', '$state', 'logger', 'Users', signupCtrl])


    function signupCtrl($scope, $auth, $state, logger, Users) {
        $scope.user = {
            email: '',
            password: '',
            displayName: ''    
        }
        
        $scope.signup = signupUser;
	        
        
       //Controller Functions 
       function signupUser(){
           Users.signupUser($scope.user).then(function(user){
               logger.log('Welcome to All Access Cheer Universe');
               $state.go('dashboard');
           },
           function(error){
               logger.logError(error);
           });
       }

    }   
})(); 