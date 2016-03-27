(function () {
    'use strict';

    angular.module('app.page')
        .controller('signinCtrl', ['$scope', '$auth', '$state', 'logger', signinCtrl])


    function signinCtrl($scope, $auth, $state, logger) {
        $scope.user = {
            email: '',
            password: ''    
        }
        
        $scope.login = login;
        $scope.authenticate = authenticate;
        
       //Controller Functions 
       function login() {
          $auth.login({ email: $scope.user.email, password: $scope.user.password })
            .then(function(response) {
                  //growl.success('Successfully logged in');
                  logger.logSuccess('Successfully logged in');
                  $state.go('listings');
            })
            .catch(function(response) {
                $scope.user = {
                    email: '',
                    password: ''    
                }         
                console.log(response.data.message);
                logger.logError(response.data.message);
            });
        };

        
       //Authenticate using Social 
       function authenticate(provider) {
          $auth.authenticate(provider)
            .then(function(data) {  
                  logger.logSuccess('Successfully logged in');
                  $state.go('listings');
            })
            .catch(function(response) {
                logger.logError(response.data);
            });
        };
    }   
})(); 