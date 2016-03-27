(function () {
    'use strict';

    angular.module('app.nav')
        .controller('sidebarCtrl', ['$scope', '$window', '$auth', 'logger', 'Profile', 'Messages', sidebarCtrl])

    function sidebarCtrl($scope, $window, $auth, logger, Profile, Messages) {
         $scope.isAuthenticated = isAuthenticated;
         
         function init(){
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