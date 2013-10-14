angular.module( 'underscore', [] )
       .factory( '_', function( $window ) {
            return $window._; // assumes underscore has already been loaded on the page
});