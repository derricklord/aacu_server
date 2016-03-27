(function () {
    'use strict';

    angular.module('app.page')
        .controller('profileCtrl', ['$scope', '$window', 'logger', '$uibModal', 'Profile', 'Bookings', 'Messages', '$log', profileCtrl])

    function profileCtrl($scope, $window, logger, $uibModal, Profile, Bookings, Messages, $log) {

        $scope.addMedia = addMedia;
        $scope.removeMedia = removeMedia;
        
        $scope.addReference = addReference;
        $scope.removeReference = removeReference;
        
        $scope.addSpecialty = addSpecialty;
        $scope.removeSpecialty = removeSpecialty;
        
        $scope.addCertification = addCertification;
        $scope.removeCertification = removeCertification;
        
        $scope.removeLocation = removeLocation;
        
        $scope.updateProfile = updateProfile;
        $scope.updateBooking = updateBooking;


     
        
        
        //Initialize Profile

        
        function init(){
            Profile.getProfile().then(function(profile){
                $scope.profile = profile.data;
            });
            
            Bookings.getBookings().then(function(bookings){
                $scope.bookings = bookings.data;
            });
            
            Bookings.getRequests().then(function(requests){
                $scope.requests = requests.data;
            });
                       
            Messages.getMessages().then(function(messages){
                $scope.messages = messages.data;
                
            });
        }
        
        
        //Update Profile
        function updateProfile(){
            Profile.updateProfile($scope.profile).then(function(profile){
               $scope.profile = profile.data;
               logger.log('Profile Updated'); 
            });
        }
        
         //Update Profile
        function updateBooking(booking){
            Bookings.updateBooking(booking).then(function(booking){
               console.log(booking);
               logger.log('Booking Updated');
               updateProfile(); 
            });
            
        }
 
        
        
        //Media Functions
        $scope.media = {
            url: ''    
        } 
        
        function addMedia(){
            $scope.profile.media.push($scope.media.url);
            $scope.media.url = '';
            updateProfile();
        }
        
        function removeMedia($index){
            $scope.profile.media.splice($index, 1);
            updateProfile();
        }
        
        //Skills Functions
        $scope.specialty = {
            name: ''
        };
        
        function addSpecialty(){
            if($scope.profile.specialties.indexOf($scope.specialty.name) === -1 && $scope.specialty.name !== ''){
                $scope.profile.specialties.push($scope.specialty.name);
                $scope.specialty.name = '';
                updateProfile();
            }else{
                if($scope.specialty.name === ''){
                    logger.log('Please select Specialty')
                }else{
                    $scope.specialty.name = '';            
                    logger.log('Specialty Already present');                   
                }
            }

        }
        
        function removeSpecialty($index){
            $scope.profile.specialties.splice($index, 1);
            updateProfile();
        }

        //Location Functions
        $scope.location = '';
        $scope.locations = [];
        //$scope.places = [];
        function removeLocation($index){
            $scope.profile.locations.splice($index, 1)
            updateProfile();
        }
        
        

        
        //Certification Functions
        $scope.certificate = {
            name: ''
        };
        
        function addCertification(){
            if($scope.profile.certifications.indexOf($scope.certificate.name) === -1 && $scope.certificate.name !== ''){
                $scope.profile.certifications.push($scope.certificate.name);
                $scope.certificate.name = '';
                updateProfile();
            }else{
                if($scope.certificate.name === ''){
                    logger.log('Please select Certificate');
                }else{
                    $scope.certificate.name = '';
                    logger.log('Certificate Already present');                  
                }
            }

        }  
             
        function removeCertification($index){
            $scope.profile.certifications.splice($index, 1);
            updateProfile();
        }       
        
        //Reference Functions
        $scope.reference = {
            name: '',
            address: '',
            phone: '',
            email: ''
        }
        
        function addReference(){
            
            $scope.profile.references.push($scope.reference);
            $scope.reference = {
                name: '',
                address: '',
                phone: '',
                email: ''
            };
            
            updateProfile();
        }
        
        function removeReference($index){
            $scope.profile.references.splice($index, 1);
            updateProfile();
        }
        
   
        init();  
        
    } 
})(); 
