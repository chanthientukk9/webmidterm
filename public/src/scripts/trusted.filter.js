(function() {
    'use strict';

    angular
        .module('app')
        .filter('trusted', trusted);

    trusted.injects = ['$sce'];

    function trusted($sce) {
        return trustedFilter;

        ////////////////

        function trustedFilter(text) {
            return $sce.trustAsHtml(text);
        }
    }
})();