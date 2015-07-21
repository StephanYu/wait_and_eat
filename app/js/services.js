'use strict';

/* Services */

angular.module('myApp.services', []).
  value('FIREBASE_URL', 'https://waitandeat-syu.firebaseio.com/')
  .factory('partyFactory', function($firebase, FIREBASE_URL) {
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');
    var parties = $firebase(partiesRef);

    var partyFactoryObject = {
      parties: parties,
      saveParty: function(party) {
        parties.$add(party);
      }
    };
    return partyFactoryObject;
  })
  .factory('authFactory', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);

    var authFactoryObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);
          authFactoryObject.login(user);
        })
      },
      login: function(user) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          $location.path('/waitlist');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/');
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
