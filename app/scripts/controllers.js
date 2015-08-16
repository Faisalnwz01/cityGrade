angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope, $rootScope, $http, ngGPlacesAPI, nycHealth) {



        $scope.playlists = [{
            title: 'Reggae',
            id: 1
        }, {
            title: 'Chill',
            id: 2
        }, {
            title: 'Dubstep',
            id: 3
        }, {
            title: 'Indie',
            id: 4
        }, {
            title: 'Rap',
            id: 5
        }, {
            title: 'Cowbell',
            id: 6
        }];
    })
    .factory('nycHealth', function($http, ngGPlacesAPI) {
        var processedArray = [];
        var healthData = function(data) {
            var resName;
            var number = [];
            var resStreetNum;
            var boro
            var cityOpenDataUrl = 'https://data.cityofnewyork.us/resource/9w7m-hzhe.json?dba='
            var borugh = '&boro='
            data.forEach(function(data) {
                    resName = data.name.toUpperCase();
                    var str = data.vicinity.split(' ')
                    resStreetNum = Number(str[0]);
                    var number = str.length - 1
                    boro = str[number].toUpperCase()
                    console.log(boro, resStreetNum, resName)
                    var getUrl = cityOpenDataUrl + resName + borugh + boro;
                    $http.get(getUrl)
                        .then(function(dat) {
                            return processedArray.push(dat)

                        })

                })
                // var cityOpenDataUrl = 'https://data.cityofnewyork.us/resource/9w7m-hzhe.json?phone='
                // var borugh = '&boro='
                // data.forEach(function(value, key) {
                //     var getPhoneNumers = ngGPlacesAPI.placeDetails({
                //         reference: value.reference
                //     }).then(
                //         function(el) {
                //             return el
                //         });
                //     getPhoneNumers.then(function(el) {
                //         var phoneNumber = el.formatted_phone_number
                //         phoneNumber = phoneNumber.replace(/\s/g, '');
                //         phoneNumber = phoneNumber.replace(/\)/g, '');
                //         phoneNumber = phoneNumber.replace(/\(/g, '');
                //         phoneNumber = phoneNumber.replace(/\-/g, '');
                //         // console.log(el)
                //         var getUrl = cityOpenDataUrl + phoneNumber;

            //         $http.get(getUrl)
            //             .then(function(dat) {
            //                 processedArray.push(dat)
            //                 console.log(processedArray)
            //                 return
            //             })
            //     })

            // })
            console.log(timedoutData())
            return timedoutData()




        }
        var timedoutData = function() {
            setTimeout(function() {
                return processedArray
            }, 100);
            return processedArray

        }

        return {
            nycData: function(data) {
                return healthData(data);
            }

        };
    })

.controller('PlaylistCtrl', function($scope, $stateParams) {});
