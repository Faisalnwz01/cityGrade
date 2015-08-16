// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngGPlaces'])

.run(function($ionicPlatform, $cordovaGeolocation, $rootScope, $http, ngGPlacesAPI, nycHealth) {
    $ionicPlatform.ready(function() {
        // var googleapisKey = '&key=AIzaSyAH_IyMyerV407ZCEa29Kq7ciIysSwrRSE';
        // var reverseGeocodeApli = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
        $rootScope.dataArray = [];
        //set the default options for the ngPlacesApi
      
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                $rootScope.lat = position.coords.latitude;
                $rootScope.long = position.coords.longitude;                
                    // var getUrl = reverseGeocodeApli + lat + ',' + long + googleapisKey
                console.log($rootScope.lat, $rootScope.long)
                $rootScope.data = ngGPlacesAPI.nearbySearch({
                    latitude: $rootScope.lat,
                    longitude: $rootScope.long
                }).then(
                    function(data) {
                        $rootScope.nearbyRes = data;
                      nycHealth.nycData(data)
                    });
            }, function(err) {
                alert('Seems liek your location settings are turned off. Please check your location setting!')
                    // error
            });

        var watchOptions = {
            frequency: 1000,
            timeout: 3000,
            enableHighAccuracy: false // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
            null,
            function(err) {
                // error
            },
            function(position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                console.log('watch', lat, long)
            });


        watch.clearWatch();
        // OR
        $cordovaGeolocation.clearWatch(watch)
            .then(function(result) {
                // success
                console.log(result)
            }, function(error) {
                // error
            });


        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, ngGPlacesAPIProvider) {
   ngGPlacesAPIProvider.setDefaults({
    radius:1000,
     nearbySearchKeys: ['name', 'reference', 'vicinity', 'phone',],
  });
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});
