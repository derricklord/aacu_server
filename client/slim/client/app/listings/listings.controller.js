(function() {
    'use strict';

    angular
        .module('app')
        .controller('listingsCtrl', listingsCtrl);

    listingsCtrl.$inject = ['$compile', '$scope',  '$state', 'logger', 'Users', '$filter', 'Messages', 'Bookings'];

    /* @ngInject */
    function listingsCtrl($compile, $scope,  $state, logger, Users, $filter, Messages, Bookings){
        $scope.sendMessage = sendMessage;
        $scope.postMessage = postMessage;
        $scope.cancelMessage = cancelMessage;
        
        $scope.bookSpecialist = bookSpecialist;
        $scope.postBooking = postBooking;
        $scope.cancelBooking = cancelBooking;
        
        $scope.availability = availability;
        
        

        $scope.message = {
            title: '',
            body: '',
            recepientId: '' 
        }
        
        $scope.booking = {
            description: '',
            bookingDate: '',
            endDate: '',
            specialistId: '' 
        }        
        
        $scope.searchKeywords = '';

        $scope.filteredStores = [];

        $scope.row = '';

        $scope.select = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
        };

        $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        $scope.search = function() {
            $scope.filteredStores = $filter('filter')($scope.listings, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        $scope.order = function(rowName) {
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredStores = $filter('orderBy')($scope.listings, rowName);
            return $scope.onOrderChange();
        };

        $scope.numPerPageOpt = [3, 5, 10, 20];

        $scope.numPerPage = $scope.numPerPageOpt[2];

        $scope.currentPage = 1;

        $scope.currentPageStores = [];

        function availability(listing){
            console.log(listing)
            $state.go('details', {id:listing.id});
        }


        
        function hideAvailability(id){
            $scope.isCollapsed = !$scope.isCollapsed;
        }
        
        function sendMessage(id){
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.message.recepientId = id;
        }
        
        function postMessage(){
            $scope.isCollapsed = !$scope.isCollapsed;
           
            Messages.postMessage($scope.message)
            .then(function(response){
                logger.log(response);               
            },
            function(error){
                logger.log(error);
            });
            $scope.message = {
                title: '',
                body: '',
                recepientId: '' 
            }            
        }
        
        function cancelMessage(){
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.message = {
                title: '',
                body: '',
                recepientId: '' 
            }            
        }
        
        function bookSpecialist(id){
            $scope.isReady = !$scope.isReady;
            $scope.booking.specialistId = id;
            console.log($scope.booking);
        }
        
        function postBooking(){
             $scope.isReady = !$scope.isReady;
             console.log($scope.booking);
             Bookings.postBooking($scope.booking)
                .then(function(response){
                    console.log(response);
                },
                function(error){
                    console.log(error);
                });
                
             $scope.booking = {
                title: '',
                body: '',
                recepientId: '' 
            }  
        }
        
        function cancelBooking(){
            $scope.isReady = !$scope.isReady;
            $scope.booking = {
                title: '',
                body: '',
                recepientId: '' 
            }            
        }       
        /*
        function init(){
            $scope.isCollapsed = !$scope.isCollapsed;
            Users.getListings().then(function(listings){
                $scope.listings = listings.data;
            });            
        }
        */
         function init(){ 
           $scope.isCollapsed = !$scope.isCollapsed;  
           $scope.isReady = !$scope.isReady;
           $scope.isOpen = !$scope.isOpen;
           Users.getListings()
                .success(function(data){
                   console.log(data);
                   $scope.listings = data;
                   $scope.search();
                   return $scope.select($scope.currentPage);       
                })
                .error(function(error){
                    console.log(error);
                }); 
                           
        };       
        
        
        init();
    }
})();