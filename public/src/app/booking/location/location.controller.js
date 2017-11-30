(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', 'BookingService', 'Dialog'];
    function LocationController($scope, BookingService, Dialog) {
        var vm = this;
        $scope.customerDetail = null;
        window.cc = $scope;
        $scope.isLocated = false;
        $scope.choosenDriver = null;
        activate();

        ////////////////

        function activate() { 
            loadFirstData();
        }
        var map;
        var marker;
        var markers = [];
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.7638442, lng: 106.6622009},
            zoom: 14
          });
          $scope.showMarkerWhenClicking();
        }

        var position = {};

        function loadFirstData() {
            BookingService.GetCustomers('pending').then(function (res) {
                $scope.customers = res;
                initMap();
            })
        }

        
        $scope.showDetail = function showDetail(customer) {
            $scope.customerDetail = customer;
            $scope.choosenDriver = null;        
            $scope.isLocated = false;
            if(!$scope.customerDetail.value.lat || !$scope.customerDetail.value.lng){
                $scope.customerDetail.value.lat = 10.7638442;
                $scope.customerDetail.value.lng = 106.6622009;                
            }
            position = {lat: $scope.customerDetail.value.lat, lng: $scope.customerDetail.value.lng};
            console.log('Customer Detail', $scope.customerDetail);
            for(var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
            if (marker) {
                marker.setMap(null);
            }
            map.panTo(position);
            
            marker = new google.maps.Marker({
                position: position,
                map: map
            });
        }

        $scope.reset = function reset() {
            $scope.isLocated = false;
            $scope.choosenDriver = null;        
            for(var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
            if (marker) {
                marker.setMap(null);
            }
        }

        $scope.showMarkerWhenClicking = function showMarkerWhenClicking() {
            map.addListener("click", function(event){
                console.log(event);
                position = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                };
                if(!$scope.isLocated) {
                    
                    $('#latinput').val(position.lat);
                    $('#lnginput').val(position.lng);
                    
                    $scope.customerDetail.value.lat = position.lat;
                    $scope.customerDetail.value.lng = position.lng;

                    if (marker) {
                        marker.setMap(null);
                    }
                    marker = new google.maps.Marker({
                        position: position,
                        map: map
                    });
                }
            })
        }
        
        $scope.updateCustomer = function updateCustomer() {
            $scope.isLocated = false;
            var data = {
                id: $scope.customerDetail.id,
                value: {
                    address: $scope.customerDetail.value.address,
                    carType: $scope.customerDetail.value.carType,
                    lat: position.lat,
                    lng: position.lng,
                    status: 'waiting',
                    driver: $scope.choosenDriver.id,
                    timestamp: $scope.customerDetail.value.timestamp,
                }
            }
            $scope.choosenDriver.value.status = 'picking';
            $scope.choosenDriver.value.customer = data.id;
            BookingService.UpdateCustomer(data).then( function (res) {
                Dialog.Success('Thành Công', 'Đã thêm khách hàng');
                BookingService.UpdateDriver($scope.choosenDriver).then(function(res) {
                    loadFirstData();
                    $scope.customerDetail = null;
                    $scope.reset();
                }).catch(function(err) {
                    Dialog.Error('That bai', err.message);
                })

            }).catch(function (err) {
                Dialog.Error('Thất bại', err.message);
            })
        }

        $scope.locatedCustomer = function locatedCustomer() {
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
            BookingService.GetNearDriver({lat: $scope.customerDetail.value.lat, lng: $scope.customerDetail.value.lng}).then(function(res) {
                $scope.nearDrivers = res;
                $scope.isLocated = true;
                for(var i = 0; i < res.length; i++) {
                    var iconCar = iconNormalCar;
                    if(res[i].value.carType == '2') {
                        iconCar = iconPremiumCar
                    }
                    var driverMarker = new google.maps.Marker({
                        position: {
                            lat: Number(res[i].value.lat),
                            lng: Number(res[i].value.lng)
                        },
                        map: map,
                        label: `${i}`,
                        icon: iconCar
                    });
                    google.maps.event.addListener(driverMarker, 'click', function(event) {
                        console.log('driver', event);
                        console.log('Position', event.latLng.lat(), event.latLng.lng());
                        for(var k = 0; k < $scope.nearDrivers.length; k++) {
                            if($scope.nearDrivers[k].value.lat == event.latLng.lat() && $scope.nearDrivers[k].value.lng == event.latLng.lng()) {
                                $scope.choosenDriver = $scope.nearDrivers[k];
                                $('#driver').val($scope.choosenDriver.id);
                            }
                        } 
                    })
                    markers.push(driverMarker);
                }
                console.log('near drivers', res);
            }).catch(function(err){
                console.log(err);
                Dialog.Error('Loi', 'Cannot get near drivers');
            })
        } 

    }
})();