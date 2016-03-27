(function () {
    'use strict';

    angular.module('app.page')
        .controller('infoCtrl', ['$scope', '$auth', '$state', 'logger' ,'$uibModalInstance', infoCtrl])


    function infoCtrl($scope, $auth, $state, logger, $uibModalInstance) {
        console.log('Modal Info Controller');
        $scope.ok = function() {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };    
    }   
})(); 