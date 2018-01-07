"use strict";

(function($) {
    var app = angular.module('app');

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('app', {
                url: '/product/',
                templateUrl: './app/layout/layout.html'
            })
            .state('booking', {
                url: '/booking/',
                templateUrl: './app/layout/booking.html'
            })
            .state('booking.phone', {
                url: 'phone',
                templateUrl: './app/booking/phone/phone.html',
                controller: 'PhoneController'
            })
            .state('booking.location', {
                url: 'location',
                templateUrl: './app/booking/location/location.html',
                controller: 'LocationController'
            })
            .state('booking.status', {
                url: 'status',
                templateUrl: './app/booking/status/status.html',
                controller: 'StatusController'
            })
            .state('booking.drivers', {
                url: 'drivers',
                templateUrl: './app/booking/drivers/drivers.html',
                controller: 'DriverController'
            })

        // .state('auth', {
        //     url: '/auth/',
        //     templateUrl: './app/authentication/auth.html'
        // })

        // .state('auth.sign-in', {
        //     url: 'sign-in',
        //     templateUrl: './app/authentication/signIn.html'
        // })

        .state('app.list', {
            url: 'list?:page&:limit?:categoryId?status',
            templateUrl: './app/products/productList.html',
            controller: 'ProductListController',
            params: {
                categoryId: null,
                status: null,
                page: '1',
                limit: '2',
                searchCategory: null,
                searchContent: null
            }
        })

        .state('app.detail', {
            url: 'detail?:id',
            templateUrl: './app/products/productDetail.html',
            controller: 'ProductDetailController',
            params: {
                id: null
            }
        })

        .state('app.profile', {
            url: 'profile',
            templateUrl: './app/users/profile.html',
            controller: 'ProfileController'
        })

        .state('app.admin', {
            url: 'admin',
            templateUrl: './app/users/admin.html',
            controller: 'AdminController'
        });

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }).hashPrefix('');
        }
    });
}(jQuery));