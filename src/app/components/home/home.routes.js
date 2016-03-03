export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.jade'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
}

routes.$inject = ['$stateProvider'];