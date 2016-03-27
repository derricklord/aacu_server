(function() {
    'use strict';

    angular
        .module('app')
        .controller('messagesCtrl', messagesCtrl);

    messagesCtrl.$inject = ['$scope','Messages', '$filter', 'logger'];

    /* @ngInject */
    function messagesCtrl($scope, Messages, $filter, logger){
        $scope.sendMessage = sendMessage;
        $scope.postMessage = postMessage;
        $scope.cancelMessage = cancelMessage;
        $scope.init = init;

        $scope.message = {
            title: '',
            body: '',
            recepientId: '' 
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
            $scope.filteredStores = $filter('filter')($scope.messages, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        $scope.order = function(rowName) {
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredStores = $filter('orderBy')($scope.messages, rowName);
            return $scope.onOrderChange();
        };

        $scope.numPerPageOpt = [3, 5, 10, 20];

        $scope.numPerPage = $scope.numPerPageOpt[2];

        $scope.currentPage = 1;

        $scope.currentPageStores = [];             

        function sendMessage(id){
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.message.recepientId = id;

        }
        
        function postMessage(){
            $scope.isCollapsed = !$scope.isCollapsed;
            console.log($scope.message);
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

      
        function init(){

           $scope.isCollapsed = !$scope.isCollapsed;     
           Messages.getMessages()
                .success(function(data){
                    console.log(data);
                   $scope.messages = data;
                   $scope.search();
                   return $scope.select($scope.currentPage);                      
                })
                .error(function(error){
                    logger.log(error);
                });
                
        };
        

        
        
        init();
    }
})();