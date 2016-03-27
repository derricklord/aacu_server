(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$auth', 'Listings', 'Profile', '$modal'];

    /* @ngInject */
    function homeCtrl($scope, $auth,  Listings, Profile, $modal){
        $scope.init = init;
        $scope.delete = deleteListing;    
        $scope.isAuthenticated = isAuthenticated;
        $scope.logout = logout;

        $scope.owned = '';
        $scope.setOwned = setOwned;
        $scope.payload = $auth.getPayload();

        function setOwned(owner){
            if(owner._id === $scope.owned){
                //$scope.owned = '';
                console.log('Owned');
                console.log(owner);
            }else{
                //$scope.owned = owner._id;
                console.log('Not Owned');
                console.log(owner);
            }
        };
        



        function logout(){
            $auth.logout();
        };
        
        
        function isAuthenticated() {
          return $auth.isAuthenticated();
        };
             
        
        function init(){

                
           Listings.getListings()
                .success(function(data){
                    $scope.listings = data.listings;
                })
                .error(function(error){
                    console.log(error);
                });
                
            Profile.getProfile()
                .success(function(data){
                    $scope.profile = data;
                    //console.log(data);
                })
                .error(function(error){
                    console.log(error);
                });
        };
        
        function deleteListing(id){
            Listings.deleteListing(id)
                .success(function(data){
                    $scope.init();
                })
                .error(function(error){
                    console.log(error);
                })
        };
        
        
        init();
    }
})();