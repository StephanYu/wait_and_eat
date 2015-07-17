'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/partials/landing_page.html',
    controller: 'LandingPageCtrl'
  });
  $routeProvider.when('/waitlist', function($routeProvider) {
    templateUrl: '/partials/waitlist.html',
    controller: 'WaitlistCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
