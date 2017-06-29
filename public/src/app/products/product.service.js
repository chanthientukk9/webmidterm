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
            GetAllProduct: {
                method: "GET",
                url: "/api/product?limit=:limit&page=:page",
                params: {
                    limit: '@limit',
                    page: '@page'
                },
                isArray: true
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
            },
            GetMostBidProduct: {
                method: "GET",
                url: "/api/products/find-most-bid?limit=:limit",
                params: {
                    limit: '@limit'
                },
                isArray: true
            },

            GetMostPriceProduct: {
                method: "GET",
                url: "/api/products/find-most-price?limit=:limit",
                params: {
                    limit: '@limit'
                },
                isArray: true
            },

            GetNEDProduct: {
                method: "GET",
                url: "/api/products/find-nearly-end-date?limit=:limit",
                params: {
                    limit: '@limit'
                },
                isArray: true
            },

            UpdateWishList: {
                method: "PUT",
                url: "/api/member-wishlist",
            },

            GetWishList: {
                method: "GET",
                url: "/api/member-wishlist"
            },

            CountProduct: {
                method: "GET",
                url: "/api/products/count"
            },

            GetBiddedList: {
                method: "GET",
                url: "/api/member-biddedlist"
            },

            GetBiddingList: {
                method: "GET",
                url: "/api/member-biddinglist"
            },

            GetSellingingList: {
                method: "GET",
                url: "/api/member-sellinglist"
            },
            GetSoldList: {
                method: "GET",
                url: "/api/member-soldlist"
            },
            UpdateBiddingList: {
                method: "PUT",
                url: "/api/member-biddinglist"
            },

            UpdateBid: {
                method: "PUT",
                url: "/api/products/update-bid/:id",
                params: {
                    id: '@id'
                }
            }


        });

        var CategoryResource = $resource("/api/category/:categoryId", { categoryId: '@categoryId' }, {
            update: {
                method: "PUT"
            }
        });

        var service = {
            CreateProduct: createProduct,
            ConvertTimeToDate: convertTimeToDate,
            GetAllProduct: getAllProduct,
            GetProduct: getProduct,
            UpdateProduct: updateProduct,
            DeleteProduct: deleteProduct,
            GetSellerInfo: getSellerInfo,
            GetAllCategory: getAllCategory,
            GetProductByParams: getProductByParams,
            GetMostBidProduct: getMostBidProduct,
            GetMostPriceProduct: getMostPriceProduct,
            GetNEDProduct: getNEDProduct,
            GetWishList: getWishList,
            UpdateWishList: updateWishList,
            GetBiddingList: getBiddingList,
            UpdateBiddingList: updateBiddingList,
            GetBiddedList: getBiddedList,
            GetSellingList: getSellingList,
            GetSoldList: getSoldList,
            CountProduct: countProduct,
            UpdateBid: updateBid
        };

        return service;

        ////////////////
        function createProduct(data) {
            return ProductResource.save(data).$promise;
        }

        function convertTimeToDate(time) {
            return (new Date(time)).toLocaleString('vi');
        }

        function getAllProduct(limit, page) {
            return ProductResource.GetAllProduct({ limit: limit, page: page }).$promise;
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

        function getMostBidProduct(limit) {
            return ProductResource.GetMostBidProduct({ limit: limit }).$promise;
        }

        function getNEDProduct(limit) {
            return ProductResource.GetNEDProduct({ limit: limit }).$promise;
        }

        function getMostPriceProduct(limit) {
            return ProductResource.GetMostPriceProduct({ limit: limit }).$promise;
        }

        function countProduct(category, searchContent) {
            return ProductResource.CountProduct({ category: category, name: searchContent }).$promise
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

        function updateWishList(data) {
            return ProductResource.UpdateWishList(data).$promise;
        }

        function getWishList() {
            return ProductResource.GetWishList({}).$promise;
        }

        function getBiddingList() {
            return ProductResource.GetBiddingList({}).$promise;
        }

        function updateBiddingList(data) {
            return ProductResource.UpdateBiddingList(data).$promise;
        }

        function getBiddedList() {
            return ProductResource.GetBiddedList({}).$promise;
        }

        function getSellingList() {
            return ProductResource.GetSellingList({}).$promise;
        }

        function getSoldList() {
            return ProductResource.GetSoldList({}).$promise;
        }

        function updateBid(product) {
            return ProductResource.UpdateBid({ id: product._id }, product).$promise;
        }
    }
})();