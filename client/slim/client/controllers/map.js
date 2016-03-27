(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('mapCtrl', mapCtrl);

    mapCtrl.$inject = ['$scope', '$state', '$auth','Coupons', 'Listings', 'Profile', '$modal'];

    /* @ngInject */
    function mapCtrl($scope, $state, $auth, Coupons, Listings, Profile, $modal){
        $scope.init = init;
        $scope.clicked = click;
        $scope.map = { 
            center: { latitude: 37.70, longitude: -117.16 }, 
            zoom: 4 
        };
             
        $scope.options = {
            scrollwheel: false
        };
        
        $scope.markers = [];
             

                         
             
        //Initialize
        function init(){
                
            Listings.getListings()
                .success(function(data){
                    var listings = data.listings;
                    
                    listings.forEach(function(listing){
                        listing.locations.forEach(function(location){
                            var marker = {};
                            marker._id = listing._id;
                            marker.coords = {latitude:location.loc.lat, longitude:location.loc.long};
                            $scope.markers.push(marker);                           
                        });
                    }); 
                    
                    if(data >0){
                        //$scope.map.center = {latitude: $scope.markers[0].latitude, longitude: $scope.markers[0].longitude };
                        $scope.markers[0];
                    }
                     
                })
                .error(function(error){
                    console.log(error);
                });
                
               
                               
        };
        
        function click(id){
            $state.go('view', {id:id})
        };
        
        $scope.init();             
    }
})();