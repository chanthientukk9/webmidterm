(function() {
    'use strict';

    angular
        .module('app.booking')
        .factory('BookingService', BookingService);

    BookingService.$inject = ['$resource'];

    function BookingService($resource) {
        var CustomerResource = $resource('/api/customer', {}, {
            GetCustomers: {
                method: 'GET',
                url: '/api/customer/status',
                isArray: true
            },
            GetCustomerDetail: {
                method: 'GET',
                url: '/api/customer/detail/:customerId',
                params: {
                    customerId: '@customerId'
                }
            },
            UpdateCustomer: {
                method: 'PUT',
                url: '/api/customer/detail/:customerId',
                params: {
                    customerId: '@customerId'
                }
            },
            GetNearDriver: {
                method: 'POST',
                url: '/api/customer/near-drivers'
            }
        });

        var DriverResource = $resource('/api/driver', {}, {
            GetDrivers: {
                method: 'GET',
                url: '/api/driver/status',
                isArray: true
            },
            GetDriverDetail: {
                method: 'GET',
                url: '/api/driver/detail/:driverId',
                params: {
                    driverId: '@driverId'
                }
            },
            UpdateDriver: {
                method: 'PUT',
                url: '/api/driver/detail/:driverId',
                params: {
                    driverId: '@driverId'
                }
            }
        })
        var service = {
            GetAllCustomers: getAllCustomers,
            GetCustomers: getCustomers,
            CreateCustomer: createCustomer,
            GetCustomerDetail: getCustomerDetail,
            UpdateCustomer: updateCustomer,
            GetNearDriver: getNearDriver,
            GetAllDrivers: getAllDrivers,
            GetDrivers: getDrivers,
            GetDriverDetail: getDriverDetail,
            UpdateDriver: updateDriver,
        };
        
        return service;

        ////////////////
        function getAllCustomers() { 
            return CustomerResource.query().$promise;
        }

        function getCustomers() {
            return CustomerResource.GetCustomers().$promise;
        }
        function createCustomer(customer) {
            return CustomerResource.save(customer).$promise;
        }

        function getCustomerDetail(customerId) {
            return CustomerResource.GetCustomerDetail({customerId: customerId}).$promise;
        }
        function updateCustomer(customer) {
            return CustomerResource.UpdateCustomer({customerId: customer.id}, customer.value).$promise;
        }
        function getNearDriver(customerLocation) {
            return CustomerResource.GetNearDriver(customerLocation).$promise;
        }

        function getAllDrivers() { 
            return DriverResource.query().$promise;
        }

        function getDrivers() {
            return DriverResource.GetDrivers().$promise;
        }

        function getDriverDetail(driverId) {
            return DriverResource.GetDriverDetail({driverId: driverId}).$promise;
        }
        function updateDriver(driver) {
            return DriverResource.UpdateDriver({driverId: driver.id}, driver.value).$promise;
        }
    }
})();