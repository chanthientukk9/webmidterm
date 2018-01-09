(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('DriverController', DriverController);

    DriverController.$inject = ['$scope', 'BookingService', 'Dialog', '$uibModal', '$cookies'];
    function DriverController($scope, BookingService, Dialog, $uibModal, $cookies) {
        var vm = this;
        window.cc = $scope;
        $scope.customers = null;
        $scope.drivers = null;
        $scope.driverDetail = null;
        activate();

        ////////////////

        function activate() {
            BookingService.GetAllCustomers().then(function (res) {
                $scope.customers = res;
                initMap();
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
                $scope.showDrivers();                
                console.log($scope.profile);
            }, function(err) {

            })
        }

        $scope.logout = function logout() {
            var cookie = $cookies.getAll();
            angular.forEach(cookie, function(v, k) {
                $cookies.remove(k, { path: '/' });
            });
            $scope.profile = null;
            hideDrivers();
            $scope.$evalAsync();
        }

        $scope.showDrivers = function showDrivers() {
            console.log($scope.profile);
            var iconNormalCar = {
                url: "https://d30y9cdsu7xlg0.cloudfront.net/png/996-200.png", // url
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0,0), // origin   
                anchor: new google.maps.Point(0, 32) // anchor
            };
            var lat = $scope.profile.value.lat.split(',').join('.')
            var lng = $scope.profile.value.lng.split(',').join('.')
            var latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

            console.log(latLng);
            $scope.marker2 = new google.maps.Marker({
                position: latLng,
                map: map,   
                icon: iconNormalCar
            });
            // setInterval(function(){
            //     if($scope.profile.value.status == "picking"){
            //         alert("Hello!!")
            //     }
            // }, 1000)                 
        }

        function hideDrivers () {
            $scope.marker2.setMap(null);
        }

    }
})();