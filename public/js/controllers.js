'use strict';

angular.module('calendar.controllers', [ 'angular-underscore' ])
    .controller('PanelController', [ '$scope', '$http', '$routeParams', '$location', 'Year', '_', 'DataService'
     , function( $scope, $http, $routeParams, $location, Year, _, DataService ) {
        $scope._ = _;
        $scope.$location = $location;
        $scope.state = false;
        $scope.toggleCalendar = incopsulation();
        $scope.years = Year.query({}, function success( years ){

            $scope.hasSiblings = function( option ){
                if ( option.index == 'first' ){
                    if ( ( this.choozenYear || this.currentYear ) != option.data[ 0 ][ 'name' ] ){
                        return true;
                    }
                } else if  ( option.index == 'last' ){
                    if ( ( this.choozenYear || this.currentYear ) != option.data[ option.data.length - 1 ][ 'name' ] ){
                        return true;
                    }
                }
                return false;
            }

        }, function error(value ){
            console.log(value)
        });
        $scope.months = DataService.getMonths();
        $scope.currentMonth = DataService.month;
        $scope.currentYear  = DataService.year;

        $scope.showYear = function () {
            var yearId = this.choozenYear !== undefined ? this.choozenYear : $routeParams[ 'yearId' ]
              , gottedYear /* = Year.query( { yearId : yearId }, function(){
                    $scope.gottedYear = DataService.prepareData( gottedYear );
                }) */;


                /* так как возвращаемым значением функции $http является promise,
                *  вы можете использовать метод then чтобы регистрировать колбэк,
                *  и они будут получать только один аргумент – объект представляющий ответ сервера.
                */
/*             $http.get( '/app/json/:yearId.json', { yearId : yearId } ).then( function ( response ){
                gottedYear = response.data;
                $scope.gottedYear = DataService.prepareData( gottedYear );
            }); */

            $http( {
                    method : 'GET'
                  , url    : '/app/json/years.json'
                })
                .success( function ( data, status, headers, config ){
                    console.log(status)
                })
                .error( function ( data, status, headers, config ){
                    console.log(status)
                });
        };


        $scope.getprev = function(){
            var _year = parseInt( $scope.choozenYear, 10 ) || $scope.currentYear
              , prevYear;
            _.each( $scope.years, function ( year, index ){
                if ( year.name == _year ){
                    if ( index == 0 ){
                        return false;
                    } else {
                        prevYear = $scope.years[ index - 1 ];
                    }
                }
            });
            if ( prevYear ){
                var gottedYear = Year.query( { yearId : prevYear['name'] }, function(){
                    $scope.gottedYear = DataService.prepareData( gottedYear );
                });
                this.choozenYear = prevYear['name'];
            } else {
                return false;
            }
        }
        $scope.getNext = function(){
            var _year = parseInt( $scope.choozenYear, 10 ) || $scope.currentYear
              , nextYear;
            _.each( $scope.years, function ( year, index ){
                if ( year.name == _year ){
                    if ( index == ( $scope.years.length - 1 ) ){
                        return false;
                    } else {
                        nextYear = $scope.years[ index + 1 ];
                    }
                }
            });
            if ( nextYear ){
                var gottedYear = Year.query( { yearId : nextYear['name'] }, function(){
                    $scope.gottedYear = DataService.prepareData( gottedYear );
                });
                this.choozenYear = nextYear['name'];
            } else {
                return false;
            }
        }


        /* Helpers */
        function incopsulation () {
            var count = 0;
            return function(){
                count += 1;
                $scope.state = Boolean( (count/2) % 1 );
            };
        }
        function getYear ( data, id ){
            Year.query( { yearId : id }, function(){
                $scope.gottedYear = DataService.prepareData( data );
            });
        }
    }])
    .controller('InitController', [ '$scope', 'DataService'
     , function( $scope, DataService ) {
        $scope.currentYear = DataService.year;
    }]);