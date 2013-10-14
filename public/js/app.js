'use strict';

// Declare app level module which depends on filters, and services
window.calendar = angular.module( 
    'calendar'
    , [
        'calendar.controllers'
      , 'calendar.services'
      , 'calendar.directives'
      , 'calendar.filters'
      , 'underscore'
      , 'angular-underscore'
    ]
);
