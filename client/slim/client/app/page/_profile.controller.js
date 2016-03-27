(function () {
    'use strict';

    angular.module('app.page')
        .controller('profileCtrl', ['$scope', '$window', 'logger', '$uibModal', 'Profile', '$log', profileCtrl])

    function profileCtrl($scope, $window, logger, $uibModal, Profile, $log) {
         Profile.getProfile().then(function(profile){
             $scope.profile = profile.data;
         });
         
        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/profile/modalInfo.html',
                controller: 'infoCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
             
         
         
         
    } 
})(); 



