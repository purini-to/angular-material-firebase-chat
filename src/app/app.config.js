export default function routing($urlRouterProvider, $locationProvider, $mdThemingProvider, markedProvider) {
  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('pink')
    .warnPalette('orange');

  $mdThemingProvider.theme('sub')
    .primaryPalette('blue-grey')
    .accentPalette('lime')
    .warnPalette('blue', {'default': '600'});

  markedProvider.setOptions({
    sanitize: true
  });
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'markedProvider'];
