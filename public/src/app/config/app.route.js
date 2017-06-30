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