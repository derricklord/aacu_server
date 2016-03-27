(function () {
    'use strict';

    angular.module('app.page')
        .controller('signoutCtrl', ['$scope', '$auth', '$state', 'logger', signoutCtrl])


    function signoutCtrl($scope, $auth, $state, logger) {
        if (!$auth.isAuthenticated()) { return; }
        
        $auth.logout()
            .then(function() {
                logger.logError("Successfully Logged out");
                $state.go('login');
            })
            .catch(function(response) {
                logger.logError(response);
            });           
    }   
})(); 