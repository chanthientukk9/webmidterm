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
            },
            GetProductByParams: {
                method: "GET",
                url: "/api/products/find-params?:variables",
                params: {
                    variables: '@variables'
                },
                isArray: true
            }
        });

        var CategoryResource = $resource("/api/category/:categoryId", { categoryId: '@categoryId' }, {
            update: {
                method: "PUT"
            }
        });

        var service = {
            ConvertTimeToDate: convertTimeToDate,
            GetAllProduct: getAllProduct,
            GetProduct: getProduct,
            UpdateProduct: updateProduct,
            DeleteProduct: deleteProduct,
            GetSellerInfo: getSellerInfo,
            GetAllCategory: getAllCategory,
            GetProductByParams: getProductByParams
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

        function getProductByCategory(categoryId) {
            return ProductResource.GetProductByCategory({ category: categoryId }).$promise;
        }

        function getAllCategory() {
            return CategoryResource.query().$promise;
        }

        function getValidProduct(status) {
            if (status == "valid" || status == "notvalid") {
                return ProductResource.GetValidProduct({ status: status }).$promise;
            }
        }

        function getProductByParams(params) {
            return ProductResource.GetProductByParams({ variables: params }).$promise;
        }
    }
})();