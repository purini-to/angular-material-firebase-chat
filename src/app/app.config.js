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
    gfm: true,
    tables: true,
    sanitize: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'markedProvider'];
