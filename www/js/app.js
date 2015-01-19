// Ionic Starter App

angular.module('emrs', ['emrs.controllers', 'emrs.services', 'ionic'])

.run(function($ionicPlatform, $rootScope, $location, $state, AppSvc) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {

    if(toState.name == "login" && !AppSvc.LoggedIn())
    {
      console.log("Allowing user to get to login page")
      return;
    }

    if (!AppSvc.LoggedIn()) {
      console.log('DENY');
      event.preventDefault();
      if(fromState) {
        $state.go('login');
      }
      else {
        $state.go('login');
      }
    }
    else {
        console.log('ALLOW - transitioning to ' + toState.name);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabs', {
    url: '/tabs',
    templateUrl: 'templates/home.html',
    abstract: true,
    controller: "TabsCtrl"
  })

  .state('tabs.contactlist', {
      url: '/contactlist',
      views: {
        'contactlist': {
          templateUrl: 'templates/contactlist.html',
          controller: 'ContactListCtrl'
        }
      }
    })

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  });

  $urlRouterProvider.otherwise('/login');
  
});

