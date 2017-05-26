(function() {
    'use strict';

    angular
        .module('app')
        .factory('Dialog', Dialog);

    Dialog.inject = [];

    function Dialog() {
        var service = {
            Confirm: confirm,
            Success: success,
            Error: error,
            Warning: warning,
            LevelUp: levelUp
        };

        return service;

        ////////////////
        function confirm(title, text, confirmText, callback) {
            swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    cancelButtonText: 'Hủy',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                },
                function(isConfirm) {
                    callback(isConfirm);
                });
        };

        function success(title, text) {
            swal(title, text, 'success');
        };

        function error(title, text) {
            swal(title, text, 'error');
        };

        function warning(title, text, confirmText, callback) {
            swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                },
                function(isConfirm) {
                    callback(isConfirm);
                });
        }

        function levelUp(title, text) {
            swal({
                title: title,
                text: text,
                imageUrl: "../../images/Level_Up.png",
                imageSize: "150x50"
            });
        }
    }
})();