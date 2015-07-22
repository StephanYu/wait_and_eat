'use strict';

/* Services */

angular.module('myApp.services', []).
  value('FIREBASE_URL', 'https://waitandeat-syu.firebaseio.com/')
  .factory('dataFactory', function($firebase, FIREBASE_URL) {
    
    var dataRef = new Firebase(FIREBASE_URL);
    var dataFire = $firebase(dataRef);
    return dataFire;
  })
  .factory('partyFactory', function(dataFactory) {

    var users = dataFactory.$child('users');
    var partyFactoryObject = {
      saveParty: function(party, userId) {
        users.$child(userId).$child('parties').$add(party);
      },
      getPartiesByUserId: function(userId) {
        return users.$child(userId).$child('parties');
      }
    };
    return partyFactoryObject;
  })
  .factory('textMessageFactory', function(partyFactory, dataFactory) {
    
    var textMessageFactoryObject = {
      sendSMS: function(party, userId) {
        var textMessages = dataFactory.$child('textMessages');
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        partyFactory.getPartiesByUserId(userId).$child(party.$id).$update({notified: "Yes"});
      }
    };
    return textMessageFactoryObject;
  })
  .factory('authFactory', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataFactory) {
    
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    var emails = dataFactory.$child('emails');

    var authFactoryObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);
          authFactoryObject.login(user, function() {
            emails.$add({email: user.email});
          });
        });
      },
      login: function(user, optionalCallback) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          if (optionalCallback) {
            optionalCallback();
          }
          $location.path('/waitlist');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        $rootScope.currentUser = user;
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        $rootScope.currentUser = null;
    });
    return authFactoryObject;
  });
