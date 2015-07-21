'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageCtrl', [function() {
    
  }])
  .controller('WaitlistCtrl', ['$scope', 'partyFactory', 'textMessageFactory', function($scope, partyFactory, textMessageFactory) {
    $scope.parties = partyFactory.parties;
    $scope.newParty = {
      name: '',
      phone: '',
      size: '',
      done: false,
      notified: 'No'
    };

    $scope.saveParty = function() {
      partyFactory.saveParty($scope.newParty);
      $scope.newParty = {
        name: '',
        phone: '',
        size: '',
        done: false,
        notified: 'No'
      };
    }

    $scope.removeParty = function(party) {
      $scope.parties.$remove(party);
    }

    $scope.sendSMS = function(party) {
      textMessageFactory.sendSMS(party);
    }
  }])
  .controller('AuthenticationCtrl', ['$scope', 'authFactory', function($scope, authFactory) {
    
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.register = function() {
      authFactory.register($scope.user);
    };

    $scope.login = function() {
      authFactory.login($scope.user);
    };

    $scope.logout = function() {
      authFactory.logout();
    };
  }]);