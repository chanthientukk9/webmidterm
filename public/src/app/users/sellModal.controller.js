(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('SellModalController', SellModalController);

    SellModalController.inject = ['$scope', '$http', 'ProductService', 'Dialog'];

    function SellModalController($scope, $http, ProductService, Dialog) {
        var vm = this;
        window.cs = $scope;
        $scope.product = {
            price: [0],
            urlMedia: []
        };
        $scope.watch = 0;

        activate();

        ////////////////

        function activate() {
            // setTimeout(watch, 100);
        }


        $scope.createProduct = function createProduct() {
            ProductService.CreateProduct($scope.product).then(function(res) {
                Dialog.Success("Thành công", 'Đã đăng bán sản phẩm');
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })

        }

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };


        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.upload = function upload() {
            $('#file').click();
            // watch();
            if ($scope.watch == 0) {
                setTimeout(watch, 100);
                $scope.watch++;
            }
        }


        function watch() {
            $("#file").change(function() {
                $scope.uploadFile();
            });
        };

        $scope.uploadFile = function uploadFile() {
            $scope.preloader = true;
            var file = $('#file').get(0).files[0];

            var formData = new FormData();
            formData.append('file', file);
            $scope.preloader = true;
            $http({
                method: 'POST',
                url: '/api/upload',
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(res) {
                $scope.url = {
                    url: 'http://localhost:7000/api/download/' + encodeURIComponent(res.data.path)
                };
                $scope.product.urlMedia.push($scope.url);
                $scope.preloader = false;
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            });
        }
    }
})();