(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('videoCtrl', videoCtrl);

    videoCtrl.$inject = ['$scope', 'Listings', 'Profile', '$auth', '$state'];

    /* @ngInject */
    function videoCtrl($scope, Listings, Profile, $auth, $state){
        $scope.videoUrl = '';
        $scope.addVideo = addVideo;
        
        var payload = $auth.getPayload();
        var id = payload.sub;

        function addVideo(){
            Profile.addVideo(id, {videoUrl: $scope.videoUrl})
                .then(function(response){
                   
                    $state.go('dashboard');
                });
        }       
    }
})();