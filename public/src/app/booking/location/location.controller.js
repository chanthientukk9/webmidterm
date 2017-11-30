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
        activate();

        ////////////////

        function activate() { 
            BookingService.GetCustomers('pending').then(function (res) {
                $scope.customers = res;
                initMap();
            })
        }
        var map;
        var marker;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.7638442, lng: 106.6622009},
            zoom: 14
          });
          $scope.showMarkerWhenClicking();
        }
        
        var position;
        
        $scope.showDetail = function showDetail(customer) {
            $scope.customerDetail = customer;
            if(!$scope.customerDetail.value.lat || !$scope.customerDetail.value.lng){
                $scope.customerDetail.value.lat = 10.7638442;
                $scope.customerDetail.value.lng = 106.6622009;                
            }
            position = {lat: $scope.customerDetail.value.lat, lng: $scope.customerDetail.value.lng};
            console.log('Customer Detail', $scope.customerDetail);
            if (marker) {
                marker.setMap(null);
            }
            map.panTo(position);
            
            marker = new google.maps.Marker({
                position: position,
                map: map
            });
        }

        $scope.showMarkerWhenClicking = function showMarkerWhenClicking() {
            map.addListener("click", function(event){
                console.log(event);
                position = event.latLng;
                $('#latinput').val(position.lat());
                $('#lnginput').val(position.lng());
                
                $scope.customerDetail.value.lat = position.lat();
                $scope.customerDetail.value.lng = position.lng();
                if (marker) {
                    marker.setMap(null);
                }
                marker = new google.maps.Marker({
                    position: position,
                    map: map
                });
            })
        }
        
        $scope.updateCustomer = function updateCustomer() {
            var data = {
                id: $scope.customerDetail.id,
                value: {
                    address: $scope.customerDetail.value.address,
                    carType: $scope.customerDetail.value.carType,
                    lat: position.lat(),
                    lng: position.lng(),
                    status: 'waiting',
                    driver: null,
                    timestamp: $scope.customerDetail.value.timestamp,
                }
            }
            BookingService.UpdateCustomer(data).then( function (res) {
                Dialog.Success('Thành Công', 'Đã thêm khách hàng');
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
                for(var i = 0; i < res.length; i++) {
                    var iconCar = iconNormalCar;
                    if(res[i].value.carType == '2') {
                        iconCar = iconPremiumCar
                    }
                    marker = new google.maps.Marker({
                        position: {
                            lat: Number(res[i].value.lat),
                            lng: Number(res[i].value.lng)
                        },
                        map: map,
                        icon: iconCar
                    });
                }
                console.log('near drivers', res);
            }).catch(function(err){
                console.log(err);
                Dialog.Error('Loi', 'Cannot get near drivers');
            })
        } 

    }
})();