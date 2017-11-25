(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('PhoneController', PhoneController);

    PhoneController.$inject = ['$scope', 'BookingService', 'Dialog'];
    function PhoneController($scope, BookingService, Dialog) {
        var vm = this;
        window.sc = $scope;

        activate();

        ////////////////

        function activate() { 
        }
        $scope.createCustomerInfo = function createCustomerInfo() {
            console.log('abc');
            var data = {
                address: $scope.data.address,
                lat: null,
                lng: null,
                carType: Number($scope.data.kind)
            }
            BookingService.CreateCustomer(data).then( function (res) {
                Dialog.Success('Thành Công', 'Đã thêm khách hàng');
            }).catch(function (err) {
                Dialog.Error('Thất bại', err.message);
            })
        }

    }
})();