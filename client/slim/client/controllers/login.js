(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope','$auth', '$state', 'Listings', 'growl'];

    /* @ngInject */
    function loginCtrl($scope, $auth, $state, Listings, growl){
        $scope.init = init;
        $scope.clicked = click;
        $scope.authenticate = authenticate;
        $scope.login = login;
        
        //Setup Map
        $scope.map = { 
            center: { latitude: 37.70, longitude: -117.16 }, 
            zoom: 4 
        };
             
        $scope.options = {
            scrollwheel: false
        };
        
        $scope.markers = [];
             
        $scope.user = {
          email: $scope.email,
          password: $scope.password
        };


        
       //Controller Functions 
       function login() {
          $auth.login({ email: $scope.email, password: $scope.password })
            .then(function(data) {
                growl.success('Successfully logged in');
                $state.go('home');
            })
            .catch(function(response) {
                $scope.user = {
                    email: '',
                    password: ''    
                }               
                growl.error('Error logging in, please try again');
            });
        };

        
       //Authenticate using Social 
       function authenticate(provider) {
          $auth.authenticate(provider)
            .then(function(data) {      
               $state.go('home');
                growl.success(data);
            })
            .catch(function(response) {
                 growl.error(response);  
            });
        };
                         
             
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
                })
                .error(function(error){
                    console.log(error);
                });
                
               
                               
        };
        
        function click(id){
            console.log('Clicked');
            $state.go('view', {id:id})
        };
        
        $scope.init();                     
       
    }
})();