(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('StatusController', StatusController);

    StatusController.$inject = ['$scope', 'BookingService', 'Dialog'];
    function StatusController($scope, BookingService, Dialog) {
        var vm = this;
        window.cc = $scope;
        $scope.customers = null;
        activate();

        ////////////////

        function activate() {
            BookingService.GetAllCustomers().then(function (res) {
                $scope.customers = res;
                console.log('customers', $scope.customers);
                initMap();
                $scope.showAllCustomer();
            })
         }

        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.7638442, lng: 106.6622009},
            zoom: 14
          });
        }
        
        var position;
        
        $scope.showAllCustomer = function showAllCustomer() {
            var image = {
                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
              };
              var image2 = {
                  url: 'http://www.clker.com/cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png',
                  size: new google.maps.Size(20, 32),
                  // The origin for this image is (0, 0).
                  origin: new google.maps.Point(0, 0),
                  // The anchor for this image is the base of the flagpole at (0, 32).
                  anchor: new google.maps.Point(0, 32)
              }
            for(var i = 0; i < $scope.customers.length; i++) 
            {
                if($scope.customers[i].value.status == 'waiting'){  
                     var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                     var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: image
                    });
                }
                else if($scope.customers[i].value.status == 'pending'){
                    var latLng = new google.maps.LatLng($scope.customers[i].value.lat, $scope.customers[i].value.lng);
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image2 
                    });
                }
            };
        }
    }
})();