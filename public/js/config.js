'use strict';


window.calendar.config( [ '$routeProvider', function( $routeProvider ) {
    $routeProvider
    .when('/',                  {templateUrl: 'views/hello.html' , controller: 'InitController' })
    .when('/calendar',          {templateUrl: 'views/panel.html' , controller: 'PanelController' })
    .when('/calendar/:yearId',  {templateUrl: 'views/panel.html' , controller: 'PanelController' })
    .otherwise({redirectTo: '/'});
  }]);
//Setting HTML5 Location Mode
window.calendar.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);