'use strict';

/* Directives */


angular.module( 'calendar.directives', [])
    .directive( 'year', function() {
        return {
            restrict    : "E"
          , templateUrl : "views/year.html"
        };
    })        
    .directive( 'selectedElement', function( $log ) {
        return {
            restrict    : "A"
          , link: function ( $scope, elem, attrs, controller ) {
                var SELECTED = 'selected';
                if ( $scope.$index == $scope.currentMonth ){
                    attrs.$set ( SELECTED , SELECTED );
                }/* 
                attrs.$observe( SELECTED, function(attribute) {
                    if ( attribute == SELECTED ){
                        $scope.choozenMonth = $scope.this.month.engName;
                    }
                  //фаза $digest
                }); */
            }
         };
    })
    .directive( 'activeElement', function( $log ) {
        return {
            restrict    : "A"/* 
          , compile: function compile(tElement, tAttrs, transclude) {
                var CSS_CLASS_ACTIVE = 'active';
                return {
                    pre: function preLink( $scope, elem, attrs, controller ) { 
                        console.log( attrs.$attr )
                        if ( $scope.$index == $scope.currentMonth ){
                            attrs.$set ( 'class' , CSS_CLASS_ACTIVE );
                        }
                    },
                    post: function postLink( $scope, elem, attrs, controller ) {
                        attrs.$observe( 'current', function( value ){
                            console.log( value ) ;
                        } )
                    }
                };
            } */
          , link: function link( $scope, elem, attrs, controll ) {
                var CSS_CLASS_ACTIVE = 'active'
                  , STATUS_DEFAULT = 'default'
                  , STATUS_ACTIVE = 'current'
                  , INIT = true
                  ;
                //attrs.$observe("class", function(attribute) {
                  //console.log("$observe:", $scope.$$phase);
                  //фаза $digest
                //});
                
                if ( $scope.$index == $scope.currentMonth && !$scope.choozenMonth ){
                    $scope.month.status = STATUS_ACTIVE;
                    elem.addClass( CSS_CLASS_ACTIVE );
                }
                
                $scope.$watch('gottedYear[$index].status', function (newVal, oldVal) {
                    if ( oldVal !== newVal ){
                        if ( newVal == STATUS_DEFAULT ){
                            elem.removeClass( CSS_CLASS_ACTIVE );
                        } else if ( newVal == STATUS_ACTIVE ){
                            elem.addClass( CSS_CLASS_ACTIVE );
                        }
                    }
                }, true);
                
                $scope.$watch('choozenMonth', function (newVal, oldVal) {
                    if ( $scope.month.engName == newVal ){
                        $scope.month.status = STATUS_ACTIVE;
                    } else if ( !INIT && $scope.month.status == STATUS_ACTIVE ){
                        $scope.month.status = STATUS_DEFAULT;
                    }
                    INIT = false;
                }, true);
            }
         };
    });

    
    //{ active_static : !choozenMonth && $index == currentMonth, active_dinamic : month.engName == choozenMonth }