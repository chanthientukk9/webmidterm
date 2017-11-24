(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('StatisController', StatisController);

    StatisController.$inject = ['$scope', 'BookingService'];
    function StatisController($scope, BookingService) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();