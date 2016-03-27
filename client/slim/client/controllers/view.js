(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('viewCtrl', viewCtrl);

    viewCtrl.$inject = ['$scope', 'Coupons', 'Listings', '$stateParams'];

    /* @ngInject */
    function viewCtrl($scope, Coupons, Listings, $stateParams){
        //Page Variables
        var id = $stateParams.id;
        /*
        $scope.map = { 
            center: { latitude: 37.70, longitude: -117.16 }, 
            zoom: 4 
        };
        */
        $scope.listing = {};
        $scope.markers = [];
        $scope.init = init;
        
        //Initialize
        function init(){                
            Listings.getListing(id)
                .success(function(data){
                    $scope.listing = data;
                    /*
                    $scope.map = { 
                        center: { latitude: data.listing.loc.lat, longitude: data.lising.loc.long}, 
                        zoom: 11 
                    };

                    */
                    var listing = data;
                    listing.locations.forEach(function(location){
                        var marker = {};
                        marker._id = listing._id;
                        marker.coords = {latitude:location.loc.lat, longitude:location.loc.long};
                        $scope.markers.push(marker);                           
                    });
                    $scope.map = { 
                        center: { latitude: $scope.markers[0].coords.latitude, longitude: $scope.markers[0].coords.longitude}, 
                        zoom: 12 
                    };                    
                              
                })
                .error(function(error){
                    console.log(error);
                })                
        };
        
        $scope.init();
    }
})();
 