export default function routing($urlRouterProvider, $locationProvider, $mdThemingProvider) {
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
