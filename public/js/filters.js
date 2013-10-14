'use strict';

angular.module('calendar.filters', [])
    .filter( 'getName', [ '$window', function( $window ) {
        return function( num ) {
            var realNum = num - 1;
            return $window.calendar.staticData[ realNum ];
        };
    }]);
