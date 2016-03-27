(function () {
    'use strict';

    angular
        .module('app.page')
        .directive('googlePlaces', googlePlaces);

    googlePlaces.$inject = ['Profile', 'logger'];

    /* @ngInject */
    function  googlePlaces(Profile, logger) {

        var directive = {
            replace: true,
            link: link,
            restrict: 'E',
            templateUrl: 'app/profile/google.html',
            scope: {
                location:'=',
                places: '=',
                profile: '='
            }
        };
        return directive;

        function link($scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    console.log('Place Change');
                    var place = autocomplete.getPlace();
                    $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    $scope.profile.locations.push({
                        url: place.url,
                        place_id: place.place_id,
                        locality: place.locality,
                        address: place.formatted_address,
                        loc: {
                            lat: place.geometry.location.lat(),
                            long: place.geometry.location.lng()
                        }
                    });
                    $scope.$apply(function(){
                        $("#google_places_ac")[0].value = '';
                    });
                });       
        }
    }

})();