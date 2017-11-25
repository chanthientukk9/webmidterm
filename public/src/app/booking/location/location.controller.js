(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', 'BookingService'];
    function LocationController($scope, BookingService) {
        var vm = this;
        $scope.customerDetail = null;
        activate();

        ////////////////

        function activate() { 
            BookingService.GetCustomers('pending').then(function (res) {
                $scope.customers = res;
            })
        }
        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
        }
        initMap();

        $scope.showDetail = function showDetail(customer) {
            $scope.customerDetail = customer;
        }
    }
})();