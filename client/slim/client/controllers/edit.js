(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['$scope', 'Coupons', 'Listings','$state', '$stateParams'];

    /* @ngInject */
    function editCtrl($scope, Coupons, Listings, $state, $stateParams){
        //Page Variables
        var id = $stateParams.id
        
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {};
        $scope.listing = {};
        $scope.init = init;
        $scope.updateListing = updateListing;
      
        function updateListing(){
               Listings.updateListing($scope.listing)
                .success(function(data){
                    $state.go('home');
                })
                .error(function(error){
                    console.log(error);
                })         
        };
        

        //Initialize
        function init(){
            Coupons.getCoupon(id)
                .success(function(data){
                    $scope.coupon = data;
                })
                .error(function(){
                    console.log(error);
                });
                
             Listings.getListing(id)
                .success(function(data){
                    $scope.listing = data;
                    console.log(data);
                })
                .error(function(error){
                    console.log(error);
                })               
        };
        
        
        
        //Address Configuration
        $scope.showAddress = false;
        $scope.addressButton = 'Add Address';
        $scope.toggleAddress =  function(){
            $scope.showAddress = !$scope.showAddress;
        };
        
        
        $scope.removeLocation = function($index){
            $scope.coupon.locations.splice($index, 1);
        };
        
        
        //Dropzone Configuration
        $scope.showDropzone = false;
        $scope.fileAdded = false;
        $scope.partialDownloadLink = 'http://localhost:3000/uploads/';
        $scope.filename = '';

        
        $scope.toggleDropzone =  function(){
            $scope.showDropzone = !$scope.showDropzone;
        };
        $scope.uploadFile = function() {
            $scope.processQueue();
        };

        $scope.reset = function() {
            $scope.resetDropzone();
            $scope.coupon.img = '';
            $scope.coupon.hasImage = false;
        };
        

        
        $scope.init();
    }
})();