'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageCtrl', [function() {
    
  }])
  .controller('WaitlistCtrl', ['$scope', 'partyFactory', 'textMessageFactory', 'authFactory', function($scope, partyFactory, textMessageFactory, authFactory) {
    authFactory.getCurrentUser().then(function(user) {
      if (user) {
        $scope.parties = partyFactory.getPartiesByUserId(user.id);
      }
    });
    $scope.newParty = {
      name: '',
      phone: '',
      size: '',
      done: false,
      notified: 'No'
    };

    $scope.saveParty = function() {
      partyFactory.saveParty($scope.newParty, $scope.currentUser.id);
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
      textMessageFactory.sendSMS(party, $scope.currentUser.id);
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