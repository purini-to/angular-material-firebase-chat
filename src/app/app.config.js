export default function routing($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('pink')
    .warnPalette('orange');
  
  $mdThemingProvider.theme('sub')
    .primaryPalette('blue-grey')
    .accentPalette('lime')
    .warnPalette('blue', {'default': '600'});
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider'];