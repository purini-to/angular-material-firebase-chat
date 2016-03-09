export default function routing($urlRouterProvider, $locationProvider, $mdThemingProvider, markedProvider) {
  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('pink')
    .warnPalette('orange');

  $mdThemingProvider.theme('sub')
    .primaryPalette('blue-grey')
    .accentPalette('lime')
    .warnPalette('blue', {
      'default': '600'
    });

  markedProvider.setRenderer({
    link: (href, title, text) => {
      return "<a href='" + href + "'" + (title ? " title='" + title + "'" : '') + " target='_blank'>" + text + "</a>";
    },
    paragraph: text => {
      var result = text.match(/(@.+):{0,1}\s/g);
      if (result && result.length > 0)
        result.forEach(r => text = text.replace(r, `<a class="mention">${r}</a>`));
      return text;
    }
  });

  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: (code) => {
      return hljs.highlightAuto(code).value;
    }
  });
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'markedProvider'];
