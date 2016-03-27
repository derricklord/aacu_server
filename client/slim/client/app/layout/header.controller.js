(function () {
    'use strict';

    angular.module('app.nav')
        .controller('headerCtrl', ['$scope', '$window', '$auth', 'logger', 'Profile', 'Messages', headerCtrl])

    function headerCtrl($scope, $window, $auth, logger, Profile, Messages) {
         $scope.isAuthenticated = isAuthenticated;
         
         function init(){
            Messages.getMessages().then(function(messages){
                $scope.messages = messages.data;  
            });
            
            Profile.getProfile().then(function(profile){
                $scope.profile = profile.data;
            });           
         }
         
         function isAuthenticated(){
            return $auth.isAuthenticated();
         }
         
         init();
    }
})(); 