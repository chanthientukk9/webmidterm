(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('PhoneController', PhoneController);

    PhoneController.$inject = ['$scope', 'BookingService'];
    function PhoneController($scope, BookingService) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();