(function() {
    'use strict';

    angular
        .module('app')
        .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope', '$state', '$filter', 'Users', 'Profile', 'logger'];

    /* @ngInject */
    function adminCtrl($scope, $state, $filter, Users, Profile, logger){
        $scope.init = init;
        $scope.delete = deleteUser;
        $scope.message = messageUser;
        $scope.enableListing = enableListing;
        $scope.enableAdmin = enableAdmin;

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
            $scope.filteredStores = $filter('filter')($scope.users, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        $scope.order = function(rowName) {
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredStores = $filter('orderBy')($scope.users, rowName);
            return $scope.onOrderChange();
        };

        $scope.numPerPageOpt = [3, 5, 10, 20];

        $scope.numPerPage = $scope.numPerPageOpt[2];

        $scope.currentPage = 1;

        $scope.currentPageStores = [];
             
      
        function init(){ 
           Profile.getProfile().then(function(profile){
                $scope.profile = profile.data;
           });           
            
           Users.getUsers()
                .success(function(data){
                   $scope.users = data;
                   $scope.search();
                   return $scope.select($scope.currentPage);     
                    
                })
                .error(function(error){
                    console.log(error);
                }); 
                           
        };
        
        function deleteUser(id){
            Users.deleteUser(id)
                .success(function(data){
                    $scope.init();
                })
                .error(function(error){
                    console.log(error);
                })
        };  
        
        function messageUser(id){
            console.log('Messaging user: ' + id);
        }     
        
        function enableListing(id){
           Users.enableListing(id)
                .success(function(data){
                    logger.log(data.message); 
                })
                .error(function(error){
                    console.log(error);
                })
        }
        
        function enableAdmin(id){
           if($scope.profile.isAdmin){
            Users.enableAdmin(id)
                    .success(function(data){
                        logger.log(data.message); 
                    })
                    .error(function(error){
                        console.log(error);
                    })               
           } 
        }       
        
        init();        

    }
})();