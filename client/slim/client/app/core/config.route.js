(function () {
    'use strict';

    angular.module('app')
        .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$authProvider' , function($routeProvider, $stateProvider, $urlRouterProvider, $authProvider) {
            $urlRouterProvider.otherwise("/page/signin");

            $stateProvider
                .state('dashboard', {
                  url: "/",
                  templateUrl: "app/profile/profile.html",
                  controller: 'profileCtrl',
                  resolve: {
                    loginRequired: loginRequired
                  }                                
                })                                            
                .state('details', {
                    url:"/app/details/:id",
                    templateUrl: "app/details/details.html",
                    controller: 'detailsCtrl',
                    resolve: {
                     loginRequired: loginRequired
                    }                                      
                })
                .state('listings', {
                    url:"/app/listings",
                    templateUrl: "app/listings/listings.html",
                    controller: 'listingsCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }                                       
                })               
                .state('messages', {
                    url:"/app/messages",
                    templateUrl: "app/messages/messages.html",
                    controller: 'messagesCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }                                         
                })  
                .state('booking', {
                    url:"/app/booking",
                    templateUrl: "app/booking/booking.html",
                    controller: 'bookingCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }                                         
                }) 
                .state('travel', {
                    url:"/app/travel",
                    templateUrl: "app/travel/travel.html",
                    resolve: {
                        loginRequired: loginRequired
                    }                                         
                })                 
                .state('bookingUpdate', {
                    url:"/app/bookingUpdate/:id",
                    templateUrl: "app/booking/update.html",
                    controller: 'bookingUpdateCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }                                         
                })                    
                .state('signup', {
                    url:"/page/signup",
                    templateUrl: "app/page/signup.html",
                    controller: 'signupCtrl',
                    resolve: {
                        skipIfLoggedIn: skipIfLoggedIn
                    }                    
                })                                     
                .state('login', {
                    url:"/page/signin",
                    templateUrl: "app/page/signin.html",
                    controller: 'signinCtrl',
                    resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                    }                   
                })   
                .state('logout', {
                    url:"/logout",
                    controller: 'signoutCtrl'
                })                               
                .state('admin', {
                  url: "/admin",
                  templateUrl: "app/admin/admin.html",
                  controller: 'adminCtrl'                
                })                
                
                
                
                .state('typography', {
                    url:"/ui/typography",
                    templateUrl: "app/ui/typography.html"
                })               
                .state('icons', {
                    url:"/ui/icons",
                    templateUrl: "app/ui/icons.html"
                })
                .state('buttons', {
                    url:"/ui/buttons",
                    templateUrl: "app/ui/buttons.html"
                }) 
                .state('components', {
                    url:"/ui/components",
                    templateUrl: "app/ui/components.html"
                })
                .state('boxes', {
                    url:"/ui/boxes",
                    templateUrl: "app/ui/boxes.html"
                })  
                .state('timeline', {
                    url:"/ui/timeline",
                    templateUrl: "app/ui/timeline.html"
                })
                .state('widgets', {
                    url:"/ui/widgets",
                    templateUrl: "app/ui/widgets.html"
                })  
                .state('nested-lists', {
                    url:"/ui/nested-lists",
                    templateUrl: "app/ui/nested-lists.html"
                })   
                .state('pricing-tables', {
                    url:"/ui/pricing-tables",
                    templateUrl: "app/ui/pricing-tables.html"
                })                                               
                .state('grids', {
                    url:"/ui/grids",
                    templateUrl: "app/ui/grids.html"
                })
                .state('calendar', {
                    url:"/ui/calendar",
                    templateUrl: "app/ui/calendar.html"
                })                                                                                                                                        
                .state('tasks', {
                    url:"/app/tasks",
                    templateUrl: "app/app/tasks.html"
                });



            
            // Google
            $authProvider.google({
                url: '/auth/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
                clientId: '790472884108-bt5p0tdsfmub6khgu2r48nnlk2goie76.apps.googleusercontent.com',
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                scopeDelimiter: ' ',
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display'],
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 580, height: 400 }
            }); 
            
            function skipIfLoggedIn($q, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                deferred.reject();
                } else {
                deferred.resolve();
                }
                return deferred.promise;
            }

            function loginRequired($q, $location, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                deferred.resolve();
                } else {
                $location.path('/#/pages/signin');
                }
                return deferred.promise;
            }
            
            function adminRequired($q, $location, $auth) {
                var deferred = $q.defer();
                var payload = $auth.getPayload();
                if ($auth.isAuthenticated() && payload.admin) {
                deferred.resolve();
                } else {
                $location.path('/home');
                }
                return deferred.promise;
            }             
            
            
            
        }]
    );

})(); 