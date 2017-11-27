(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', 'BookingService', 'Dialog'];
    function LocationController($scope, BookingService, Dialog) {
        var vm = this;
        $scope.customerDetail = null;
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
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
          showMarkerWhenClicking();
        }

        var position;
        
        $scope.showDetail = function showDetail(customer) {
            $scope.customerDetail = customer;
            if(!$scope.customerDetail.value.lat || !$scope.customerDetail.value.lng){
                $scope.customerDetail.value.lat = 10.6;
                $scope.customerDetail.value.lng = 106.7;                
            }
            position = {lat: parseInt($scope.customerDetail.value.lat), lng: parseInt($scope.customerDetail.value.lng)};
            console.log(customer);
            if (marker) {
                marker.setMap(null);
            }
            map.panTo(position);
            
            
            marker = new google.maps.Marker({
                position: position,
                map: map
              });
        }

        function showMarkerWhenClicking() {
            
            map.addListener("click", function(event){
                console.log(event);
                position = event.latLng;
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

    }
})();