(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', 'BookingService'];
    function LocationController($scope, BookingService) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { 

        }

    }
})();