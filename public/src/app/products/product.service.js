(function() {
    'use strict';

    angular
        .module('app.product')
        .factory('ProductService', ProductService);

    ProductService.inject = ['$resource'];

    function ProductService($resource) {
        var ProductResource = $resource("/api/product/:productId", { productId: '@productId' }, {
            update: {
                method: "PUT"
            },
            GetSellerInfo: {
                method: "GET",
                url: "/api/member/:memberId",
                params: {
                    memberId: '@memberId'
                }
            }
        });

        var service = {
            ConvertTimeToDate: convertTimeToDate,
            GetAllProduct: getAllProduct,
            GetProduct: getProduct,
            UpdateProduct: updateProduct,
            DeleteProduct: deleteProduct,
            GetSellerInfo: getSellerInfo
        };

        return service;

        ////////////////
        function convertTimeToDate(time) {
            return (new Date(time)).toLocaleString('vi');
        }

        function getAllProduct() {
            return ProductResource.query().$promise;
        }

        function getProduct(id) {
            return ProductResource.get({ productId: id }).$promise;
        }

        function updateProduct(product) {
            return ProductResource.update({ productId: product._id }, product).$promise;
        }

        function deleteProduct(id) {
            return ProductResource.remove({ productId: id }).$promise;
        }

        function getSellerInfo(id) {
            return ProductResource.GetSellerInfo({ memberId: id }).$promise;
        }
    }
})();