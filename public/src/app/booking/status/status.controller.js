(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('StatusController', StatusController);

    StatusController.$inject = ['$scope', 'BookingService', 'Dialog'];
    function StatusController($scope, BookingService, Dialog) {
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
                $scope.showAllCustomer();
                $scope.showDriver();                
            })
        }

        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 10.7638442, lng: 106.6622009 },
                zoom: 14
            });
        }

        var position;

        $scope.showDriver = function showDriver() {
            BookingService.GetAllDrivers().then(function (res) {
                $scope.drivers = res;
                console.log('drivers', $scope.drivers);
            })
            
        }

        $scope.showAllCustomer = function showAllCustomer() {
            var img1 = {
                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
            var img2 = {
                url: 'https://maps.google.com/mapfiles/ms/icons/green.png',
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            for (var i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].value.status == 'waiting') {
                    var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                    var marker1 = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: img1
                    });
                    var driverID = $scope.customers[i].value.driver;
                    google.maps.event.addListener(marker1, 'click', function(e) {
                        map.setZoom(15);
                        map.setCenter(e.latLng);
                        for (var j = 0; j < $scope.drivers.length; j++) {
                            if ($scope.drivers[j].id == driverID) {
                                $scope.driverDetail = $scope.drivers[j];
                                $scope.$evalAsync();
                                console.log('aaa');                                
                            }                 
                        }
                    });  
                }

                else if ($scope.customers[i].value.status == 'pending') {
                    var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                    var marker2 = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: img2
                    });
                }

                else if ($scope.customers[i].value.status == 'moving') {
                    var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                    var marker3 = new google.maps.Marker({
                        position: latLng,
                        map: map,
                    });
                }
                // else if ($scope.customers[i].value.status == 'done') {
                //     var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                //     var marker4 = new google.maps.Marker({
                //         position: latLng,
                //         map: map,
                //         img: img3
                //     });
                // }
            };
            
        }


    }
})();