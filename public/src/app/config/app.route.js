"use strict";

(function($) {
    let app = angular.module('app');

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('app', {
                url: '/home/',
                templateUrl: './app/layout/test.html'
            })

        .state('app.products', {
            url: 'products',
            templateUrl: './app/products/productList.html',
            controller: 'ProductListController'
        })

        .state('app.detail', {
            url: 'detail/:id',
            templateUrl: './app/products/productDetail.html',
            controller: 'ProductDetailController',
            params: {
                id: null
            }
        });


        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }).hashPrefix('');
        }
    });
}(jQuery));