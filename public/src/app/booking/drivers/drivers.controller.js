(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('DriverController', DriverController);

    DriverController.$inject = ['$scope', 'BookingService', 'Dialog', '$uibModal'];
    function DriverController($scope, BookingService, Dialog, $uibModal) {
        var vm = this;
        window.cc = $scope;
        $scope.customers = null;
        $scope.drivers = null;
        $scope.driverDetail = null;
        var markers = [];
        activate();

        ////////////////

        function activate() {
            BookingService.GetAllCustomers().then(function (res) {
                $scope.customers = res;
                initMap();
                $scope.showDriver();
            });
            setInterval(function() {
                loadingData();
            }, 5000);
        }

        function loadingData() {
            
            BookingService.GetAllCustomers().then(function (res) {
                $scope.customers = res;
                for(var i = 0; i < markers.length; i++) {
                    if(res[i].value.status != markers[i].status) {
                        markers[i].marker.setMap(null);                    
                    }
                }
                $scope.showAllCustomer();
                $scope.showDriver();            
            });
        }

        var map;
        var directionsService;
        var directionsDisplay;
        function initMap() {
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 10.7638442, lng: 106.6622009 },
                zoom: 14
            });
            directionsDisplay.setMap(map);
        }

        var position;

        $scope.showDriver = function showDriver() {
            BookingService.GetAllDrivers().then(function (res) {
                $scope.drivers = res;
                console.log('drivers', $scope.drivers);
            })
        }
        $scope.signIn = function signIn() {
            $uibModal.open({
                templateUrl: 'app/booking/drivers/signIn.html',
                controller: 'SignInController1',
                size: 'lg',
            }).result.then(function (data) {
                $scope.driver = data;
                getProfile();
            })
        } 

        function getProfile() {
            BookingService.GetDriver().then(function(res) {
                $scope.profile = res;
                console.log($scope.profile);
            }, function(err) {

            })
        }

        $scope.showAllCustomer = function showAllCustomer() {
            markers = [];
            var img2 = {
                url: 'https://maps.google.com/mapfiles/ms/icons/green.png',
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
            var iconNormalCar = {
                url: "https://d30y9cdsu7xlg0.cloudfront.net/png/996-200.png", // url
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            var iconPremiumCar = {
                url: 'https://cdn0.iconfinder.com/data/icons/classic-cars-by-cemagraphics/512/red_512.png',
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
            for (var i = 0; i < $scope.drivers.length; i++) {
                
                if ($scope.drivers[i].id == $scope.profile.id) {
                    var latLng = new google.maps.LatLng($scope.drivers[i].value.lat, $scope.drivers[i].value.lng);
                    var marker2 = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: iconNormalCar
                    });
                    markers.push({
                        marker: marker2,
                        status: $scope.drivers[i].value.status
                    });
                    // setInterval(function(){
                    //     if($scope.profile.value.status == "picking"){
                    //         alert("Hello!!")
                    //     }
                    // }, 1000)                 
                }
            };
        }

    }
})();