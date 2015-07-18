'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageCtrl', [function() {
    
  }])
  .controller('WaitlistCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    
    var partiesRef = new Firebase('https://waitandeat-syu.firebaseio.com/parties');
    $scope.parties = $firebase(partiesRef);
    
    $scope.newParty = {
      name: '',
      phone: '',
      size: '',
      done: false
    };

    $scope.saveParty = function() {
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {
        name: '',
        phone: '',
        size: '',
        done: false
      };
    }

    $scope.removeParty = function(party) {
      $scope.parties.$remove(party);
    }

    $scope.sendSMS = function(party) {
      var textMessagesRef = new Firebase('https://waitandeat-syu.firebaseio.com/textMessages')
      var textMessages = $firebase(textMessagesRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
    }
  }]);