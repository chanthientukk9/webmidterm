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
            initMap();
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
            console.log(map);
            directionsDisplay.setMap(map);
        }

        var position;

        $scope.signIn = function signIn() {
            $uibModal.open({
                templateUrl: 'app/booking/drivers/signIn.html',
                controller: 'SignInController1',
                size: 'lg',
            }).result.then(function (data) {
                $scope.showDrivers(data);
                getProfile();
                $scope.interval = setInterval(function(){
                    console.log($scope.marker2);                
                    getProfile();
                    console.log($scope.profile.value.status);
                }, 5000);
            })
        } 

        function getProfile() {
            BookingService.GetDriver().then(function(res) {
                $scope.profile = res;
                if($scope.profile && $scope.profile.value && $scope.profile.value.status == "pending"){
                    clearInterval($scope.interval);
                    setTimeout(function () {
                        var data = {
                            status: 'deny',
                            customer: $scope.customer
                        }
                        BookingService.ReplyInvitation(data).then(function (res) {
                            setInterval($scope.interval);                               
                            Dialog.Success("Thành công", "Đã từ chối khách hàng"); 
                        }).catch(function(err){
                            Dialog.Error("Lỗi", "Lỗi mất rùi");
                        })
                    }, 5000)
                    Dialog.Confirm('Có khách kìa ông?', 'Xác nhận chuyến', 'OK', function (isConfirm) {
                        if (isConfirm) {
                            var data = {
                                status: 'accept',
                                customer: $scope.customer
                            }
                            BookingService.ReplyInvitation(data).then(function (res) {

                            })
                        } else {
                            var data = {
                                status: 'deny',
                                customer: $scope.customer
                            }
                            BookingService.ReplyInvitation(data).then(function (res) {
                                setInterval($scope.interval);                                
                            })                        
                        }
                    });

                    getCustomerDetail($scope.profile.value.customer);
                }
            }, function(err) {
            })
        }

        $scope.logout = function logout() {
            var cookie = $cookies.getAll();
            hideDrivers();
            clearInterval($scope.interval);
            angular.forEach(cookie, function(v, k) {
                $cookies.remove(k, { path: '/' });
            });
            $scope.profile = null;
            $scope.$evalAsync();
        }

        $scope.lat;
        $scope.lng;

        function getCustomerDetail(data) {
            BookingService.GetCustomerDetail(data).then(function (res) {
                $scope.customerDetail = res;
            })
        }
        
        $scope.showDrivers = function showDrivers(data) {
            var iconNormalCar = {
                url: "https://d30y9cdsu7xlg0.cloudfront.net/png/996-200.png", // url
                scaledSize: new google.maps.Size(25, 25), // scaled size
                origin: new google.maps.Point(0,0), // origin   
                anchor: new google.maps.Point(0, 32) // anchor
            };
            var lat = parseFloat(data.value.lat.split(',').join('.'));
            var lng = parseFloat(data.value.lng.split(',').join('.'));
            $scope.lat = lat;
            $scope.lng = lng;
            var latLng = new google.maps.LatLng(lat, lng);

            console.log(latLng);
            $scope.marker2 = new google.maps.Marker({
                position: latLng,
                map: map,   
                icon: iconNormalCar
            });      
            
            google.maps.event.addListener(map, 'click', function(event) {
                var result = [event.latLng.lat(), event.latLng.lng()];
                transition(result);
            });
            //latLng = $scope.latlngNew;
        }

        function hideDrivers () {
            $scope.marker2.setMap(null);
            console.log("aaa");
        }


        var numDeltas = 100;
        var delay = 10; //milliseconds
        var i = 0;
        var deltaLat;
        var deltaLng;

        function transition(result){
            i = 0;
            deltaLat = (result[0] - $scope.lat)/numDeltas;
            deltaLng = (result[1] - $scope.lng)/numDeltas;
            moveMarker();
        }
        
        function moveMarker(){
            $scope.lat += deltaLat;
            $scope.lng += deltaLng;
            $scope.latlngNew = new google.maps.LatLng($scope.lat, $scope.lng);
            $scope.marker2.setTitle("Latitude:"+ $scope.lat +" | Longitude:" + $scope.lng);
            $scope.marker2.setPosition($scope.latlngNew);
            if(i!=numDeltas){
                i++;
                setTimeout(moveMarker, delay);
            }
            //updateLocation();            
        }

        // function updateLocation() {
        //     var data = {
        //         lat: Number($scope.lat),
        //         lng: Number($scope.lng)
        //     }
        //     console.log(data);
        //     BookingService.UpdateLocation(data).then(function (res) {
        //          console.log("abc");
        //     }).catch(function (err) {
        //         console.log("Looix mej roi");
        //     });
        // }
    }
})();