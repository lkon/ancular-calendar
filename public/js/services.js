'use strict';

/* Services */

angular.module( 'calendar.services', [ 'ngResource', 'angular-underscore' ])
    .factory( 'Year', [ '$resource', function ( $resource ) {
        return $resource( '/app/json/:yearId.json', {}, {
            query : {
                method : 'GET'
              , params : { yearId : "years" }
              , isArray: true
            }
        } );
    }])
    .service( 'DataService', [ '$window', '_', function( $window, _ ){
        var currentTime = getCurrentCalendar();
        function getCurrentCalendar () {
            var currentDate  = new Date()
              , month = currentDate.getMonth()
              , year  = currentDate.getFullYear()
              ;
            return{
                month : month
              , year : year
            };
        }

        function getMonths () {
            var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
              , monthsObj = [];

            _.each( months, function ( month, index ) {
                monthsObj[ index ] = {};
                monthsObj[ index ][ 'engName' ] = getEngName( index );
                monthsObj[ index ][ 'ruName' ] = months[ index ];
                monthsObj[ index ][ 'status' ] = 'default';
            });

            $window.calendar.staticData = [];
            var MONTH_LENGTH = 4;
            _.each( months, function ( month, index ){
                if ( month.length <= MONTH_LENGTH ){
                    $window.calendar.staticData.push( month );
                } else {
                    $window.calendar.staticData.push( month.substr( 0, 3 ) );
                }
            });

            return monthsObj;
        }

        function prepareData ( data ){
            var gottedLink =  _.clone( data )
              , monthsObj = getMonths()
              ;
            _.each( monthsObj, function( staticMonth, index ){
                var dataExist = false;
                _.each( gottedLink, function( realMonth, jndex ) {
                    if ( realMonth && realMonth[ 'name' ] && realMonth[ 'name' ] == (index + 1) ){

                        _.extend( realMonth, staticMonth );
                        dataExist = true;
                    }
                });
                if ( !dataExist ){
                    gottedLink[ gottedLink.length ] = {};
                    _.extend( gottedLink[ gottedLink.length - 1 ], {
                                                                    'name': (index + 1)
                                                                  , 'engName': getEngName( index )
                                                                  , 'status': getEngName( index )
                                                                    }
                    );
                }

            })
            gottedLink.sort( sortYear );
            return gottedLink;
        }
        function sortYear ( a, b ){
            var a = parseInt( a[ 'name' ], 10 )
              , b = parseInt( b[ 'name' ], 10 )

            if ( a < b ) {
                return -1;
            } else if ( a > b ) {
                return 1;
            } else return 0;
        }
        function getEngName ( index ) {
            return ( new Date(2000, index, 1) ).toString().substr(4,3).toLowerCase();
        }

        return{
                month : currentTime.month
              , year  : currentTime.year
              , getMonths  : getMonths
              , prepareData  : prepareData
        };
    }]);
