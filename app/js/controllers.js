'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageCtrl', [function() {
    
  }])
  .controller('WaitlistCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    
    var partiesRef = new Firebase('https://waitandeat-syu.firebaseio.com/');

    $scope.parties = $firebase(partiesRef);
    
    $scope.party = {
      name: '',
      phone: '',
      size: ''
    };

    $scope.saveParty = function() {
      $scope.parties.$add($scope.party);
      $scope.party = {
        name: '',
        phone: '',
        size: ''
      };
    }
  }]);