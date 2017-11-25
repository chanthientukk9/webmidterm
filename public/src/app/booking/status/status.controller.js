(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('StatusController', StatusController);

    StatusController.$inject = ['$scope', 'BookingService'];
    function StatusController($scope, BookingService) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
        }
        initMap();
    }
})();