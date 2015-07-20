'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageCtrl', [function() {
    
  }])
  .controller('WaitlistCtrl', ['$scope', '$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL) {
    
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');
    $scope.parties = $firebase(partiesRef);
    
    $scope.newParty = {
      name: '',
      phone: '',
      size: '',
      done: false,
      notified: 'No'
    };

    $scope.saveParty = function() {
      $scope.parties.$add($scope.newParty);
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
      var textMessagesRef = new Firebase(FIREBASE_URL + 'textMessages')
      var textMessages = $firebase(textMessagesRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
      party.notified = 'Yes';
      $scope.parties.$save(party.$id);
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