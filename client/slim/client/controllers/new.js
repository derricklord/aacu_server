(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['$scope', 'Coupons', 'Listings', '$state'];

    /* @ngInject */
    function newCtrl($scope, Coupons, Listings,  $state){
        //Page Variables
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {
            title: '',
            desc: '',
            desc2: '',
            code: '',
            footer: '',
            active: false,
            hasImage: false,
            img: '',
            category:[],
            locations: [],
            expiration: new Date(),
            expires: true,
            premium:false,
            vendor: '',
            vendor_url: '',
            vendor_phone: '',
            vendor_logo: '',
        };
        
        $scope.listing = {
            title: '',
            details: '',
            disclaimer: '',
            active: false,
            hasImage: false,
            depositAmt: 0,
            categories:[],
            locations: [],
            url: '',
            phone: '',
            image: '',
        };       

        
        
        //Address Configuration
        $scope.showAddress = false;
        $scope.addressButton = 'Add Address';
        $scope.toggleAddress =  function(){
            $scope.showAddress = !$scope.showAddress;
        };
        
        
        $scope.removeLocation = function($index){
            $scope.listing.locations.splice($index, 1);
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
            $scope.listing.image = '';
            $scope.coupon.hasImage = false;
        };
        
        //Save Coupon
        $scope.saveListing = function(){
            console.log('Saving Listing');
            if($scope.filename){
                $scope.listing.img = $scope.filename;
            }
            
            if($scope.listing.depositAmt){
                var strAmount = $scope.listing.depositAmt;
                $scope.listing.depositAmt = parseInt(strAmount);
            }
            
            Listings.postListing($scope.listing)
                .success(function(data){
                    console.log(data);
                    $state.go('home');
                })
                .error(function(error){
                    console.log('Error');
                    //$state.go('home');
                });
        }
        
    }
})();