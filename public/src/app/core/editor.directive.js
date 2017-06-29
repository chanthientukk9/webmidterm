(function() {
    'use strict';

    angular
        .module('app')
        .directive('ckModel', ckModel);

    ckModel.$inject = [];

    function ckModel() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            require: '?ngModel',
            link: link
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var ck = CKEDITOR.replace(element[0], {});

            if (!ngModel) return;

            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });

            function updateModel() {
                setTimeout(ngModel.$setViewValue(ck.getData()))
            }

            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    }
})();