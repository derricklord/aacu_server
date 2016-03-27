(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope', '$auth', 'Listings', 'Profile', 'Messages' , '$modal', 'youtubeEmbedUtils', '$alert', 'growl'];

    /* @ngInject */
    function dashboardCtrl($scope, $auth,  Listings, Profile, Messages, $modal, youtubeEmbedUtils, $alert, growl){

        
        $scope.videoList = [];
        $scope.owned = '';
        
        $scope.init = init;
        $scope.delete = deleteListing;    
        $scope.isAuthenticated = isAuthenticated;
        $scope.logout = logout;
        $scope.showModal = showModal;
        $scope.hideModal = hideModal;

        function videoCtrl($scope){
            var payload = $auth.getPayload();
            var id = payload.sub;           
            $scope.videoUrl = '';
            $scope.addVideo = addVideo;
              
            function addVideo(){
                Profile.addVideo(id, {videoUrl: $scope.videoUrl})
                    .then(function(response){
                        console.log( {videoUrl: $scope.videoUrl});
                        $scope.hideModal();
                    });
            }            
        }        
        videoCtrl.$inject = ['$scope'];
        // Pre-fetch an external template populated with a custom scope
        var videoModal = $modal({scope: $scope, controller: videoCtrl, templateUrl: 'views/modal.video.html', show: false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        
  
             
         
        
        function showModal() {
            videoModal.$promise.then(videoModal.show);
        };
        
        function hideModal(){
           videoModal.$promise.then(videoModal.hide);
        }
        
               
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
                   growl.warning($scope.listings.length + "<b> Listing(s) loaded...</b>");
                })
                .error(function(error){
                    console.log(error);
                });
                
            Messages.getMessages()
                .success(function(data){
                   $scope.messages = data.messages; 
                   growl.info($scope.messages.length + "<b> Message(s) loaded...</b>");
                })
                .error(function(error){ 
                    console.log(error);
                });
                
            Profile.getProfile()
                .success(function(data){
                    $scope.profile = data;
                    var videos = data.videos;
                    if(videos.length >0){
                        growl.success(videos.length + "<b> Video(s) loaded...</b>");
                        videos.forEach(function(video){
                            $scope.videoList.push(youtubeEmbedUtils.getIdFromURL(video));
                        });
                    }
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