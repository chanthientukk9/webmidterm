"use strict";

(function($) {
    let app = angular.module('app');

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('app', {
                url: '/product/',
                templateUrl: './app/layout/layout.html'
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
            url: 'list',
            templateUrl: './app/products/productList.html',
            controller: 'ProductListController'
        })

        .state('app.detail', {
            url: 'detail?:id',
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